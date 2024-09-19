import { useRef, useState, useEffect } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, PixelCrop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { setCanvasPreview } from '../../../../../utils/setCanvasPreview'; // Adjust the path to where the utility file is located
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import styles from '../Profile.module.css';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

type ImageCropperProps = {
  imageFile: File;
  setShowCropper: (show: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ImageCropper = ({ imageFile, setShowCropper, isOpen, setIsOpen }: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<PixelCrop | undefined>();
  const [error, setError] = useState<string>('');
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null); // Add state for the cropped image URL

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

    // Convert PercentCrop to PixelCrop
    const pixelCrop = convertToPixelCrop(percentCrop, width, height);
    setCrop(pixelCrop); // Now using PixelCrop, no error will occur here
  };

  const handleCropChange = (pixelCrop: PixelCrop, percentCrop: PercentCrop) => {
    setCrop(pixelCrop); // Set PixelCrop here
  };

  const handleCropImage = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        crop // PixelCrop is now ensured here
      );
      const dataUrl = previewCanvasRef.current.toDataURL(); // Get the cropped image as a Data URL
      setCroppedImageUrl(dataUrl); // Set the cropped image URL
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className={styles.commonDialogBox}>
          <>
            <div>
              <button
                className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                onClick={handleCropImage}
              >
                Crop Image
              </button>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            {imgSrc && (
              <div className="flex flex-col items-center">
                <ReactCrop
                  crop={crop}
                  onChange={handleCropChange} // Handle both PixelCrop and PercentCrop
                  circularCrop
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Upload"
                    style={{ maxHeight: '300px' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>

                {/* Cropped image preview */}
                {croppedImageUrl && (
                  <div className="mt-4">
                    <h3 className="text-xs text-gray-600">Cropped Image Preview:</h3>
                    <img
                      src={croppedImageUrl}
                      alt="Cropped"
                      style={{ width: 150, height: 150, borderRadius: '50%', border: '2px solid #000' }}
                    />
                  </div>
                )}

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
          </>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ImageCropper;
