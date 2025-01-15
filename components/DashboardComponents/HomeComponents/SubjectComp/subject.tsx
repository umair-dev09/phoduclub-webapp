"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BottomSheet from '@/components/DashboardComponents/HomeComponents/SubjectComp/bottomUpSheet';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import LoadingData from '@/components/Loading';
import MessageLoading from '@/components/MessageLoading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CircularProgressProps {
    percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressColor = normalizedPercentage === 100 ? '#98A2B3' : '#7400E0';

    return (
        <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="rotate-360 w-16 h-16" viewBox="0 0 36 36">
                <path
                    className="fill-none stroke-[#EDEFF6] stroke-[3.5] stroke-linecap-round"
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
                <path
                    className="fill-none stroke-[3.5] stroke-linecap-round transition-all duration-300"
                    style={{ stroke: progressColor, strokeDasharray: `${normalizedPercentage} ${100 - normalizedPercentage}` }}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-center">
                {normalizedPercentage}%
            </div>
        </div>

    );
};

const SubjectLayout: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const currentUserId = auth.currentUser?.uid;
    const [subjectCounts, setSubjectCounts] = useState({
        physics: 0,
        chemistry: 0,
        maths: 0,
        total: 0
    });
    const [userInSubjectCounts, setUserInSubjectCounts] = useState({
        physics: 0,
        chemistry: 0,
        maths: 0,
        total: 0
    });

    useEffect(() => {
        const fetchSubjectCounts = async () => {
            try {
                const sptRef = collection(db, 'spt');
                const sptSnapshot = await getDocs(sptRef);
                
                let physics = 0;
                let chemistry = 0;
                let maths = 0;
                let total = sptSnapshot.size;

                let userPhysics = 0;
                let userChemistry = 0;
                let userMaths = 0;
                let userTotal = 0;

                for (const doc of sptSnapshot.docs) {
                    const subject = doc.data().subject?.toLowerCase();
                    if (subject === 'physics') physics++;
                    else if (subject === 'chemistry') chemistry++;
                    else if (subject === 'maths') maths++;

                    // Check if user exists in students subcollection
                    const studentsRef = collection(doc.ref, 'students');
                    const studentSnapshot = await getDocs(studentsRef);
                    const userExists = studentSnapshot.docs.some(doc => doc.id === currentUserId);

                    if (userExists) {
                        if (subject === 'physics') userPhysics++;
                        else if (subject === 'chemistry') userChemistry++;
                        else if (subject === 'maths') userMaths++;
                        userTotal++;
                    }
                }

                setSubjectCounts({
                    physics,
                    chemistry,
                    maths,
                    total
                });

                setUserInSubjectCounts({
                    physics: userPhysics,
                    chemistry: userChemistry,
                    maths: userMaths,
                    total: userTotal
                });
            } catch (error) {
                console.error('Error fetching subject counts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUserId) {
            fetchSubjectCounts();
        }
    }, [currentUserId]);

    if(loading){
        return <MessageLoading />
    }
    const openBottomSheet = (subjectName: string) => {
        setSelectedSubject(subjectName);
        setShowDrawer(true);
    };
  


    return (
        <div className="grid grid-cols-2 gap-5 p-6 w-full">
            {/* {subjectsData.map((subject,index) => {
                const percentage = calculatePercentage(subject.numerator, subject.denominator);
                const isComplete = percentage === 100;

                return ( */}
                    
                    <button
                        onClick={() => openBottomSheet('overall')}
                        className={`border border-gray-200 rounded-lg px-6 py-2 flex items-center justify-between transition-transform duration-300 ease-in-out hover:border-[#7400E03D] hover:shadow-lg hover:scale-105 
                           `}
                        //    ${isComplete ? 'bg-[#F9FAFB] hover:border-gray-200' : 'bg-white hover:border-[#7400E03D] '  }
                    >
                        <div className="pt-2">
                            <div className="flex items-center flex-row gap-[6px]">
                                <Image
                                    src={`/icons/overall.svg`}
                                    alt={`Overall-icon`}
                                    width={16}
                                    height={16}
                                />
                                <div className="text-[#667085] text-xs font-semibold ">Overall</div>

                                {/* {isComplete && (
                                    <Image
                                        src="/icons/right-mark.svg"
                                        alt="right-mark"
                                        width={16}
                                        height={16}
                                    />
                                )} */}
                            </div>
                            <div className="flex items-center leading-none mt-2">
                                <span className="text-3xl font-semibold text-[#1D2939]">{userInSubjectCounts.total}</span>
                                <span className="text-base text-[#1D2939] ml-1 font-semibold mt-1">/{subjectCounts.total}</span>
                            </div>
                        </div>
                        <div className="relative w-16 h-16">
                            <CircularProgress percentage={0} />
                        </div>
                    </button>
                    <button
                        onClick={() => openBottomSheet('physics')}
                        className={`border border-gray-200 rounded-lg px-6 py-2 flex items-center justify-between transition-transform duration-300 ease-in-out hover:border-[#7400E03D] hover:shadow-lg hover:scale-105 
                           `}
                        //    ${isComplete ? 'bg-[#F9FAFB] hover:border-gray-200' : 'bg-white hover:border-[#7400E03D] '  }
                    >
                        <div className="pt-2">
                            <div className="flex items-center flex-row gap-[6px]">
                                <Image
                                    src={`/icons/physics.svg`}
                                    alt={`Physics-icon`}
                                    width={16}
                                    height={16}
                                />
                                <div className="text-[#667085] text-xs font-semibold ">Physics</div>

                                {/* {isComplete && (
                                    <Image
                                        src="/icons/right-mark.svg"
                                        alt="right-mark"
                                        width={16}
                                        height={16}
                                    />
                                )} */}
                            </div>
                            <div className="flex items-center leading-none mt-2">
                                <span className="text-3xl font-semibold text-[#1D2939]">{userInSubjectCounts.physics}</span>
                                <span className="text-base text-[#1D2939] ml-1 font-semibold mt-1">/{subjectCounts.physics}</span>
                            </div>
                        </div>
                        <div className="relative w-16 h-16">
                            <CircularProgress percentage={0} />
                        </div>
                    </button> <button
                        onClick={() => openBottomSheet('chemistry')}
                        className={`border border-gray-200 rounded-lg px-6 py-2 flex items-center justify-between transition-transform duration-300 ease-in-out hover:border-[#7400E03D] hover:shadow-lg hover:scale-105 
                           `}
                        //    ${isComplete ? 'bg-[#F9FAFB] hover:border-gray-200' : 'bg-white hover:border-[#7400E03D] '  }
                    >
                        <div className="pt-2">
                            <div className="flex items-center flex-row gap-[6px]">
                                <Image
                                    src={`/icons/chemistry.svg`}
                                    alt={`Chemistry-icon`}
                                    width={16}
                                    height={16}
                                />
                                <div className="text-[#667085] text-xs font-semibold ">Chemistry</div>

                                {/* {isComplete && (
                                    <Image
                                        src="/icons/right-mark.svg"
                                        alt="right-mark"
                                        width={16}
                                        height={16}
                                    />
                                )} */}
                            </div>
                            <div className="flex items-center leading-none mt-2">
                                <span className="text-3xl font-semibold text-[#1D2939]">{userInSubjectCounts.chemistry}</span>
                                <span className="text-base text-[#1D2939] ml-1 font-semibold mt-1">/{subjectCounts.chemistry}</span>
                            </div>
                        </div>
                        <div className="relative w-16 h-16">
                            <CircularProgress percentage={0} />
                        </div>
                    </button> 
                    <button
                        onClick={() => openBottomSheet('maths')}
                        className={`border border-gray-200 rounded-lg px-6 py-2 flex items-center justify-between transition-transform duration-300 ease-in-out hover:border-[#7400E03D] hover:shadow-lg hover:scale-105 
                           `}
                        //    ${isComplete ? 'bg-[#F9FAFB] hover:border-gray-200' : 'bg-white hover:border-[#7400E03D] '  }
                    >
                        <div className="pt-2">
                            <div className="flex items-center flex-row gap-[6px]">
                                <Image
                                    src={`/icons/maths.svg`}
                                    alt={`Maths-icon`}
                                    width={16}
                                    height={16}
                                />
                                <div className="text-[#667085] text-xs font-semibold ">Maths</div>

                                {/* {isComplete && (
                                    <Image
                                        src="/icons/right-mark.svg"
                                        alt="right-mark"
                                        width={16}
                                        height={16}
                                    />
                                )} */}
                            </div>
                            <div className="flex items-center leading-none mt-2">
                                <span className="text-3xl font-semibold text-[#1D2939]">{userInSubjectCounts.maths}</span>
                                <span className="text-base text-[#1D2939] ml-1 font-semibold mt-1">/{subjectCounts.maths}</span>
                            </div>
                        </div>
                        <div className="relative w-16 h-16">
                            <CircularProgress percentage={0} />
                        </div>
                    </button>
            
           {showDrawer && <BottomSheet isOpen={showDrawer} closeModal={() => setShowDrawer(!showDrawer)} subjectName={selectedSubject} />} 
           <ToastContainer/>
        </div>
    );
};

export default SubjectLayout;