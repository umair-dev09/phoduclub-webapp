import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/firebase"; // Import your Firestore and Auth instances
import LoadingData from "@/components/Loading";
import Image from "next/image";
import MemberClickDialog from "./MemberClickDialog";

type UserData = {
  name: string;
  profilePic: string;
  uniqueId: string;
  adminId?: string;
  isPremium: boolean;
  role: string;
  isOnline: boolean;
};

type Member = {
  id: string;
  isAdmin: boolean;
};

type MembersDetailsAreaProps = {
  members: Member[];
};

function MembersDetailsArea({ members }: MembersDetailsAreaProps) {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [categorizedMembers, setCategorizedMembers] = useState<{
    admin: UserData[];
    chiefModerators: UserData[];
    teachers: UserData[];
    premiumMembers: UserData[];
    clubMembers: UserData[];
  }>({
    admin: [],
    chiefModerators: [],
    teachers: [],
    premiumMembers: [],
    clubMembers: [],
  });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Fetch current user ID
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUserId(user.uid);
    }
  }, []);

  // Fetch members data
  useEffect(() => {
    setLoading(true);
    let isActive = true; // To prevent updates after component unmount

    const categorizedData = {
      admin: [] as UserData[],
      chiefModerators: [] as UserData[],
      teachers: [] as UserData[],
      premiumMembers: [] as UserData[],
      clubMembers: [] as UserData[],
    };

    // Set up real-time listeners for each member
    const unsubscribeFunctions = members.map((member) => {
      const collection = member.isAdmin ? "admin" : "users";
      const docRef = doc(db, collection, member.id);

      return onSnapshot(docRef, (docSnap) => {
        if (!isActive) return;

        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;

          // Clear previous entries for this user
          const userId = member.isAdmin ? userData.adminId : userData.uniqueId;
          Object.values(categorizedData).forEach(array => {
            const index = array.findIndex(u => 
              (member.isAdmin ? u.adminId : u.uniqueId) === userId
            );
            if (index !== -1) array.splice(index, 1);
          });

          // Add user to appropriate category
          if (member.isAdmin) {
            switch (userData.role) {
              case "Admin": categorizedData.admin.push(userData); break;
              case "ChiefModerator": categorizedData.chiefModerators.push(userData); break;
              case "Teacher": categorizedData.teachers.push(userData); break;
            }
          } else {
            if (userData.isPremium) {
              categorizedData.premiumMembers.push(userData);
            } else {
              categorizedData.clubMembers.push(userData);
            }
          }

          setCategorizedMembers({ ...categorizedData });
          setLoading(false);
        } else {
          console.error(`No document found for ${collection}/${member.id}`);
        }
      }, (error) => {
        console.error(`Error fetching member ${member.id}:`, error);
      });
    });

    return () => {
      isActive = false;
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, [members]);

  const handleClick = (memberId: string, memberIsAdmin: boolean) => {
    setId(memberId);           // Set the id of the clicked member
    setAdmin(memberIsAdmin);   // Set the isAdmin value of the clicked member
    setOpenDialogue(true);     // Open the dialog or perform any other action
  };

  // Show loading state
  if (loading) {
    return <LoadingData />;
  }

  // Render categorized members
  return (
    <div className="flex flex-col">
      {Object.entries(categorizedMembers).map(([category, membersList]) => {
        if (category === "premiumMembers") {
          return (
            <div key={category} className="mt-4 mb-1 px-6 transition-all">
              {/* Display the premium icon before the Premium Members heading */}
              <div className="flex flex-row justify-between mb-3">
                <div className="flex flex-row gap-1">
                  <Image
                    src="/icons/premiumicon.svg"
                    alt="premium icon"
                    width={20}
                    height={20}
                  />
                  <h3 className="text-[#182230] text-base capitalize">
                    {category.replace(/([A-Z])/g, " $1")}
                  </h3>
                </div>
                <div className="flex justify-center items-center w-6 h-6 bg-[#F7F8FB] border border-[#D4D9E9] rounded-sm text-xs text-[#4B5563]">
                  {membersList.length}
                </div>
              </div>

              {membersList.map((member) => {
                const isCurrentUser =
                    (members.find((m) => m.id === (member.uniqueId || member.adminId))?.isAdmin
                    ? member.adminId
                    : member.uniqueId) === currentUserId;

                // Find the matching member from `members` to get the `isAdmin` value
                const matchedMember = members.find(
                    (m) => m.id === (member.uniqueId || member.adminId)
                );

                return (
                    <div
                    key={member.uniqueId || member.adminId || member.name}
                    className={`h-auto transition-all group  pb-[6px] ${isCurrentUser ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={
                        !isCurrentUser
                          ? () =>
                              handleClick(
                                matchedMember?.id || '', // Pass the id of the member
                                matchedMember?.isAdmin || false   // Pass the isAdmin value of the member
                              )
                          : undefined // No action for current user
                      }
                    >
                    <div className="flex flex-row items-center my-1 gap-2">
                      <div className="relative">
                      <Image
                        className="rounded-full w-[35px] h-[35px]"
                        src={member.profilePic}
                        alt="Profile Pic"
                        width={35}
                        height={35}
                        />
                     <div className={`w-[15px] h-[15px]  border-[2.5px] border-white rounded-full ${member.isOnline ? 'bg-[#17B26A]' : 'bg-[#98A2B3]'}  absolute right-[-2px] bottom-[-1px]`} />

                      </div>
                      
                        <p className="text-[#4B5563] text-[13px] font-medium">
                        {member.name}
                        {isCurrentUser && " (You)"}
                        </p>
                    </div>
                    </div>
                );
                })}
            </div>
          );
        } else {
          // Render other categories
          return (
            <div key={category} className="mt-4 mb-1 px-6 transition-all">
              <div className="group h-auto">
                <div className="flex flex-row justify-between mb-3">
                  <div className="flex flex-row gap-2">
                    <h3 className="text-[#182230] text-base capitalize">
                      {category.replace(/([A-Z])/g, " $1")}
                    </h3>
                  </div>
                  <div className="flex justify-center items-center w-6 h-6 bg-[#F7F8FB] border border-[#D4D9E9] rounded-sm text-xs text-[#4B5563]">
                    {membersList.length}
                  </div>
                </div>
                {membersList.map((member) => {
                const isCurrentUser =
                    (members.find((m) => m.id === (member.uniqueId || member.adminId))?.isAdmin
                    ? member.adminId
                    : member.uniqueId) === currentUserId;

                // Find the matching member from `members` to get the `isAdmin` value
                const matchedMember = members.find(
                    (m) => m.id === (member.uniqueId || member.adminId)
                );

                return (
                    <div
                    key={member.uniqueId || member.adminId || member.name}
                    className={`h-auto transition-all group  pb-[6px] ${isCurrentUser ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={
                        !isCurrentUser
                          ? () =>
                              handleClick(
                                matchedMember?.id || '', // Pass the id of the member
                                matchedMember?.isAdmin || false   // Pass the isAdmin value of the member
                              )
                          : undefined // No action for current user
                      }
                    >
                    <div className="flex flex-row items-center my-1 gap-2">
                    <div className="relative">
                      <Image
                        className="rounded-full w-[35px] h-[35px]"
                        src={member.profilePic}
                        alt="Profile Pic"
                        width={35}
                        height={35}
                        />
                         <div className={`w-[15px] h-[15px]  border-[2.5px] border-white rounded-full ${member.isOnline ? 'bg-[#17B26A]' : 'bg-[#98A2B3]'}  absolute right-[-2px] bottom-[-1px]`} />
                      </div>
                        <p className="text-[#4B5563] text-[13px] font-medium">
                        {member.name}
                        {isCurrentUser && " (You)"}
                        </p>
                    </div>
                    </div>
                );
                })}
              </div>
            </div>
          );
        }
      })}

      {openDialogue && (
        <MemberClickDialog open={true} onClose={() => setOpenDialogue(false)} id={id} isAdmin={admin} />
      )}
    </div>
  );
}

export default MembersDetailsArea;
