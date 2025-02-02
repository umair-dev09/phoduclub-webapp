import React, { useEffect, useRef, useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from "@nextui-org/popover";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { auth, db, storage } from "@/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MuxUploader from "@mux/mux-uploader-react";

type BottomTextProps = {
  showReplyLayout: boolean;
  setShowReplyLayout: (value: boolean) => void;
  pChatId: string | null;
  replyData: { message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null;
  replyName: string;
  chatWithId: string;
  isAdmin: boolean;
};

type UserData = {
  name: string;
  uniqueId: string;
  userId: string;
  profilePic: string;
}

function BottomTextP({
  showReplyLayout,
  replyData,
  setShowReplyLayout,
  pChatId,
  replyName,
  chatWithId,
  isAdmin,
}: BottomTextProps) {
  const [text, setText] = useState("");
  const [height, setHeight] = useState("32px");
  const [isFocused, setIsFocused] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | "document" | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // State to hold the file name
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [uploadTaskRef, setUploadTaskRef] = useState<any>(null); // State to hold the upload task reference
  //   const [replyName, setReplyName] = useState<string | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [showUserList, setShowUserList] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentUser = auth.currentUser; // Get the current user from Firebase Auth\
  const [isSending, setIsSending] = useState(false);

  //   useEffect(() => {
  //     const fetchReplyName = async () => {
  //       if (replyData?.senderId) {
  //         try {
  //           const currentUser = auth.currentUser;
  //           if (currentUser?.uid === replyData.senderId) {
  //             setReplyName("You");
  //           } else {
  //             const userDoc = await getDoc(doc(db, `users/${replyData.senderId}`));
  //             if (userDoc.exists()) {
  //               setReplyName(userDoc.data()?.name || "Unknown User");
  //             } else {
  //               setReplyName("Unknown User");
  //             }
  //           }
  //         } catch (error) {
  //           console.error("Error fetching sender name:", error);
  //           setReplyName("Unknown User");
  //         }
  //       }
  //     };

  //     if (showReplyLayout && replyData?.senderId) {
  //       fetchReplyName();
  //     }
  //   }, [showReplyLayout, replyData]);


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

    e.target.style.height = "32px";
    const newHeight = e.target.scrollHeight <= 120 ? e.target.scrollHeight : 120;
    e.target.style.height = `${newHeight}px`;
    setHeight(newHeight < 120 ? "32px" : "120px");
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setText((prevText) => prevText + emoji.emoji);
  };

  const handleSend = async () => {
    if ((!text.trim() && !fileUrl) || !pChatId) {
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
        `privatechats/${pChatId}/chats`
      );

      const newChatRef = doc(chatsRef);
      const chatId = newChatRef.id;

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
        messageType: fileUrl ? fileType : "text", // Set message type based on file upload
        fileUrl: fileUrl || null,
        fileName: fileName || null,
        fileSize: selectedFile?.size || null,
      };

      // Store the message with mentions in Firestore
      await setDoc(newChatRef, messageData);
      console.log("Message stored successfully");
      const userDoc = doc(db, isAdmin ? "admin" : "users", chatWithId);
      await updateDoc(userDoc, {
        personalChatNotifications: arrayUnion(user.uid),
      });

      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long'
      });

      // Update current user's chatList
      const currentUserDoc = doc(db, isAdmin ? "admin" : "users", user.uid);
      const currentUserSnapshot = await getDoc(currentUserDoc);
      if (currentUserSnapshot.exists()) {
        const chatList = currentUserSnapshot.data().chatList || [];
        const updatedChatList = chatList.map((chat: any) =>
          chat.id === chatWithId ? { ...chat, lastMessageTime: currentTime } : chat
        );
        await updateDoc(currentUserDoc, {
          chatList: updatedChatList,
          lastUpdated: serverTimestamp()
        });
      }

      // Update chat partner's chatList
      const chatWithUserDoc = doc(db, isAdmin ? "admin" : "users", chatWithId);
      const chatWithUserSnapshot = await getDoc(chatWithUserDoc);
      if (chatWithUserSnapshot.exists()) {
        const chatList = chatWithUserSnapshot.data().chatList || [];
        const updatedChatList = chatList.map((chat: any) =>
          chat.id === user.uid ? { ...chat, lastMessageTime: currentTime } : chat
        );
        await updateDoc(chatWithUserDoc, {
          chatList: updatedChatList,
          lastUpdated: serverTimestamp()
        });
      }

      // Reset states after sending message
      setFileUrl(null);
      setProgress(null);
      setFileName(null);
      setSelectedFile(null);
      setShowReplyLayout(false);
      setHeight('33px');
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };


  const handleMediaUpload = async (file: File, type: "image" | "video" | "document") => {
    if (!pChatId) return;

    try {
      const storageRef = ref(storage, `uploads/${pChatId}/${file.name}`);
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

  return (
    <div className="flex flex-col bg-white h-auto px-4 py-4 ">

      {/* Media Layout Start */}
      {fileName && (
        <div className="flex flex-row rounded-md bg-[#F2F4F7] z-10 w-full h-auto border border-[#D0D5DD] p-[14px] mb-2 justify-between">
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
        <div className="flex flex-row z-10 rounded-md bg-[#F2F4F7] w-full h-auto border border-[#D0D5DD] p-[12px] mb-2 justify-between items-start">
          <div className="flex flex-col gap-[2px] w-[92%]">
            <h3 className="text-[13px] font-semibold">{replyData?.senderId === currentUser?.uid ? 'You' : replyName}</h3>
            <div className="flex flex-row gap-1">
              {/* Conditionally render the icon based on messageType */}
              {replyData?.messageType === 'image' && (
                <Image src='/icons/image.svg' alt='attachment icon' width={15} height={15} />
              )}
              {replyData?.messageType === 'video' && (
                <Image src='/icons/video-icon.svg' alt='attachment icon' width={15} height={15} />
              )}
              {replyData?.messageType === 'document' && (
                <Image src='/icons/documents.svg' alt='attachment icon' width={15} height={15} />
              )}
              {/* Render the message */}
              <p className="text-[13px] ">
                {replyData?.message !== null && replyData?.messageType !== 'document'
                  ? replyData?.message // Show message if it's not null and not a document
                  : replyData?.messageType === 'document'
                    ? replyData?.fileName // Always show fileName for document
                    : (replyData?.messageType === 'image' && 'Image') ||
                    (replyData?.messageType === 'video' && 'Video') ||
                    'Unknown Type'}
              </p>
            </div>
          </div>
          <button onClick={() => setShowReplyLayout(false)}>
            <Image src='/icons/cancel.svg' alt='cancel icon' width={18} height={18} />
          </button>
        </div>
      )}

      {/* Reply Layout End */}

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

export default BottomTextP;