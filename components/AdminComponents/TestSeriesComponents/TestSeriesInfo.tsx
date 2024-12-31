import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import Quill from 'quill';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '@/firebase'; // Adjust path if needed
import { toast } from "react-toastify";
import { Checkbox } from "@nextui-org/react";

type TestSeriesInfoProps = {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    imageUrl: string;
    setImageUrl: (imageUrl: string) => void;
    price: string;
    setPrice: (price: string) => void;
    discountPrice: string;
    setDiscountPrice: (discountPrice: string) => void;
    rating: string;
    setRating: (rating: string) => void;
    noOfRating: string;
    setNoOfRating: (noOfRating: string) => void;
    isInCourse: boolean;
    setIsInCourse: (isInCourse: boolean) => void;
}

function TestSeriesInfo({ name, setName, isInCourse, setIsInCourse, description, setDescription, imageUrl, setImageUrl, price, setPrice, discountPrice, setDiscountPrice, rating, setRating, noOfRating, setNoOfRating }: TestSeriesInfoProps) {

    // State to manage each dialog's for Upload Image
    // -------------------------------------------------------------------------------------------------------------------------------
    // state for ReactQuill
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [isWriting, setIsWriting] = useState(false); // Track if text is being written

    const handleChange = (content: string) => {
        setDescription(content);
        checkTextContent(content);
    };

    const checkTextContent = (content: string) => {
        // Trim the content and check if there's actual text (excluding HTML tags like <p></p>)
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
    };
    const handleBlur = () => {
        setIsWriting(false); // Reset isWriting when user clicks outside
    };


    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (format === 'ordered') {
                    // Toggle ordered list
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill.format('align', false); // Remove alignment for 'left'
                        setAlignment('left'); // Update alignment state to 'left'
                    } else {
                        quill.format('align', format.split('-')[1]);
                        setAlignment(format.split('-')[1]);
                    }
                } else {
                    const isActive = currentFormats[format];
                    quill.format(format, !isActive); // Toggle other formatting options
                }
            }
        }
    };

    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);

    const handleKeyDown = () => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (currentFormats.bold) {
                    quill.format('bold', false); // Clear bold formatting when typing starts
                }
                if (currentFormats.italic) {
                    quill.format('italic', false); // Clear italic formatting when typing starts
                }
                if (currentFormats.underline) {
                    quill.format('underline', false);
                }
            }
        }
    };
    // -----------------------------------------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------------------------------------
    // this logic is for Price and Discount

    const handlePriceChange = (e: { target: { value: any; }; }, setter: (arg0: any) => void) => {
        const value = e.target.value;
        // Allow only numbers and decimals
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setter(value);
        }
    };
    // -----------------------------------------------------------------------------------------------------------------------------------------------------
    // this logic is for rating 

    interface StarIconProps {
        filled: boolean;
        isHalf: boolean;
    }
    const StarIcon: React.FC<StarIconProps> = ({ filled, isHalf }) => (
        <Image
            src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
            width={20}
            height={20}
            alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
        />
    );

    const totalStars = 5;

    // Convert rating string to number for calculations
    const ratingValue = parseFloat(rating) || 0;

    // Determine if we should show the colorless star
    const showColorlessStar = !rating || ratingValue === 0;
    // -------------------------------------------------------------------------------------

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // setImage(file);
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        const storageRef = ref(storage, `TestSeriesImages/${file.name}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);

                        // Monitor upload progress and completion
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(`Upload is ${progress}% done`);
                            },
                            (error) => {
                                console.error("Upload failed:", error);
                            },
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                setImageUrl(downloadURL);
                                resolve("Image Updated!");
                            }
                        );
                    } catch (error) {
                        reject("Failed to Update Image!")
                        // Handle errors in both image upload and Firestore update
                        // toast.error("Failed to upload image or update profile.");
                        console.error("Error:", error);
                    }

                }),
                {
                    pending: 'Uploading Course Image...',
                    success: 'Image Uploaded.',
                    error: 'Failed to Upload Image.',
                }
            );
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            // setImage(file);
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        const storageRef = ref(storage, `TestSeriesImages/${file.name}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);

                        // Monitor upload progress and completion
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(`Upload is ${progress}% done`);
                            },
                            (error) => {
                                console.error("Upload failed:", error);
                            },
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                setImageUrl(downloadURL);
                                resolve("Image Updated!");
                            }
                        );
                    } catch (error) {
                        reject("Failed to Update Image!")
                        // Handle errors in both image upload and Firestore update
                        // toast.error("Failed to upload image or update profile.");
                        console.error("Error:", error);
                    }

                }),
                {
                    pending: 'Uploading Image...',
                    success: 'Image Uploaded.',
                    error: 'Failed to Upload Image.',
                }
            );
        }
    };

    return (
        <>
            <div className='mt-4 h-auto rounded-xl border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-3'>
                <div className='flex flex-col gap-2'>
                    <span className='text-[#1D2939] text-sm font-semibold'>Test Series Name</span>
                    <input
                        className="font-medium pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <span className='text-[#1D2939] text-sm font-semibold pt-1'>Description</span>
                    <div
                        className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                            } rounded-[12px] h-auto`}>

                        <div className="bg-[#FFFFFF] ">
                            <ReactQuill
                                ref={quillRef}
                                onBlur={handleBlur}
                                value={description}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                modules={{ toolbar: false }}
                                placeholder="Description"
                                className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal"
                            />
                        </div>

                        <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                            <div className="flex flex-row w-full justify-between items-center mx-5">

                                <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">

                                    <button onClick={() => handleIconClick('bold')}>
                                        <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                    </button>
                                    <button onClick={() => handleIconClick('italic')}>
                                        <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                    </button>
                                    <button onClick={() => handleIconClick('underline')}>
                                        <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                    </button>


                                    <Popover placement="bottom-start" className="flex flex-row justify-end">
                                        <PopoverTrigger className="">
                                            <button className="flex items-center justify-center p-1">
                                                {alignment === 'center' ? (
                                                    <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                                ) : alignment === 'right' ? (
                                                    <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                                ) : (
                                                    <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                                )}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="ml-1 gap-4">

                                            <div className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">
                                                <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center">
                                                    <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                </button>
                                                <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center">
                                                    <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                </button>
                                                <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center">
                                                    <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <button onClick={() => handleIconClick('ordered')}>
                                        <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-3">
                    <span className="text-[#1D2939] font-semibold text-sm">Test Series Image</span>
                    {imageUrl ? (
                        <div className="flex flex-row items-center gap-3">
                            <Image className="w-[280px] h-[190px] rounded-[4px] object-cover" src={imageUrl} width={100} height={100} alt="course image" quality={100} />
                            <button className="flex flex-row gap-1 items-center" onClick={() => { setImageUrl(''); }}>
                                <Image src="/icons/delete.svg" width={18} height={18} alt="Delete icon" />
                                <span className="text-sm font-semibold text-[#DE3024] mt-[2px]">Delete</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div
                                className="h-[180px] rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD] flex items-center justify-center"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <button className="flex flex-col items-center justify-center gap-4 h-full w-full">
                                    <div className="flex flex-col items-center">
                                        <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] p-[10px]">
                                            <Image src="/icons/upload-cloud.svg" width={20} height={20} alt="upload icon" />
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <label className="font-semibold text-sm text-[#9012FF] hover:text-black cursor-pointer">
                                            <input
                                                type="file"
                                                id="upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            Click to upload
                                        </label>
                                        <span className="text-[#182230] text-sm font-medium">or drag and drop</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Checkbox 
                className="mt-3 ml-1 font-medium text-sm" 
                isSelected={isInCourse} 
                onChange={(e) => setIsInCourse(e.target.checked)}
            >
                Include with course
            </Checkbox>
            {isInCourse ? (
            <div className="mt-4 h-auto rounded-xl border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-3">
            <h3>Select product (Optional)</h3>

            </div>
            ) : (
                <div className="mt-4 h-auto rounded-xl border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-3">
                <h3>Price</h3>

                <div className="flex flex-row w-full gap-4 mb-1">
                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                        <label htmlFor="discount-price" className="text-[#1D2939] text-sm font-medium">Price</label>
                        <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out focus:border-red-300">
                            {price && <div className="text-[#1D2939]">₹</div>}
                            <input
                                id="normal-price"
                                maxLength={6}
                                className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                type="text"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => handlePriceChange(e, setPrice)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                        <label htmlFor="discount-price" className="text-[#1D2939] text-sm font-medium">Discount Price</label>
                        <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out focus:border-red-300">
                            {discountPrice && <div className="text-[#1D2939]">₹</div>}
                            <input
                                id="discount-price"
                                maxLength={6}
                                className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                type="text"
                                placeholder=" Discount Price"
                                value={discountPrice}
                                onChange={(e) => handlePriceChange(e, setDiscountPrice)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            )}           
            
            <div className="mt-4 h-auto rounded-xl border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-3 mb-4">
                <h3>Ratings</h3>
                {/* Ratings of Courses */}
                <div className="flex flex-row w-full gap-4">
                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                        <label htmlFor="rating" className="text-[#1D2939] text-sm font-medium">
                            Ratings
                        </label>
                        <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                            <input
                                id="rating"
                                value={rating} maxLength={3}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow numbers and one decimal point
                                    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) <= 5)) {
                                        setRating(value);
                                    }
                                }}
                                className="w-full text-sm bg-white font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                type="text"
                                placeholder="Ratings"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                        <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                            No. of Ratings
                        </label>
                        <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                            <input
                                id="num-ratings"
                                value={noOfRating}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow numbers
                                    if (value === '' || /^\d*$/.test(value)) {
                                        setNoOfRating(value);
                                    }
                                }}
                                className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                type="text"
                                placeholder="No. of Ratings"
                            />
                        </div>
                    </div>
                </div>

                {/* Star Rating Display */}
                {!showColorlessStar && ratingValue > 0 && (
                    <div className="flex items-center gap-2 h-[24px] pb-3 mt-1">
                        <div className="flex items-center">
                            {[...Array(Math.floor(ratingValue))].map((_, index) => (
                                <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
                            ))}
                            {(ratingValue % 1) >= 0.1 && (
                                <StarIcon filled={true} isHalf={true} />
                            )}

                            {[...Array(totalStars - Math.ceil(ratingValue))].map((_, index) => (
                                <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
                            ))}
                        </div>

                        <div className="text-[#1D2939] text-sm font-bold flex items-center mt-1">
                            {ratingValue.toFixed(1)}
                            <span className="text-[#1D2939] font-normal text-sm ml-1">
                                <span className="flex items-center">
                                    <span className="inline-block">({noOfRating}</span>
                                    <span className="inline-block"> +Ratings)</span>
                                </span>
                            </span>
                        </div>
                    </div>
                )}
                {/* Colorless Star Display */}
                {showColorlessStar && (
                    <div className="flex flex-row gap-1 items-center ml-1 pb-3 mt-[2px]">
                        <Image
                            src="/icons/colorless-star.svg"
                            width={116}
                            height={20}
                            alt="colorless-star"
                        />
                        <span className="text-[#1D2939] font-medium text-sm"></span>
                    </div>
                )}

            </div>


        </>
    );
}

export default TestSeriesInfo;