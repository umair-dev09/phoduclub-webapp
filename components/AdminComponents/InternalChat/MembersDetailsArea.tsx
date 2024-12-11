import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase"; // Import your Firestore and Auth instances
import LoadingData from "@/components/Loading";
import Image from "next/image";
import MemberClickDialog from "@/components/DashboardComponents/CommunityComponents/MemberClickDialog";

type UserData = {
  name: string;
  profilePic: string;
  uniqueId: string;
  adminId?: string;
  isPremium: boolean;
  role: string;
};

type Member = {
  id: string;
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
  }>({
    admin: [],
    chiefModerators: [],
    teachers: [],
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
    const fetchMemberData = async () => {
      setLoading(true);
      const adminData: UserData[] = [];
      const chiefModerators: UserData[] = [];
      const teachers: UserData[] = [];
      const premiumMembers: UserData[] = [];
      const clubMembers: UserData[] = [];

      for (const member of members) {
        try {
          const collection ="admin";
          const docRef = doc(db, collection, member.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data() as UserData;

              if (userData.role === "Admin") {
                adminData.push(userData);
              } else if (userData.role === "ChiefModerator") {
                chiefModerators.push(userData);
              } else if (userData.role === "Teacher") {
                teachers.push(userData);
              }
            
          } else {
            console.error(`No document found for ${collection}/${member.id}`);
          }
        } catch (error) {
          console.error(`Error fetching member ${member.id}:`, error);
        }
      }

      setCategorizedMembers({
        admin: adminData,
        chiefModerators,
        teachers,
      });
      setLoading(false);
    };

    fetchMemberData();
  }, [members]);

  const handleClick = (memberId: string) => {
    setId(memberId);           // Set the id of the clicked member
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
                    (members.find((m) => m.id === (member.uniqueId || member.adminId))
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
                      {member.isPremium && (
                        <Image
                            className="absolute right-[-2px] bottom-0"
                            src="/icons/winnerBatch.svg"
                            alt="Batch"
                            width={16}
                            height={16}
                        />
                       )}
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
        
      })}

      {openDialogue && (
        <MemberClickDialog open={true} onClose={() => setOpenDialogue(false)} id={id} isAdmin={true} />
      )}
    </div>
  );
}

export default MembersDetailsArea;
