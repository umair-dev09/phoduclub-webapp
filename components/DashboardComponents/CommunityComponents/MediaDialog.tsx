import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import MediaViewDialog from "./MediaViewDialog";
import MediaDialogVideoPreview from "@/components/MediaDialogVideoPreview";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type Chat = {
  message: string;
  messageType: string;
  fileUrl: string;
  senderId: string;
  timestamp: any;
  chatId: string;
  fileName: string;
  fileSize: number;
  isReplying: boolean;
  replyingToId: string;
  replyingToChatId: string;
  replyingToMsg: string;
  replyingToMsgType: string;
  replyingToFileUrl: string;
  replyingToFileName: string;
  isDeleted: boolean;
  adminThatDeletedId: string;
  isDeletedByAdmin: boolean;
  isAdmin: boolean;
  mentions: { userId: string; id: string; isAdmin: boolean }[];
};

interface MediaDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
  chats: Chat[];
}

function MediaDialog({ isOpen, setIsOpen, chats }: MediaDialogProps) {
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [messageType, setMessageType] = useState('');
  const handleCancel = () => {
    setIsOpen({ report: false, media: false });
  };
  const [activeSection, setActiveSection] = useState<'Images' | 'Videos' | 'Documents' | 'Links'>('Images');

  // Helper function to extract URLs from text
  const extractUrls = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  // Filter messages based on type and content
  const imageMessages = chats.filter(chat => !chat.isDeleted && chat.messageType === 'image' && chat.fileUrl);
  const videoMessages = chats.filter(chat => !chat.isDeleted && chat.messageType === 'video' && chat.fileUrl);
  const documentMessages = chats.filter(chat => !chat.isDeleted && chat.messageType === 'document' && chat.fileUrl);
  const linkMessages = chats.reduce<string[]>((acc, chat) => {
    if (!chat.isDeleted && chat.messageType === 'text') {
      const urls = extractUrls(chat.message);
      return [...acc, ...urls];
    }
    return acc;
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'Images':
        return imageMessages.length > 0 ? (
          <div className="flex flex-row flex-wrap gap-4 items-center self-center justify-start w-full">
            {imageMessages.map((chat, index) => (
              <div key={chat.chatId} className="relative">
                <Image onClick={() => { setShowMediaDialog(true); setFileUrl(chat.fileUrl); setMessageType('image'); }}
                  src={chat.fileUrl}
                  alt={chat.fileName || `Image ${index + 1}`}
                  className="w-[130px] h-[110px] object-cover rounded-lg"
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState type="Images" />
        );

      case 'Videos':
        return videoMessages.length > 0 ? (
          <div className="flex flex-row flex-wrap gap-4 items-center self-center justify-start w-full">
            {videoMessages.map((chat) => (
              // <div key={chat.chatId} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              //   <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              //     <Image src="/icons/video-icon.svg" alt="Video" width={24} height={24} />
              //   </div>
              //   <div className="flex-1">
              //     <p className="text-sm font-medium">{chat.fileName}</p>
              //     <a href={chat.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600">
              //       View video
              //     </a>
              //   </div>
              // </div>
              <button key={chat.chatId} onClick={() => { setShowMediaDialog(true); setFileUrl(chat.fileUrl); setMessageType('video'); }}>
                <MediaDialogVideoPreview videoSrc={chat.fileUrl} />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState type="Videos" />
        );

      case 'Documents':
        return documentMessages.length > 0 ? (
          <div className="flex flex-col gap-4">
            {documentMessages.map((chat) => (
              <div key={chat.chatId} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Image src="/icons/documents.svg" alt="Document" width={24} height={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm break-all font-medium">{chat.fileName}</p>
                  <p className="text-xs text-gray-500">
                    {(chat.fileSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <a
                  href={chat.fileUrl}
                  download={chat.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState type="Documents" />
        );

      case 'Links':
        return linkMessages.length > 0 ? (
          <div className="flex flex-col gap-4">
            {linkMessages.map((url, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Image src="/icons/link-icon.svg" alt="Link" width={24} height={24} />
                </div>
                <div className="flex-1">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState type="Links" />
        );
    }
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col justify-center items-center flex-grow">
      <Image
        src={`/icons/Media-No-${type}.svg`}
        alt={`No ${type}`}
        width={122}
        height={122}
      />
      <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
        <span className="font-semibold text-sm text-[#0C111D]">No {type.toLowerCase()}</span>
        <span className="font-normal text-xs text-[#667085]">
          You&apos;ll see all shared {type.toLowerCase()} here
        </span>
      </div>
    </div>
  );

  const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");

  return (
    <div>
      {/* <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto border border-solid border-[#EAECF0]">
            <div className="h-[68px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Media</span>
                <button onClick={handleCancel}>
                  <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                </button>
              </div>
            </div>
            <div className="mx-[24px] mt-4">
              <div className="rounded-lg h-[44px] bg-[#F9FAFB] border border-solid border-[#EAECF0] gap-1 flex flex-row">
                {(['Images', 'Videos', 'Documents', 'Links'] as const).map((section) => (
                  <button
                    key={section}
                    className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === section
                      ? 'bg-[#FFFFFF] text-[#182230] font-semibold shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                      : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                      }`}
                    onClick={() => setActiveSection(section)}
                  >
                    <span className="text-sm">{section}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-[24px] pt-4 pb-4 h-[428px] overflow-y-auto">
              {renderContent()}
            </div>
          </DialogPanel>
        </div>
        {showMediaDialog && <MediaViewDialog open={true} onClose={() => setShowMediaDialog(false)} src={fileUrl} mediaType={messageType || ''} />}
      </Dialog> */}
      <Modal
        scrollBehavior={scrollBehavior}
        isOpen={isOpen}
        hideCloseButton
        onClose={handleCancel}
      >
        <ModalContent>
          <ModalHeader className="border-b border-solid border-[#EAECF0] px-[24px] py-[20px] flex justify-between">
            <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Media</span>
            <button onClick={handleCancel}>
              <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="mx-[24px] mt-4">
              <div className="rounded-lg h-[44px] bg-[#F9FAFB] border border-solid border-[#EAECF0] gap-1 flex flex-row">
                {(['Images', 'Videos', 'Documents', 'Links'] as const).map((section) => (
                  <button
                    key={section}
                    className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === section
                      ? 'bg-[#FFFFFF] text-[#182230] font-semibold shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                      : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                      }`}
                    onClick={() => setActiveSection(section)}
                  >
                    <span className="text-sm">{section}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* <div className="mx-[24px] pt-4 pb-4 h-[428px] overflow-y-auto">
              {renderContent()}
            </div> */}
            <div className="h-[428px] overflow-auto px-6">{renderContent()}</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>

  );
}

export default MediaDialog;