"use client";
import React, { useEffect, useState } from "react";
import Leaderboard from "@/components/DashboardComponents/AnalyticsComponents/Quizzes-Components/Leaderboard";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell } from 'recharts';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "@/firebase";

interface AttemptData {
    score?: number;
    answeredCorrect: number;
    answeredIncorrect: number;
    attemptedQuestions: number;
    timeTaken: number;
    totalQuestions: number;
    totalTime: number;
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

function QuizAnalytics() {
  
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
      const [currentUserDisplayId, setCurrentUSerDisplayId] = useState('');

      const [premiumAttempts, setPremiumAttempts] = useState<any[]>([]);
      const [selectedAttemptFilter, setSelectedAttemptFilter] = useState<string>('All');
  


    useEffect(() => {
        if (!currentUserId) return;
  
        const fetchUserData = async () => {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUserId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setIsUserPremium(userData.isPremium || false);
                setCurrentUSerDisplayId(userData.userId || '');
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
  
        fetchUserData();
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
                             uniqueId: attemptDoc.id,
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
  
                  const currentUserRankData = sortedLeaderboard.find(user => user.uniqueId === currentUserId);
                  
                  if (currentUserRankData) {
                      setCurrentUserRank(currentUserRankData);
                  } else {
                      const userDoc = await getDoc(doc(usersRef, currentUserId!));
                      const userData = userDoc.exists() ? userDoc.data() : {};
  
                      setCurrentUserRank({
                          userId: userData?.userId || 'loading...',
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
        <div className="flex flex-1 flex-col py-6 mx-8">
            <div className="flex flex-row justify-between items-center text-[#1D2939]">
            <div className="flex flex-row gap-3 items-center">
            <h3>Overview</h3>
            <div className="flex items-center text-sm">{new Date().toLocaleString("default", { month: "long" })}</div>
            </div>
            <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                        </div>

                        {isUserPremium ? (
                        <Popover placement="bottom-end">
                        <PopoverTrigger>
                            <div className="flex w-auto h-[2.313rem] gap-2 bg-white rounded-md px-3 py-2 text-sm justify-between">
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
                                                            onClick={() => handleAttemptFilterChange('All')} 
                                                            className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0] rounded-t-8">
                                All
                            </button>
                            {premiumAttempts.map((attempt, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => handleAttemptFilterChange(attempt.name)} 
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
            </div>
            <div className="mt-5 mb-4">
                <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
                    <div className="flex flex-row justify-between">
                        {/* Total Questions */}
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Total Questions</div>
                                <h3 className="text-[15px]">{currentUserStats.totalQuestions}</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        {/* Attempted Questions */}
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                <h3 className="text-[15px]">{currentUserStats.attemptedQuestions}</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        {/* Time Taken */}
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                            <h3 className="text-[15px]">{formatTime(currentUserStats.timeTaken)} of {formatTime(currentUserStats.totalTime)}</h3>
                        </div>
                    </div>
                    {/* Additional Stats */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Answered Correct</div>
                                <h3 className="text-[15px]">{currentUserStats.answeredCorrect}</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Answered Incorrect</div>
                                <h3 className="text-[15px]">{currentUserStats.answeredIncorrect}</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Total Score</div>
                            <h3 className="text-[15px]">{currentUserStats.score}</h3>
                        </div>
                    </div>
                </div>
            </div>


            <div className="py-5 text-[#1D2939]"><h3>Leaderboard Analytics</h3></div>
            <div className="flex flex-col w-full h-auto gap-2">
                <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
                    <tr className="flex flex-1 py-3 text-neutral-500 ">
                        <td className="w-[8%] text-center"><p>Rank</p></td>
                        <td className="w-[20%]">Students</td>
                        <td className="w-[12%] text-center"><p>Scores</p></td>
                        <td className="w-[12%] text-center"><p>Attempted Question</p></td>
                        <td className="w-[12%] text-center"><p>Answered Correct</p></td>
                        <td className="w-[12%] text-center"><p>Answered Incorrect</p></td>
                        <td className="w-[12%] text-center"><p>Accuracy</p></td>
                        <td className="w-[12%] text-center"><p>Time Spent</p></td>
                    </tr>
                    <Leaderboard />               
                </table>
                {currentUserRank && (
                <div className="pb-4">
                    <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-[#973AFF] text-white text-sm font-medium">
                        <tr className="flex flex-1 py-3">
                            <td className="flex items-center justify-center w-[8%]"><p>{currentUserRank.rank}</p></td>
                            <td className="flex flex-row w-[20%] gap-2">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <Image className="min-w-10 min-h-10 rounded-full" src={currentUserRank.profilePic ||'/images/DP_Lion.svg'} alt="DP" width={40} height={40} />
                                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                    </div>
                                </div>
                                <div className="flex items-start justify-start flex-col">
                                    <div className="font-semibold">You</div>
                                    <div className="flex justify-start items-start text-[13px]">{currentUserDisplayId}</div>
                                </div>
                            </td>
                            <td className="flex items-center justify-center w-[12%]"><p>{currentUserRank.score}</p></td>
                            <td className="flex items-center justify-center w-[12%]"><p>{currentUserStats.attemptedQuestions}/{currentUserStats.totalQuestions}</p></td>
                            <td className="flex items-center justify-center w-[12%]"><p>{currentUserStats.answeredCorrect}</p></td>
                            <td className="flex items-center justify-center w-[12%]"><p>{currentUserStats.answeredIncorrect}</p></td>
                            <td className="flex items-center justify-center w-[12%]"><p>99%</p></td>
                            <td className="flex items-center justify-center w-[12%]"><p className="w-20 text-end">{formatTime(currentUserStats.timeTaken)}</p></td>
                        </tr>
                    </table>
                </div>
                )}
            </div>
        </div>
    );
}

export default QuizAnalytics;