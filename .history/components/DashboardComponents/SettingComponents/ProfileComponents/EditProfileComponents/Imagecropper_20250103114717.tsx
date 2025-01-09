import { useRef, useState, useEffect } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, PixelCrop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { setCanvasPreview } from '../../../../../utils/setCanvasPreview'; // Adjust the path to where the utility file is located
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import styles from '../Profile.module.css';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';
import { auth, db, storage } from '@/firebase';
import { toast } from 'react-toastify'; // Import react-toastify
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

type ImageCropperProps = {
  imageFile: File;
  setShowCropper: (show: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile
};

const ImageCropper = ({ imageFile, setShowCropper, isOpen, setIsOpen, setIsEditing }: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<PixelCrop | undefined>();
  const [error, setError] = useState<string>('');
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to disable/enable the button
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error('No user is logged in');
      }
    });

    return () => unsubscribe();
  }, []);
  // Read file and set image URL
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const percentCrop: PercentCrop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );

    const pixelCrop = convertToPixelCrop(percentCrop, width, height);
    setCrop(pixelCrop);
  };

  const handleCropChange = (pixelCrop: PixelCrop, percentCrop: PercentCrop) => {
    setCrop(pixelCrop);
  };


  const handleCropImage = async () => {
    setIsButtonDisabled(true);
    if (imgRef.current && previewCanvasRef.current && crop) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        crop
      );

      const dataUrl = previewCanvasRef.current.toDataURL(); // Get the cropped image as a Data URL
      setCroppedImageUrl(dataUrl);
      console.log(user);
      if (user) {
        toast.promise(
          new Promise(async (resolve, reject) => {
            try {
              // Upload the cropped image to Firebase Storage
              const storageRef = ref(storage, `ProfilePicture/${imageFile.name}`);
              const uploadResult = await uploadString(storageRef, dataUrl, "data_url");

              // Check if the upload was successful
              if (uploadResult) {
                // Get the download URL of the uploaded image
                const downloadUrl = await getDownloadURL(storageRef);

                if (downloadUrl) {
                  // Update Firestore user document with the image URL
                  const userDocRef = doc(db, "users", user.uid);

                  await updateDoc(userDocRef, {
                    profilePic: downloadUrl,
                    isAvatar: false,
                  });
                  setIsEditing(false);
                  setIsOpen(false);
                  setIsButtonDisabled(false);
                  // Toast notifications for success
                  resolve("Profile Picture Updated!");

                  // toast.success("Image uploaded and profile updated!");
                  // toast.info(`Profile picture URL: ${downloadUrl}`);
                } else {
                  setIsButtonDisabled(false);
                  reject("Failed to Update Profile Picture!")
                  throw new Error("Failed to get the download URL.");
                }
              } else {
                setIsButtonDisabled(false);
                reject("Failed to Update Profile Picture!")
                throw new Error("Image upload failed.");
              }
            } catch (error) {
              setIsButtonDisabled(false);
              reject("Failed to Update Profile Picture!")
              // Handle errors in both image upload and Firestore update
              toast.error("Failed to upload image or update profile.");
              console.error("Error:", error);
            }

          }),
          {
            pending: 'Updating Profile Picture...',
            success: 'Profile Picture Updated.',
            error: 'Failed to Upload Image or Update Profile.',
          }
        );

      }

    }
  };

  return (
    // <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
    //   <DialogBackdrop className="fixed inset-0 bg-black/30" />
    //   <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
    //     <DialogPanel transition className={styles.commonDialogBox}>
    //       <>
    //         <div>
    //           <div className={styles.commonUpdateHeader}>
    //             <h3>Crop Image</h3>
    //             <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
    //               <button onClick={() => setIsOpen(false)}>
    //                 <Image src='/icons/cancel.svg' alt="cancel-image" width={18} height={18} />
    //               </button>
    //             </button>
    //           </div>
    //           <div className={styles.commonDivider} />
    //         </div>
    //         {error && <p className="text-red-400 text-xs">{error}</p>}
    //         {imgSrc && (
    //           <div className="flex flex-col items-center my-5">
    //             <ReactCrop
    //               crop={crop}
    //               onChange={handleCropChange}
    //               circularCrop
    //               keepSelection
    //               aspect={ASPECT_RATIO}
    //               minWidth={MIN_DIMENSION}
    //             >
    //               <img
    //                 ref={imgRef}
    //                 src={imgSrc}
    //                 alt="Upload"
    //                 style={{ maxHeight: '350px' }}
    //                 onLoad={onImageLoad}
    //               />
    //             </ReactCrop>
    //             <button
    //               className={`min-w-[100px] mt-4 px-4 py-2 rounded-md text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
    //               onClick={handleCropImage}
    //               disabled={isButtonDisabled} // Disable the button if the state is true
    //             >
    //               Save Image
    //             </button>

    //             <canvas
    //               ref={previewCanvasRef}
    //               className="mt-4"
    //               style={{
    //                 display: 'none',
    //                 border: '1px solid black',
    //                 objectFit: 'contain',
    //                 width: 150,
    //                 height: 150,
    //               }}
    //             />
    //           </div>
    //         )}
    //       </>
    //     </DialogPanel>
    //   </div>
    // </Dialog>
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
      hideCloseButton
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-row justify-between gap-1 border border-lightGrey">
            <h3 className='flex items-center justify-center'>Crop Image</h3>
            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
              <button onClick={() => setIsOpen(false)}>
                <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
              </button>
            </button>
          </ModalHeader>

          <ModalBody className='flex gap-4 pb-4'>

            {error && <p className="text-red-400 text-xs">{error}</p>}
            {imgSrc && (
              <div className="flex flex-col items-center my-5">
                <ReactCrop
                  crop={crop}
                  onChange={handleCropChange}
                  circularCrop
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Upload"
                    style={{ maxHeight: '350px' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                <button
                  className={`min-w-[100px] mt-4 px-4 py-2 rounded-md text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
                  onClick={handleCropImage}
                  disabled={isButtonDisabled} // Disable the button if the state is true
                >
                  Save Image
                </button>

                <canvas
                  ref={previewCanvasRef}
                  className="mt-4"
                  style={{
                    display: 'none',
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: 150,
                    height: 150,
                  }}
                />
              </div>
            )}
          </ModalBody>


        </>
      </ModalContent>
    </Modal>

  );
};

export default ImageCropper;
{/* <Modal
isOpen={isOpen}
onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
hideCloseButton
>
<ModalContent>
  <>
    <ModalHeader className="flex flex-row justify-between gap-1 border border-lightGrey">
      <h3 className='flex items-center justify-center'>Crop Image</h3>
      <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        <button onClick={() => setIsOpen(false)}>
          <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
        </button>
      </button>
    </ModalHeader>

    <ModalBody className='flex gap-4 pb-4'>

     {error && <p className="text-red-400 text-xs">{error}</p>}
            {imgSrc && (
              <div className="flex flex-col items-center my-5">
                <ReactCrop
                  crop={crop}
                  onChange={handleCropChange}
                  circularCrop
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Upload"
                    style={{ maxHeight: '350px' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                <button
                  className={`min-w-[100px] mt-4 px-4 py-2 rounded-md text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
                  onClick={handleCropImage}
                  disabled={isButtonDisabled} // Disable the button if the state is true
                >
                  Save Image
                </button>

                <canvas
                  ref={previewCanvasRef}
                  className="mt-4"
                  style={{
                    display: 'none',
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: 150,
                    height: 150,
                  }}
                />
              </div>

    </ModalBody>

    
  </>
</ModalContent>
</Modal> */}
