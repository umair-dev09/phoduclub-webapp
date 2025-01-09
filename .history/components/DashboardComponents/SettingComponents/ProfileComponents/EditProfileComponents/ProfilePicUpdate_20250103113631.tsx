import { useState } from 'react';
import styles from '../Profile.module.css';
import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import ChooseAvatarBox from './ChooseAvatarBox';
import ImageCropper from './Imagecropper';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type ProfilePicProps = {
  setIsEditing: (isEditing: boolean) => void;
}

function ProfilePicUpdate({ setIsEditing }: ProfilePicProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAvatarBox, setShowAvatarBox] = useState(false);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [isAvatarBoxOpen, setIsAvatarBoxOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const onChooseAvatarClick = () => {
    setShowAvatarBox(true);
    setIsAvatarBoxOpen(true);
    setIsOpen(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSizeInMB = 5; // Maximum file size in MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to Bytes

      if (file.size > maxSizeInBytes) {
        alert(`The image size cannot exceed ${maxSizeInMB}MB.`);
        return; // Do not proceed if the image size exceeds the limit
      }

      setUploadedImage(file);
      setShowCropper(true);
      setIsOpen(false); // Close dialog when image is uploaded
      setShowImageCropper(true);
    }
  };

  return (
    <div>
      <button className='ml-2 pl-[14px] pr-[16px] py-[8px] rounded-md border-[1.5px] flex flex-row border-[#EAECF0] hover:bg-[#F0F0F0]' onClick={() => setIsOpen(true)}>
        <Image className={styles.editIcon} src="/icons/pencil-edit.svg" alt="edit-icon" width={20} height={20} />
        <p className='font-semibold text-[14px] '>Change</p>
      </button>

      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className={styles.commonDialogBox}>
            <div className={styles.commonUpdateHeader}>
              <h3>Select an Image</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}>
                  <Image src='/icons/cancel.svg' alt="close" width={18} height={18} />
                </button>
              </button>
            </div>
            <div className={styles.commonDivider} />
            <div className={styles.picBox}>
              <label htmlFor="upload" className={styles.profOptionBox}>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Image src="/images/uploadImage.svg" alt="upload" width={110} height={110} />
                <p className="text-sm font-medium">Upload Image</p>
              </label>
              <button className={styles.profOptionBox} onClick={onChooseAvatarClick}>
                <Image src="/images/chooseAvatar.svg" alt="choose avatar" width={110} height={110} />
                <p className="text-sm font-medium">Choose Avatar</p>
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-row justify-between gap-1 border-b border-lightGrey">
              <h3 className='flex items-center justify-center'>Select an Image</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}>
                  <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
                </button>
              </button>
            </ModalHeader>

            <ModalBody className='flex gap-4 pb-4'>
              <div className={styles.picBox}>
                <label htmlFor="upload" className={styles.profOptionBox}>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Image src="/images/uploadImage.svg" alt="upload" width={110} height={110} />
                  <p className="text-sm font-medium">Upload Image</p>
                </label>
                <button className={styles.profOptionBox} onClick={onChooseAvatarClick}>
                  <Image src="/images/chooseAvatar.svg" alt="choose avatar" width={110} height={110} />
                  <p className="text-sm font-medium">Choose Avatar</p>
                </button>
              </div>
            </ModalBody>


          </>
        </ModalContent>
      </Modal>
      {showAvatarBox && <ChooseAvatarBox isOpen={isAvatarBoxOpen} setIsOpen={setIsAvatarBoxOpen} setIsEditing={setIsEditing} />}
      {showCropper && uploadedImage && (
        <ImageCropper imageFile={uploadedImage} setShowCropper={setShowCropper} isOpen={showImageCropper} setIsOpen={setShowImageCropper} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}

export default ProfilePicUpdate;
