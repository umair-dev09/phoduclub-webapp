import { useState } from 'react';
import styles from '../Profile.module.css';
import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import ChooseAvatarBox from './ChooseAvatarBox';
import ImageCropper from './Imagecropper';

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
      setUploadedImage(file);
      setShowCropper(true);
      setIsOpen(false); // Close dialog when image is uploaded
      setShowImageCropper(true);
    }
  };

  return (
    <div>
      <button className={styles.changeButton} onClick={() => setIsOpen(true)}>
        <Image className={styles.editIcon} src="/icons/pencil-edit.svg" alt="edit-icon" width={20} height={20} />
        <p className={styles.changeText}>Change</p>
      </button>
      
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className={styles.commonDialogBox}>
            <div className={styles.commonUpdateHeader}>
              <h3>Select an Image</h3>
              <button onClick={() => setIsOpen(false)}>
                <Image src='/icons/cancel.svg' alt="close" width={18} height={18} />
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
      </Dialog>

      {showAvatarBox && <ChooseAvatarBox isOpen={isAvatarBoxOpen} setIsOpen={setIsAvatarBoxOpen} setIsEditing={setIsEditing} />}
      {showCropper && uploadedImage && (
        <ImageCropper imageFile={uploadedImage} setShowCropper={setShowCropper} isOpen={showImageCropper} setIsOpen={setShowImageCropper} />
      )}
    </div>
  );
}

export default ProfilePicUpdate;
