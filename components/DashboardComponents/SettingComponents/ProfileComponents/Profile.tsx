"use client";

import styles from './Profile.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Target from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Target';
import EmailUpdate from './EditProfileComponents/EmailUpdate';
import ProfilePicUpdate from './EditProfileComponents/ProfilePicUpdate';
import TargetExamUpdate from './EditProfileComponents/TargetExamUpdate';
import TargetYearUpdate from './EditProfileComponents/TargetYearUpdate';
import PhoneUpdate from './EditProfileComponents/PhoneUpdate';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { userAgent } from 'next/server';
import LoadingData from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

type UserData = {
    name: string | null;
    userId: string | null;
    profilePic: string | null;
    phone: string | null;
    email: string | null;
    targetYear: string | null;
    targetExams: string[] | null;
    isAvatar: boolean | null;
};

function getRandomImageUrl(urls: string[]): string {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
}

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null); 
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(false); // Track error state
    const [nameInput, setNameInput] = useState<string>(''); // Track input value
    const [originalName, setOriginalName] = useState<string>(''); // Track original name from Firestore
    const [hasChanges, setHasChanges] = useState<boolean>(false); // Track if there are any changes
    const [user, setUser] = useState<User | null>(null); 
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to disable/enable the button
    const db = getFirestore();
    const router = useRouter();
  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('No user is logged in');
                 router.push("/login");
                setError(true); // Set error if no user is logged in
                setLoading(false); // Ensure loading is set to false even when no user is found
            }
        });
    
        return () => unsubscribe();
    }, []);
  
    useEffect(() => {
        let unsubscribeFromSnapshot: () => void;
        if (user) {
            const uniqueId = user.uid;
            const userDocRef = doc(db, `users/${uniqueId}`);

            unsubscribeFromSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data() as UserData;
                    setUserData(data);
                    setOriginalName(data.name || '');
                    setNameInput(data.name || '');
                    setLoading(false);
                } else {
                    console.error('No user data found!');
                    setError(true);
                    setLoading(false);
                }
            }, (err) => {
                console.error('Error fetching real-time updates:', err);
                setError(true);
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribeFromSnapshot) {
                unsubscribeFromSnapshot();
            }
        };
    }, [user, db]);

    useEffect(() => {
        if (userData) {
            setIsButtonDisabled(!!userData.isAvatar);
        }
    }, [userData]);
  
    // Display loading or error component while data is being fetched or if there's an error
    if (loading || error) {
        return <LoadingData />;
    }

  
    
    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };
  
    const handleCopy = () => {
        if (userData?.userId) {
          navigator.clipboard.writeText(userData.userId)
            .then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
            })
            .catch(err => console.error('Failed to copy text: ', err));
        } else {
          console.error('No valid userId to copy');
        }
      };

        // Handle input change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
        setHasChanges(e.target.value !== originalName); // Compare with original name
    };

    const updateNameInFirestore = async () => {
        if (user && nameInput !== originalName) {
            try {
                const userDocRef = doc(db, `users/${user.uid}`);
                await updateDoc(userDocRef, {
                    name: nameInput, // Update the name field
                });
                setOriginalName(nameInput); // Reset original name to new value
                setHasChanges(false); // Disable save button after saving
                setIsEditing(false); // Exit editing mode
            } catch (error) {
                console.error('Error updating name:', error);
            }
        }
    };
    const onRemoveClick = async () => {
        const imageUrls: string[] = [
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar1.png?alt=media&token=f794198a-0d5b-4542-a7bd-8c8586e4ef85",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar2.png?alt=media&token=003f3358-5134-49e7-a414-edd89366b5fb",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar3.png?alt=media&token=35414381-9ac0-4742-8661-f4f315a45cc5",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar4.png?alt=media&token=534c8508-01f3-477f-ab71-70c08ce9474f",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar5.png?alt=media&token=57379dbd-e6d2-42de-a628-37c03621dc23",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar6.png?alt=media&token=dac74da1-df0e-4577-9ba5-3fd37a9c1506",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar7.png?alt=media&token=2469737e-d267-48ac-b8de-cc472adf169e",
            "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar8.png?alt=media&token=40cc97cf-aa18-43df-8a5a-254e0a92c603"
          ]

          const profilePic = getRandomImageUrl(imageUrls);
        if(user){
            try {
                const userDocRef = doc(db, `users/${user.uid}`);
                await updateDoc(userDocRef, {
                    profilePic: profilePic, 
                    isAvatar: true
                });
                toast.success("Profile Picture Removed!");
                setIsEditing(false);
            } catch (error) {
                console.error('Error Removing Profile Pic:', error);
            }
        }
    
    };
  
    const colors = [styles.red, styles.orange, styles.green, styles.blue];

    return (
    // <div>


        <div className="flex flex-col h-full w-full justify-between">
        <div className="flex flex-col flex-grow overflow-y-auto pb-[260px] mx-[20px]">
          {/* Your profile content */}
         <div className='Info flex flex-col mr-[5px]'>
         <div className='NameSection flex flex-row items-center my-[15px] justify-between'>
         <div className='NameInfo flex flex-row flex-[0.5] items-center mb-[15px]'>
         <div className='DP flex justify-center items-center mx-[10px]'>
             <Image
                className='rounded-[50%]'
                src={userData?.profilePic || '/defaultDP.svg'}
                alt="profile-image"
                width={72}
                height={72}
                quality={100}>
            </Image>
         </div>
          <div>
           {/* Name and ID */}
            {!isEditing && (
                <div className={styles.johnName}>
                <span className={styles.actualProfileName} >{userData?.name}</span>
                </div>
                )}
                 {!isEditing && (
                 <div className={styles.actualId}>
                <div><span className={styles.id}>{userData?.userId}</span></div>
                <div className={styles.copyButtons}>
                 <div className={styles.copyIcon}>
                 <button className={styles.copyButton} onClick={handleCopy}>
                <Image
                 src="/icons/CopyButton.svg"
                 alt="copy buttons"
                 height={22}
                 width={22}/>
                 </button>
                                        </div>
                                        </div>
                                        {isEditing && (
                                            <div className={styles.sizeRecommendation}>File size must be less than 5MB</div>
                                        )}
                                        {copied && <span className='flex ml-2 mb-1 px-3 py-[4px] bg-[#1D2939] rounded-[6px] text-white font-medium text-[11px]'>Copied!</span>}

                                    </div>
                                    
                                )}

                                {/* Conditionally show Change and Remove buttons */}
                                {isEditing && (
                                    <div className={styles.changeRemove}>
                                        <div className={styles.buttonGroup}>
                                            <ProfilePicUpdate setIsEditing={setIsEditing} />
                                            <button className='px-[14px] py-[8px] rounded-md border-[1.5px]  border-[#EAECF0] hover:bg-[#F0F0F0]'
                                             onClick={onRemoveClick}
                                             disabled={isButtonDisabled}>
                                                <p className={`font-semibold text-[14px] ${isButtonDisabled ? 'text-[#b0b4ba]' : 'text-black'}`}>Remove</p>
                                            </button>
                                        </div>
                                        <span className={styles.files}>File size must be less than 5MB</span>
                                    </div>
                                )}
                </div> 
         </div>
         <div className='flex self-start  text-[#1D2939] pt-1'>
                            {!isEditing && (
                                <button className={styles.editProfileButton} onClick={handleEditProfile}>
                                    <Image
                                        className={styles.editIcon}
                                        src="/icons/pencil-edit.svg"
                                        alt="edit-icon"
                                        width={24}
                                        height={24} />
                                    <p className={styles.editText}>Edit Profile</p>
                                </button>
                            )}
                        </div>
         </div>
         <div className={styles.examSection}>
                    <div className={styles.enrolledExams}>
        {userData?.targetExams?.map((exam, index) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
                <div key={index} className={styles.button}>
                    <span className={`${styles.dot} ${randomColor}`}></span> 
                    <p className={styles.examText}>{exam}</p> {/* Render each exam */}
                 </div>
            );
        })}
    </div>
                        {isEditing && <TargetExamUpdate setIsEditing={setIsEditing}/>}
                    </div>
         </div>

         <div className={styles.divider}><hr /></div>


                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/Name.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className='font-medium text-[16px] mb-1'>Full Name</p>
                            {isEditing && (
                                <input
                                    id="input"
                                    type="text"
                                    value={nameInput}
                                    onChange={handleNameChange} // Handle input changes
                                    className='w-[320px] h-[40px] rounded-md border-solid border-[1px] border-[#d0d5dd] px-[8px] hover:border-none hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] focus:border-none'
                                />
                            )}
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>{userData?.name}</span>
                    )}
                </div>

                <div className={styles.divider}><hr /></div>

                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/Email.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Email</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>{userData?.email}</p>
                            )}
                            
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>{userData?.email}</span>
                    )}
                    {isEditing && (
                        <EmailUpdate setIsEditing={setIsEditing}/>
                    )}
                </div>

                <div className={styles.divider}><hr /></div>

                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/phoneNumber.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Phone Number</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>{userData?.phone}</p>
                            )}
                            
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>{userData?.phone}</span>
                    )}
                    {isEditing && (
                        <PhoneUpdate/>
                    )}
                </div>

                <div className={styles.divider}><hr /></div>

                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/TargetYear.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Target Year</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>{userData?.targetYear}</p>
                            )}
                            
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>{userData?.targetYear}</span>
                    )}
                    {isEditing && (
                      <TargetYearUpdate setIsEditing={setIsEditing}/>
                    )}
                </div>

        </div>
  
        {/* Sticky Footer Div */}
    
        {isEditing && (
                <div className='flex w-full sticky bottom-0 items-center justify-end p-5 border-t border-solid border-[#eaecf0] h-[70px] bg-white ' style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}>
                    <div className={styles.insideBase}>
                        
                            <button className="border-[1px] border-solid border-[#D1D5DB]  rounded-[8px] px-[24px] py-[10px] bg-transparent text-[14px] font-semibold" onClick={() => {
                             
                                setIsEditing(false);
                            }}>Cancel</button>
                        
                            <button  className={`text-sm rounded-[8px] px-[24px] py-[11px] font-semibold ml-4 mr-2 shadow-inner-button  text-white ${hasChanges ? 'bg-[#7400E0]' : 'bg-[#d8acff] '}`}
                                disabled={!hasChanges}
                                onClick={updateNameInFirestore} // Call update function on click
                                >Save Changes</button>
                        
                    </div>
                </div>
            )}
        <ToastContainer />

      </div>
    );
}

export default Profile;