'use client';
import Quiz from "@/components/DashboardComponents/LearnComponents/QuizComponents/Quiz";
import { auth, db } from "@/firebase";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
// Add this interface at the top of your file, outside the component
interface AttemptData {
    score?: number;
    answeredCorrect: number;
    answeredIncorrect: number;
    attemptedQuestions: number;
    timeTaken: number;
    totalQuestions: number;
    totalTime: number;
}

function formatTimeWithSuffix(seconds: number): string {
    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        return `${mins}m`;
    } else {
        const hrs = Math.floor(seconds / 3600);
        return `${hrs}hrs`;
    }
}

function formatTime(seconds: number): string {
    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        return `${mins}m`;
    } else {
        const hrs = Math.floor(seconds / 3600);
        return `${hrs}hrs`;
    }
}

export default function MyQuiz() {
    const [popoveropen, setPopoveropen] = useState(false);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [currentUserRank, setCurrentUserRank] = useState<any>(null);
    const currentUserId = auth.currentUser?.uid;
    const [currentUserStats, setCurrentUserStats] = useState<AttemptData>({
        score: 0,
        answeredCorrect: 0,
        answeredIncorrect: 0,
        attemptedQuestions: 0,
        timeTaken: 0,
        totalQuestions: 0,
        totalTime: 0
    });
    const [isUserPremium, setIsUserPremium] = useState(false);
    const [premiumAttempts, setPremiumAttempts] = useState<any[]>([]);
    const [selectedAttemptFilter, setSelectedAttemptFilter] = useState<string>('All');

    useEffect(() => {
        if (!currentUserId) return;

        const fetchPremiumStatus = async () => {
            try {
                const userDoc = await getDoc(doc(db, "users", currentUserId));
                if (userDoc.exists()) {
                    setIsUserPremium(userDoc.data().isPremium || false);
                }
            } catch (error) {
                console.error("Error fetching premium status:", error);
            }
        };

        fetchPremiumStatus();
    }, [currentUserId]);

    useEffect(() => {
        if (!currentUserId) return;

        const fetchPremiumAttempts = async () => {
            try {
                const premiumQuizSnapshot = await getDocs(collection(db, "premiumQuizAttemptsData"));
                const filteredAttempts = [];

                for (const premiumDoc of premiumQuizSnapshot.docs) {
                    const attemptsRef = collection(db, "premiumQuizAttemptsData", premiumDoc.id, "userAttempts");
                    const userAttemptsSnapshot = await getDocs(query(attemptsRef));

                    const hasUserAttempted = userAttemptsSnapshot.docs.some(attemptDoc => attemptDoc.id === currentUserId);

                    if (hasUserAttempted) {
                        let name = '';
                        const docData = premiumDoc.data();
                        if (docData.productType === 'testseries') {
                            const testSeriesDocRef = doc(db, "testseries", premiumDoc.id);
                            const testSeriesDoc = await getDoc(testSeriesDocRef);
                            name = testSeriesDoc.exists() ? (testSeriesDoc.data() as { testName: string }).testName : '';
                        } else if (docData.productType === 'course') {
                            const courseDocRef = doc(db, "course", premiumDoc.id);
                            const courseDoc = await getDoc(courseDocRef);
                            name = courseDoc.exists() ? (courseDoc.data() as { courseName: string }).courseName : '';
                        }

                        filteredAttempts.push({
                            productId: premiumDoc.id,
                            productType: docData.productType,
                            name: name
                        });
                    }
                }

                setPremiumAttempts(filteredAttempts);
            } catch (error) {
                console.error("Error fetching premium attempts:", error);
            }
        };

        fetchPremiumAttempts();
    }, [currentUserId]);

    const fetchLeaderboardData = async (collectionPath: string, productId?: string) => {
        try {
            const usersRef = collection(db, "users");
            const allAttemptsData: any[] = [];

            let leaderboardDoc;
            if (collectionPath === 'globalQuizAttemptsData') {
                leaderboardDoc = await getDoc(doc(db, collectionPath, currentUserId!));
            } else if (collectionPath === 'premiumQuizAttemptsData' && productId) {
                const attemptsRef = collection(db, collectionPath, productId, "userAttempts");
                const snapshot = await getDocs(attemptsRef);
                leaderboardDoc = snapshot.docs.find(doc => doc.id === currentUserId);
            }

            // Fetch and set current user stats
            if (leaderboardDoc) {
                const statsData = leaderboardDoc.exists() ? leaderboardDoc.data() : {};
                setCurrentUserStats({
                    score: statsData.score || 0,
                    answeredCorrect: statsData.answeredCorrect || 0,
                    answeredIncorrect: statsData.answeredIncorrect || 0,
                    attemptedQuestions: statsData.attemptedQuestions || 0,
                    timeTaken: statsData.timeTaken || 0,
                    totalQuestions: statsData.totalQuestions || 0,
                    totalTime: statsData.totalTime || 0
                });
            }

            // Fetch leaderboard data
            let leaderboardSnapshot;
            if (collectionPath === 'globalQuizAttemptsData') {
                leaderboardSnapshot = await getDocs(collection(db, collectionPath));
            } else if (collectionPath === 'premiumQuizAttemptsData' && productId) {
                leaderboardSnapshot = await getDocs(collection(db, collectionPath, productId, "userAttempts"));
            }

            if (leaderboardSnapshot) {
                const leaderboardPromises = leaderboardSnapshot.docs.map(async (attemptDoc) => {
                    const userDoc = await getDoc(doc(usersRef, attemptDoc.id));
                    const userData = userDoc.exists() ? userDoc.data() : {};
                    const attemptData = attemptDoc.data() as AttemptData;

                    return {
                        userId: attemptDoc.id,
                        ...userData,
                        ...attemptData
                    };
                });

                const fullLeaderboardData = await Promise.all(leaderboardPromises);

                // Sort leaderboard by score
                const sortedLeaderboard = fullLeaderboardData
                    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                    .map((user, index) => ({
                        ...user,
                        rank: index + 1
                    }));

                // Set leaderboard and current user rank
                setLeaderboard(sortedLeaderboard);

                const currentUserRankData = sortedLeaderboard.find(user => user.userId === currentUserId);

                if (currentUserRankData) {
                    setCurrentUserRank(currentUserRankData);
                } else {
                    const userDoc = await getDoc(doc(usersRef, currentUserId!));
                    const userData = userDoc.exists() ? userDoc.data() : {};

                    setCurrentUserRank({
                        userId: currentUserId,
                        name: userData?.name || 'Current User',
                        profilePic: userData?.profilePic || '/images/DP_Lion.svg',
                        score: 0,
                        rank: sortedLeaderboard.length + 1
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    };

    useEffect(() => {
        if (!currentUserId) return;

        if (selectedAttemptFilter === 'All') {
            fetchLeaderboardData('globalQuizAttemptsData');
        } else {
            const selectedPremiumAttempt = premiumAttempts.find(attempt => attempt.name === selectedAttemptFilter);
            if (selectedPremiumAttempt) {
                fetchLeaderboardData('premiumQuizAttemptsData', selectedPremiumAttempt.productId);
            }
        }
    }, [currentUserId, selectedAttemptFilter, premiumAttempts]);

    const handleAttemptFilterChange = (filter: string) => {
        setSelectedAttemptFilter(filter);
    };
    return (
        <div className="CONTAINER flex flex-1 flex-row overflow-hidden">
            {/* Left side - Quizzes */}
            <div className="QUIZZES flex flex-1 flex-col p-8 overflow-y-auto">
                <div className="mb-8">
                    {/* Quiz stats header */}
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                            <h3 className="flex items-center">Quiz Stats</h3>
                            <div className="flex items-center text-sm">{new Date().toLocaleString("default", { month: "long" })}</div>
                        </div>

                        {isUserPremium ? (
                            <Popover placement="bottom-end"
                                isOpen={popoveropen}
                                onOpenChange={(open) => setPopoveropen(open)}>
                                <PopoverTrigger>
                                    <div className="flex w-auto h-[2.313rem] gap-2 bg-white rounded-md px-3 py-2 text-sm justify-between cursor-pointer border border-lightGrey hover:bg-[#F2F4F7]">
                                        <div>{selectedAttemptFilter}</div>
                                        <div>
                                            <div>
                                                <button>
                                                    <Image src='/icons/arrowup.svg' alt="popup" width={20} height={20} />
                                                </button>
                                            </div>
                                            <div className="hidden">
                                                <button>
                                                    <Image src='/icons/arrowdown.svg' alt="popup" width={20} height={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col bg-white w-auto h-auto px-0 items-start border border-lightGrey rounded-md">

                                    <button
                                        onClick={() => {
                                            handleAttemptFilterChange('All');
                                            setPopoveropen(false);
                                        }}
                                        className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0] rounded-t-8">
                                        All
                                    </button>
                                    {premiumAttempts.map((attempt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                handleAttemptFilterChange(attempt.name);
                                                setPopoveropen(false);
                                            }}
                                            className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0]"
                                        >
                                            {attempt.name || 'loading...'}
                                        </button>
                                    ))}

                                </PopoverContent>
                            </Popover>
                        )
                            : (
                                <div className="flex w-[102px] h-[2.313rem] bg-white rounded-md px-3 py-2 text-sm justify-between">
                                    <div>All</div>
                                    <div>
                                        <div>
                                            <button>
                                                <Image src='/icons/arrowup.svg' alt="popup" width={20} height={20} />
                                            </button>
                                        </div>
                                        <div className="hidden">
                                            <button>
                                                <Image src='/icons/arrowdown.svg' alt="popup" width={20} height={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>

                    {/* Quiz Stats */}
                    <div className="bg-white p-4 flex flex-col rounded-2xl mt-4 border border-lightGrey">
                        <div className="flex flex-row justify-between">
                            {/* Total Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Total Questions</div>
                                    <h3 className="text-[15px]">{currentUserStats.totalQuestions || 0}</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Attempted Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Attempted Questions</div>
                                    <h3 className="text-[15px]">{currentUserStats.attemptedQuestions || 0}</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Time Taken */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs">Time Taken</div>
                                <h3 className="text-[15px]">{formatTime(currentUserStats.timeTaken)} of {formatTimeWithSuffix(currentUserStats.totalTime)}</h3>
                            </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="flex flex-row justify-between mt-9">
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Answered Correct</div>
                                    <h3 className="text-[15px]">{currentUserStats.answeredCorrect}</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Answered Incorrect</div>
                                    <h3 className="text-[15px]">{currentUserStats.answeredIncorrect}</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs">Total Score</div>
                                <h3 className="text-[15px]">{currentUserStats.score}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Quizzes */}
                <div className="flex flex-1 flex-col">
                    <div className="mb-4">
                        <h3>All Quizzes</h3>
                    </div>
                    <div className="flex flex-1 w-full">
                        <Quiz />
                    </div>
                </div>
            </div>

            {/* Right side - Leaderboard */}
            <div className="LEADERBOARD w-[380px] bg-white p-4 border-l border-l-lightGrey h-full overflow-y-auto">
                {/* Leaderboard Header */}
                <div className="flex flex-row justify-between">
                    <h3>Leaderboard</h3>
                    <div className="flex items-center text-sm">
                        {new Date().toLocaleString("default", { month: "long" })}
                    </div>
                </div>

                {/* Top 3 Users */}
                <div className="flex flex-row w-full h-40 mt-5 items-end justify-end">
                    {/* 2nd Place */}
                    <div className="flex flex-1 flex-col items-center justify-end rounded-tl-md bg-[#f9fafb] h-[4.75rem] pb-2">
                        <div className="text-2xl relative bottom-0 left-0">
                            <Image
                                src={leaderboard[1]?.profilePic || '/images/DP_Lion.svg'}
                                alt="2nd"
                                width={51.5}
                                height={51.5}
                                className="rounded-full"
                            />
                        </div>
                        <div className="relative left-0 bottom-[1rem]">
                            <Image src="/icons/rank-2.svg" alt="2nd rank" width={22} height={22} />
                        </div>
                        <div className="text-xs font-semibold">
                            {leaderboard[1]?.name
                                ? leaderboard[1].name.length > 10
                                    ? `${leaderboard[1].name.slice(0, 10)}...`
                                    : leaderboard[1].name
                                : 'User'}
                        </div>
                        <div className="text-[0.688rem] font-medium">{leaderboard[1]?.score || 0} Score</div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-1 flex-col items-center justify-end rounded-t-md bg-[#f2f4f7] h-[6.375rem] mt-3 pb-2">
                        <div className="mb-1 mr-1">
                            <Image src='/icons/actualCrown.svg' alt="crown" width={35.82} height={30} />
                        </div>
                        <div className="text-2xl relative bottom-0 left-0">
                            <Image
                                src={leaderboard[0]?.profilePic || '/images/DP_Lion.svg'}
                                alt="1st"
                                width={71}
                                height={72}
                                className="rounded-full"
                            />
                        </div>
                        <div className="relative left-0 bottom-[1rem]">
                            <Image src="/icons/rank-1.svg" alt="1st rank" width={22} height={22} />
                        </div>
                        <div className="text-xs font-semibold">
                            {leaderboard[0]?.name
                                ? leaderboard[0].name.length > 10
                                    ? `${leaderboard[0].name.slice(0, 10)}...`
                                    : leaderboard[0].name
                                : 'User'}
                        </div>
                        <div className="text-[0.688rem] font-medium">{leaderboard[0]?.score || 0} Score</div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-1 flex-col items-center justify-end rounded-tr-md bg-[#f9fafb] h-[4.75rem] pb-2">
                        <div className="text-2xl relative bottom-0 left-0">
                            <Image
                                src={leaderboard[2]?.profilePic || '/images/DP_Lion.svg'}
                                alt="3rd"
                                width={51.5}
                                height={51.5}
                                className="rounded-full"
                            />
                        </div>
                        <div className="relative left-0 bottom-[1rem]">
                            <Image src="/icons/rank-3.svg" alt="3rd rank" width={22} height={22} />
                        </div>
                        <div className="text-xs font-semibold">
                            {leaderboard[2]?.name
                                ? leaderboard[2].name.length > 10
                                    ? `${leaderboard[2].name.slice(0, 10)}...`
                                    : leaderboard[2].name
                                : 'User'}
                        </div>
                        <div className="text-[0.688rem] font-medium">{leaderboard[2]?.score || 0} Score</div>
                    </div>
                </div>

                {/* Ranks 4-10 */}
                <div className="mt-5">
                    {leaderboard.slice(3, 10).map((user, index) => (
                        <div key={user.userId} className="flex flex-row items-center justify-between mb-4 px-3">
                            <div className="flex items-center gap-2">
                                <Image src={user.profilePic} alt="Profile" width={40} height={40} className="rounded-full" />
                                <div>
                                    <div className="text-sm font-semibold">{user.name}</div>
                                    <div className="text-xs text-gray-500">{user.score} Score</div>
                                </div>
                            </div>
                            <div className="text-sm font-semibold">#{index + 4}</div>
                        </div>
                    ))}
                </div>

                {/* Current User */}
                {currentUserRank && (
                    <div className="mt-5  bg-[#f8f0ff] rounded-md">
                        <div className="flex flex-row items-center justify-between px-3 py-2 ">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={currentUserRank.profilePic || '/images/DP_Lion.svg'}
                                    alt="Your Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div>
                                    <div className="text-sm font-semibold">You</div>
                                    <div className="text-xs text-gray-500">{currentUserRank.score} Score</div>
                                </div>
                            </div>
                            <div className="text-sm font-semibold">#{currentUserRank.rank}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
