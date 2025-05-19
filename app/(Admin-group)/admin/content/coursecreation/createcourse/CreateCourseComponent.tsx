import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch, useCallback } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter, useSearchParams } from "next/navigation";

interface priceprops {
    Price: number;
    Discountprice: number;
}

const CreateCourse = () => {

    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [rating, setRating] = useState<string>('');
    const [numRatings, setNumRatings] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const status = searchParams.get("s");
    const courseId = searchParams.get("cId");

    useEffect(() => {
        if (status === "saved" || status === "scheduled" || status === "paused" && courseId) {
            fetchCourseData(courseId || '');
        }
    }, [status, courseId]);


    const fetchCourseData = async (courseId: string) => {
        try {
            const courseDocRef = doc(db, "course", courseId);
            const courseDocSnap = await getDoc(courseDocRef);

            if (courseDocSnap.exists()) {
                const courseData = courseDocSnap.data();
                setCourseName(courseData.courseName || "");
                setCourseDescription(courseData.courseDescription || "");
                setImageUrl(courseData.courseImage || "");
                setPrice(courseData.price || "");
                setDiscountPrice(courseData.discountPrice || "");
                setRating(courseData.rating || "");
                setNumRatings(courseData.noOfRating || "");
            } else {
                toast.error("Course not found!");
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            toast.error("Error loading course data.");
        }
    };

    const handleChange = (content: string) => {

        setCourseDescription(content);

        if (quill && quill.getText().trim() === '') {
            setCourseDescription('');
        } else {

            setCourseDescription(content);
        }

    };
    const isFormValid = courseName && courseDescription && price && discountPrice && rating && numRatings && imageUrl;






    // Modules for React Quill including toolbar options
    const modules = {
        toolbar: false, // Disable default toolbar; we will use custom buttons
    };

    // Set Quill editor instance
    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);



    // Handle custom icon button clicks
    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                console.log('Current Formats:', currentFormats); // Debugging line

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
    // Function to handle tab click and navigate to a new route
    const router = useRouter();
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        const storageRef = ref(storage, `CourseImages/${file.name}`);
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
            setImage(file);
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        const storageRef = ref(storage, `CourseImages/${file.name}`);
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
    };    const handleCreateClick = useCallback(async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    if (courseId) {
                        const courseRef = doc(db, "course", courseId);
                        const courseData = {
                            courseName,
                            courseDescription,
                            courseImage: imageUrl,
                            price,
                            discountPrice,
                            rating,
                            noOfRating: numRatings,
                        };
                        await updateDoc(courseRef, courseData);
                        router.back();
                    }
                    else {
                        const docRef = await addDoc(collection(db, 'course'), {
                            courseName: courseName,
                            courseDescription: courseDescription,
                            courseImage: imageUrl,
                            price: price,
                            discountPrice: discountPrice,
                            rating: rating,
                            noOfRating: numRatings,
                            publishDate: new Date().toISOString(),
                            status: 'saved',
                        });

                        await updateDoc(doc(db, 'course', docRef.id), {
                            courseId: docRef.id,
                        });
                        resolve("Course Created!");
                        router.replace(`/admin/content/coursecreation/${courseName.toLowerCase().replace(/\s+/g, '-')}/?cId=${docRef.id}`)
                    }

                } catch (error) {
                    reject("Failed to Create Course!")
                    // Handle errors in both image upload and Firestore update
                    // toast.error("Failed to upload image or update profile.");
                    console.error("Error:", error);
                }

            }),
            {
                pending: 'Creating Course...',
                success: 'Course Created!',
                error: 'Error Creating Course'
            }
        );
    }, [courseId, courseName, courseDescription, imageUrl, price, discountPrice, rating, numRatings, router]);    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleCreateClick();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleCreateClick]); // Now handleCreateClick is memoized with useCallback


    return (
        <div className="px-[32px] pt-[20px] w-full h-auto overflow-y-auto pb-24">
            {/* Header part*/}
            <div className="flex flex-row justify-between h-[60px] border-b border-solid border-[#D0D5DD]">
                <div className="flex flex-row items-center">
                    <span className="text-[#1D2939] text-lg font-semibold ">{courseId ? 'Edit Course' : 'Create course'}</span>
                </div>
                <div className="flex flex-row ">
                    <button className="h-[44px] w-[120px] rounded-md items-center flex border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center hover:bg-[#F2F4F7]" onClick={() => router.back()}>
                        <span className="text-[#1D2939] font-semibold text-sm">Cancel</span>
                    </button>
                    <button className={`h-[44px] w-[120px] ml-4 rounded-md items-center flex border border-solid border-white  ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] transition-colors duration-150 hover:bg-[#6D0DCC]'} justify-center shadow-inner-button`}
                        onClick={handleCreateClick}
                        disabled={!isFormValid}>
                        <span className="text-[#FFFFFF] font-semibold text-sm">{courseId ? 'Save' : 'Create'}</span>
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                {/* Name of Courses */}
                <div className="mt-4 h-auto p-6 gap-4  rounded-md bg-[#FFFFFF] border border-solid border-[#EAECF0] w-[684px] flex flex-col">
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#1D2939] text-sm font-semibold'>Name</span>
                        <input
                            className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out "
                            placeholder="Name"
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)} // Controlled input for quiz name
                        />
                    </div>
                    {/* Description of Courses */}
                    <div className="flex flex-col gap-2">
                        <span className='text-[#1D2939] text-sm font-semibold '>Description</span>
                        <div

                            className="pt-2 bg-[#FFFFFF]  border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors rounded-[12px]  h-auto">

                            <div className="bg-[#FFFFFF] ">
                                <ReactQuill
                                    ref={quillRef}
                                    value={courseDescription}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    modules={modules}
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
                                            <PopoverContent className="ml-1 gap-4 flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] ">

                                                <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center">
                                                    <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                </button>
                                                <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center">
                                                    <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                </button>
                                                <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center">
                                                    <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                </button>

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
                    {/* Upload the Image */}
                    {imageUrl ? (
                        <div className="flex flex-row items-center gap-3">
                            <Image className="w-[280px] h-[190px] rounded-[4px] object-cover" src={imageUrl} width={280} height={190} alt="course image" />
                            <button className="flex flex-row gap-1 items-center" onClick={() => { setImageUrl(null); setImage(null); }}>
                                <Image src="/icons/delete.svg" width={18} height={18} alt="Delete icon" />
                                <span className="text-sm font-semibold text-[#DE3024] mt-[2px]">Delete</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <span className="text-[#1D2939] font-semibold text-sm">Image</span>
                            <div
                                className="h-[148px] rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD] flex items-center justify-center"
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
                    {/* Pricing of the Courses */}
                    <div className="flex flex-row w-full gap-4">
                        <div className="flex flex-col gap-1 w-1/2 flex-grow">
                            <label htmlFor="discount-price" className="text-[#1D2939] text-sm font-medium">Price</label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out focus:border-red-300">
                                {price && <div className="text-[#1D2939]">₹</div>}
                                <input
                                    id="discount-price"
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
                    {/* Ratings of Courses */}
                    <div className="flex flex-row w-full gap-4">
                        <div className="flex flex-col gap-1 w-1/2 flex-grow">
                            <label htmlFor="rating" className="text-[#1D2939] text-sm font-medium">
                                Ratings
                            </label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                <input
                                    id="rating"
                                    value={rating}
                                    maxLength={3}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Only allow numbers and one decimal point
                                        if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) <= 5)) {
                                            setRating(value);
                                        }
                                    }}
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
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
                                    value={numRatings}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Only allow numbers
                                        if (value === '' || /^\d*$/.test(value)) {
                                            setNumRatings(value);
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
                        <div className="flex items-center gap-2 h-[24px]">
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
                                        <span className="inline-block">({numRatings}</span>
                                        <span className="inline-block"> +Ratings)</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                    {/* Colorless Star Display */}
                    {showColorlessStar && (
                        <div className="flex flex-row gap-1 items-center">
                            <Image
                                src="/icons/colorless-star.svg"
                                width={116}
                                height={20}
                                alt="colorless-star"
                            />
                            <span className="text-[#1D2939] font-medium text-sm">0</span>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}
export default CreateCourse;