import React, { useEffect, useRef, useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from "@nextui-org/popover";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { auth, db, storage } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MuxUploader from "@mux/mux-uploader-react";

type BottomTextProps = {
  showReplyLayout: boolean;
  setShowReplyLayout: (value: boolean) => void;
  channelId: string | null;
  headingId: string | null;
  communityId: string | null;
  replyData: { message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null;
  channelMembers: { id: string, isAdmin: boolean }[] | null;
  channelName: string | null;
  channelEmoji: string | null;
};

type UserData = {
  name: string;
  uniqueId: string;  // Display ID
  userId: string;    // Auth ID
  profilePic: string;
  isAdmin: boolean;
}

interface Mention {
  uniqueId: string;
  id: string;
  isAdmin: boolean;
}

function BottomText({
  showReplyLayout,
  replyData,
  setShowReplyLayout,
  channelId,
  headingId,
  communityId,
  channelMembers,
  channelEmoji,
  channelName,
}: BottomTextProps) {
  const [text, setText] = useState("");
  const [height, setHeight] = useState("32px");
  const [isFocused, setIsFocused] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | "document" | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // State to hold the file name
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [uploadTaskRef, setUploadTaskRef] = useState<any>(null); // State to hold the upload task reference
  const [replyName, setReplyName] = useState<string | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [showUserList, setShowUserList] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchReplyName = async () => {
      if (replyData?.senderId) {
        try {
          const currentUser = auth.currentUser;
          if (currentUser?.uid === replyData.senderId) {
            setReplyName("You");
          } else {
            const userDoc = await getDoc(doc(db, `users/${replyData.senderId}`));
            if (userDoc.exists()) {
              setReplyName(userDoc.data()?.name || "Unknown User");
            } else {
              setReplyName("Unknown User");
            }
          }
        } catch (error) {
          console.error("Error fetching sender name:", error);
          setReplyName("Unknown User");
        }
      }
    };

    if (showReplyLayout && replyData?.senderId) {
      fetchReplyName();
    }
  }, [showReplyLayout, replyData]);

  useEffect(() => {
    const fetchUsersAndAdmins = async () => {
      try {
        const currentUser = auth.currentUser; // Get the current user from Firebase Auth
        if (!currentUser) {
          console.error("User is not authenticated");
          return;
        }

        const currentUserId = currentUser.uid; // Use the current user's UID

        // Reference to the users and admins collections
        const usersCollection = collection(db, "users");
        const adminsCollection = collection(db, "admin");

        // Fetch users and admins concurrently
        const [usersSnapshot, adminsSnapshot] = await Promise.all([
          getDocs(usersCollection),
          getDocs(adminsCollection),
        ]);

        // Extract user data
        const userList: UserData[] = usersSnapshot.docs
          .map((doc) => ({
            name: doc.data().name,
            uniqueId: doc.data().uniqueId || doc.data().userId || '',  // Now uses uniqueId as display ID
            userId: doc.data().userId || doc.data().uniqueId || '',    // Now uses userId as auth ID
            profilePic: doc.data().profilePic,
            isAdmin: false,
          }))
          .filter((user) => user.userId !== currentUserId); // Exclude the current user

        // Extract admin data
        const adminList: UserData[] = adminsSnapshot.docs
          .map((doc) => ({
            name: doc.data().name,
            uniqueId: doc.data().uniqueId || doc.data().userId || '',  // Now uses uniqueId as display ID (previously userId)
            userId: doc.data().userId || doc.data().adminId || '',     // Now uses userId as auth ID (previously adminId)
            profilePic: doc.data().profilePic,
            isAdmin: true,
          }))
          .filter((admin) => admin.userId !== currentUserId); // Exclude the current user

        // Combine user and admin lists
        const combinedList = [...userList, ...adminList];

        // Filter only members (users or admins who are members of the channel)
        const filteredMembers = combinedList.filter((userOrAdmin) => {
          if (!channelMembers) return false;
          return channelMembers.some((member) => member.id === userOrAdmin.userId); // Compare with auth ID (userId)
        });

        // Set the filtered members to the state
        setUsers(filteredMembers);
      } catch (error) {
        console.error("Error fetching users and admins:", error);
      }
    };

    fetchUsersAndAdmins();
  }, [channelMembers]); // Re-run if `channelMembers` changes


  const highlightMentions = (value: string) => {
    const mentionRegex = /@(\w+)/g; // Match @username
    return value.replace(
      mentionRegex,
      (match) => `<span class="text-purple">${match}</span>`
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    // Detect `@` symbol
    const caretPosition = e.target.selectionStart;
    setCursorPosition(caretPosition);

    const words = value.slice(0, caretPosition).split(" ");
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith("@")) {
      const searchText = lastWord.slice(1).toLowerCase();
      const matchingUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText)
      );
      setFilteredUsers(matchingUsers);
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }

    e.target.style.height = "32px";
    const newHeight = e.target.scrollHeight <= 120 ? e.target.scrollHeight : 120;
    e.target.style.height = `${newHeight}px`;
    setHeight(newHeight < 120 ? "32px" : "120px");
  };

  const handleUserSelect = (user: UserData) => {
    if (!textareaRef.current || cursorPosition === null) return;

    const beforeCursor = text.slice(0, cursorPosition);
    const afterCursor = text.slice(cursorPosition);

    // Replace `@text` with selected username
    const words = beforeCursor.split(" ");
    words.pop(); // Remove the partial mention
    const newText = `${words.join(" ")} @${user.uniqueId} ${afterCursor}`.trim();

    setText(newText);
    setShowUserList(false);

    // Store the mention with both name and uniqueId
    setMentions((prevMentions) => [
      ...prevMentions,
      { uniqueId: user.uniqueId, id: user.userId, isAdmin: user.isAdmin, },
    ]);

    // Set the cursor position after the inserted username
    setTimeout(() => {
      const newPosition = newText.length - afterCursor.length;
      textareaRef.current!.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setText((prevText) => prevText + emoji.emoji);
  };

  const handleSend = async () => {
    if ((!text.trim() && !fileUrl) || !communityId || !headingId || !channelId) {
      console.error("Missing required information");
      return;
    }

    try {
      setIsSending(true);
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      const chatsRef = collection(
        db,
        `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}/chats`
      );

      const newChatRef = doc(chatsRef);
      const chatId = newChatRef.id;
      let announcementId = null;
      if (isAnnouncement) {
        const announcementsRef = collection(db, `communities/${communityId}/Announcements`);
        const announcementDoc = await addDoc(announcementsRef, {
          message: text || null,
          senderId: user.uid,
          timestamp: serverTimestamp(),
          channelEmoji,
          channelName,
          communityId,
          headingId,
          channelId,
          chatId,
        });
        announcementId = announcementDoc.id;
        // Update the document with its own ID
        await updateDoc(announcementDoc, {
          announcementId: announcementId
        });
        console.log("Announcement stored successfully");
      }

      // Fetch channel data to get channelMembers
      const channelRef = doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}`);

      if (!Array.isArray(channelMembers)) {
        console.error("Invalid channelMembers format");
        return;
      }

      // Filter out current user ID from channelMembers
      const channelNotification = channelMembers
        .filter((member) => member.id !== user.uid) // Exclude current user
        .map((member) => member.id); // Extract user IDs


      // Prepare message data
      const messageData = {
        message: text || null,
        chatId: chatId,
        senderId: user.uid,
        timestamp: serverTimestamp(),
        isReplying: showReplyLayout ? true : false,
        replyingToId: showReplyLayout ? replyData?.senderId : null,
        replyingToChatId: showReplyLayout ? replyData?.chatId : null,
        replyingToMsg: showReplyLayout ? replyData?.message : null,
        replyingToMsgType: showReplyLayout ? replyData?.messageType : null,
        replyingToFileUrl: showReplyLayout ? replyData?.fileUrl : null,
        replyingToFileName: showReplyLayout ? replyData?.fileName : null,
        isAdmin: true,
        messageType: fileUrl ? fileType : "text", // Set message type based on file upload
        fileUrl: fileUrl || null,
        fileName: fileName || null,
        fileSize: selectedFile?.size || null,
        mentions: mentions.length ? mentions : [], // Store mentions as an array of objects
        isAnnouncement: isAnnouncement,
        announcementId: isAnnouncement ? announcementId : null, // Add announcementId to messageData
      };
      // Store the message with mentions in Firestore
      await setDoc(newChatRef, messageData);
      console.log("Message stored successfully");

      // Update the channel document with channelNotification
      await updateDoc(channelRef, {
        channelNotification: channelNotification,
      });
      console.log("Channel notification updated successfully");
      // If this is an announcement, store it in the announcements subcollection


      // Reset states after sending message
      setText("");
      setFileUrl(null);
      setProgress(null);
      setFileName(null);
      setSelectedFile(null);
      setMentions([]); // Clear mentions
      setShowReplyLayout(false);
      setHeight('33px');
      setIsAnnouncement(false);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleMediaUpload = async (file: File, type: "image" | "video" | "document") => {
    if (!communityId || !headingId || !channelId) return;

    try {
      const storageRef = ref(storage, `uploads/${communityId}/${headingId}/${channelId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setUploadTaskRef(uploadTask); // Set the upload task reference

      setSelectedFile(file); // Store the selected file to access its size

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercentage);
        },
        (error) => {
          console.error("Upload error:", error);
          setProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUrl(downloadURL);
          setFileType(type);
          setProgress(null);
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "video" | "document") => {
    const file = event.target.files?.[0];
    if (file) {
      setIsMediaPopupOpen(false);
      setFileName(file.name); // Set file name when a file is selected
      setFileUrl(null); // Reset file URL until the upload is complete
      handleMediaUpload(file, type);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default "new line" behavior
      if (text.trim() || fileUrl) {
        handleSend(); // Call your send message function
      }
    }
  };

  const truncateMessage = (text: string | null | undefined, maxLength: number = 50) => {
    if (!text) return '';
    // Split by newlines and only take first line
    const firstLine = text.split('\n')[0];
    if (firstLine.length <= maxLength) return firstLine;
    return firstLine.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col bg-white h-auto px-4 py-4">
      {isAnnouncement && (
        <div className="flex flex-row items-center justify-between bg-white w-full h-auto pb-3 mt-[-4px]">
          <span className="text-sm text-gray-600">This message will be send as announcement.</span>
        </div>
      )}
      {/* Media Layout Start */}
      {fileName && (
        <div className="flex flex-row rounded-md bg-[#F2F4F7] w-full z-10 h-auto border border-[#D0D5DD] p-[12px] mb-3 justify-between">
          <div className="flex flex-row gap-[5px]">
            <Image src="/icons/image.svg" alt="media icon" width={18} height={18} />
            <p className="text-[14px] font-normal">{fileName}</p> {/* Show file name */}
          </div>
          <button className="flex relative "
            onClick={() => {
              if (uploadTaskRef) {
                uploadTaskRef.cancel(); // Cancel the upload if it is ongoing
                setProgress(null); // Reset progress
              }
              setFileUrl(null);
              setFileName(null); // Reset file name on cancel
            }}>
            {/* Progress Circle Logic */}
            <div className="flex relative w-6 h-6 items-center justify-center">
              <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  strokeLinecap="round"
                  fill="none"
                  strokeWidth="3"
                  stroke="currentColor"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#9012FF]" // Change color to purple
                  strokeLinecap="round"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                  stroke="currentColor"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Image
                src="/icons/cancel.svg"
                alt="cancel icon"
                width={14}
                height={14}
                className="relative z-10 "

              />
            </div>
          </button>
        </div>
      )}
      {/* Media Layout End */}

      {/* Reply Layout Start */}
      {showReplyLayout && (
        <div className="flex flex-row rounded-md bg-[#F2F4F7] z-10 w-full h-auto border border-[#D0D5DD] p-[12px] mb-2 justify-between items-start">
          <div className="flex flex-col gap-[2px] w-[92%]">
            <h3 className="text-[13px] font-semibold">{replyName}</h3>
            <div className="flex flex-row gap-1 items-center overflow-hidden">
              {/* Conditionally render the icon based on messageType */}
              {replyData?.messageType === 'image' && (
                <Image src='/icons/image.svg' alt='attachment icon' width={15} height={15} className="flex-shrink-0" />
              )}
              {replyData?.messageType === 'video' && (
                <Image src='/icons/video-icon.svg' alt='attachment icon' width={15} height={15} className="flex-shrink-0" />
              )}
              {replyData?.messageType === 'document' && (
                <Image src='/icons/documents.svg' alt='attachment icon' width={15} height={15} className="flex-shrink-0" />
              )}
              {/* Render the message */}
              <p className="text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">
                {replyData?.message !== null && replyData?.messageType !== 'document'
                  ? truncateMessage(replyData?.message)
                  : replyData?.messageType === 'document'
                    ? truncateMessage(replyData?.fileName)
                    : (replyData?.messageType === 'image' && 'Image') ||
                    (replyData?.messageType === 'video' && 'Video') ||
                    'Unknown Type'}
              </p>
            </div>
          </div>
          <button onClick={() => setShowReplyLayout(false)} className="flex-shrink-0">
            <Image src='/icons/cancel.svg' alt='cancel icon' width={18} height={18} />
          </button>
        </div>
      )}
      {/* Reply Layout End */}

      {showUserList && (
        <div className="flex flex-col w-full bg-white max-h-[200px] z-10 overflow-y-auto  mb-2 justify-between items-start">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div key={index} className="flex flex-col w-full">
                <div
                  key={user.uniqueId}
                  className="flex flex-row gap-2 p-2 cursor-pointer w-full hover:bg-gray-100 items-center"
                  onClick={() => handleUserSelect(user)}
                >
                  <Image className="w-[38px] h-[38px] rounded-full" src={user.profilePic} alt='pic' width={38} height={38} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-[12px] text-gray-500 ">{'@' + user.uniqueId}</span>
                  </div>
                </div>
                <hr className="border-[#f1f1f1]" />
              </div>
            ))
          ) : (
            <div className="p-1 text-gray-500 text-sm mb-1 mt-[-4px]">No users found</div>
          )}
        </div>
      )}

      <div className='flex flex-row'>
        <div className={`flex flex-row rounded-md w-full h-auto bg-[#FCFCFD] py-[6px] ${isFocused ? 'border border-[#D6BBFB]' : 'border border-[#D0D5DD]'}`}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown} // Add this line
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full max-h-[120px] bg-[#FCFCFD] overflow-y-auto resize-none px-3 rounded-md outline-none font-normal text-sm leading-tight pt-[5px]"
            style={{ height: height }}
            placeholder={"Type your message here..."}
          />
          <div className='flex flex-row gap-[12px] mr-4 ml-1 items-end mb-2'>
            <Popover className='mb-2' placement="bottom-end">
              <PopoverTrigger>
                <button className='transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none'>
                  <Image src='/icons/emojies.svg' alt='emojis icon' width={21} height={21} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} hiddenEmojis={['1f595']} />
              </PopoverContent>
            </Popover>
            {!isAnnouncement && (
              <Popover className='mb-2' placement="bottom-end" isOpen={isMediaPopupOpen} onOpenChange={(open) => setIsMediaPopupOpen(open)}>
                <PopoverTrigger>
                  <button className='transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none'>
                    <Image src='/icons/files.svg' alt='attachment icon' width={21} height={21} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <div className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md shadow-md'>
                    <button
                      className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-tr-md rounded-tl-md'
                      onClick={() => document.getElementById("image-input")?.click()}
                    >
                      <Image src='/icons/image.svg' alt='image icon' width={20} height={20} />
                      <span className='font-normal text-[#0C111D] text-sm'>Image</span>
                    </button>
                    <input
                      type="file"
                      id="image-input"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileInputChange(e, "image")}
                    />

                    <button
                      className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'
                      onClick={() => document.getElementById("video-input")?.click()}
                    >
                      <Image src='/icons/video-icon.svg' alt='video icon' width={20} height={20} />
                      <span className='font-normal text-[#0C111D] text-sm'>Video</span>
                    </button>
                    <input
                      type="file"
                      id="video-input"
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => handleFileInputChange(e, "video")}
                    />

                    <button
                      className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md'
                      onClick={() => document.getElementById("document-input")?.click()}
                    >
                      <Image src='/icons/documents.svg' alt='document icon' width={20} height={20} />
                      <span className='font-normal text-[#0C111D] text-sm'>Documents</span>
                    </button>
                    <input
                      type="file"
                      id="document-input"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileInputChange(e, "document")}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            )}
            {!fileName && (
              <button className='transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none'
                onClick={() => setIsAnnouncement(!isAnnouncement)}>
                {isAnnouncement ? <Image src='/icons/megaphone-a-purple.svg' alt='Announcement icon' width={23} height={23} /> : <Image src='/icons/megaphone-a-light.svg' alt='Announcement icon' width={23} height={23} />}
              </button>
            )}
          </div>
        </div>

        <button
          className="ml-3 mr-3"
          style={{
            cursor: (text.trim() || fileUrl) && !isSending ? 'pointer' : 'not-allowed',
            opacity: isSending ? 0.5 : 1
          }}
          onClick={handleSend}
          disabled={!text.trim() && !fileUrl || isSending}
        >
          {isSending ? (
            <div className='w-6 h-6 animate-spin-loading rounded-[50%] shadow-inner-button border-2 border-lightGrey border-solid border-t-2 border-t-progressPurple'></div> // Show spinner
          ) : (
            <Image
              src={text.trim() || fileUrl ? '/icons/sendCommunity.svg' : '/icons/send.svg'}
              alt='send icon'
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default BottomText;
