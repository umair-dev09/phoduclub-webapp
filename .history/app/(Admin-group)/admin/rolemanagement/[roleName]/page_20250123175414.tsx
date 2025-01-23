"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Checkbox } from "@nextui-org/react";
import { doc, getDoc, collection, getDocs, onSnapshot, query, where, writeBatch, updateDoc } from 'firebase/firestore';
import { db } from "@/firebase";
import UserRolesView from '@/components/AdminComponents/RoleMangement/UserRolesView';
import LoadingData from '@/components/Loading';
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Delete from '@/components/AdminComponents/RoleMangement/Delete';
import Addnewuser from "@/components/AdminComponents/RoleMangement/AddNewUser";

interface UserData {
  adminId: string;
  name: string;
  userId: string;
  phone: string;
  role: string;
  profilePic: string;
}

interface CourseData {
  courseName: string;
  courseId: string;
  courseImage: string;
  TeachersAssigned: string[]; // Array of teacher IDs

}

function UsersRoleName() {
  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams();
  const userId = searchParams.get('rId');
  const [loading, setLoading] = useState(true);
  const [assignOpen, setAssignOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNamee, setFirstNamee] = useState('');
  const [lastNamee, setLastNamee] = useState('');
  const [userIdd, setUserIdd] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [adminIdd, setAdminIdd] = useState('');
  const [data, setData] = useState<UserData | null>(null);
  const [assignedC, setAssignedC] = useState<CourseData[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const closeDelete = () => setIsDeleteOpen(false);
  const [isAddUser, setisAddUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const closeAddUser = () => {
    setisAddUser(false);
    setIsEditing(false);
  };
  const [popoveropen, setPopoveropen] = useState(false);
  useEffect(() => {
    // Listen for real-time updates to the course collection
    const unsubscribe = onSnapshot(collection(db, 'course'), (courseSnapshot) => {
      const filteredCourses: CourseData[] = [];

      courseSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();
        const teachersAssigned: string[] = courseData.TeachersAssigned || []; // Get the TeachersAssigned array or an empty array

        // Include the course only if userId is in the TeachersAssigned array
        if (!teachersAssigned.includes(userId || '')) {
          filteredCourses.push({
            courseName: courseData.courseName,
            courseId: courseDoc.id,
            courseImage: courseData.courseImage,
            TeachersAssigned: courseData.TeachersAssigned,
          });
        }
      });

      setCourses(filteredCourses);
      setLoading(false);
    });

    // Cleanup listener for the course collection
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    // Listen for real-time updates to the course collection
    const unsubscribe = onSnapshot(collection(db, 'course'), (courseSnapshot) => {
      const filteredCourses: CourseData[] = [];

      courseSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();
        const teachersAssigned: string[] = courseData.TeachersAssigned || []; // Get the TeachersAssigned array or an empty array

        // Include the course only if userId is in the TeachersAssigned array
        if (teachersAssigned.includes(userId || '')) {
          filteredCourses.push({
            courseName: courseData.courseName,
            courseId: courseDoc.id,
            courseImage: courseData.courseImage,
            TeachersAssigned: courseData.TeachersAssigned,
          });
        }
      });

      setAssignedC(filteredCourses);
      setLoading(false);
    });

    // Cleanup listener for the course collection
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, 'admin', userId);

    // Listen for real-time changes in the admin document
    const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
      if (userDocSnap.exists()) {
        setData(userDocSnap.data() as UserData);
      } else {
        console.error('User data not found');
      }
      setLoading(false); // Set loading to false after fetching data
    }, (error) => {
      console.error('Error fetching real-time data:', error);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the real-time listener
    return () => unsubscribe();
  }, [userId]); // Re-run this effect when userId changes

  useEffect(() => {
    if (data) {
      const nameParts = data?.name.split(' ');
      setFirstNamee(nameParts[0] || '');
      setLastNamee(nameParts[1] || '');

    }
  });

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleCheckboxChange = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const assignCourses = async () => {
    if (!selectedCourses.length) {
      alert("Please select at least one course to assign.");
      return;
    }

    try {
      // Loop through selected courses and update each course document
      for (const courseId of selectedCourses) {
        const courseRef = doc(db, 'course', courseId);

        // Fetch current course data using getDoc() for Firestore SDK v9+
        const courseDoc = await getDoc(courseRef);

        // Check if document exists
        if (!courseDoc.exists()) {
          console.error(`Course with ID ${courseId} does not exist.`);
          continue;
        }

        const courseData = courseDoc.data() as CourseData;

        // Ensure TeachersAssigned is always an array
        const teachersAssigned = Array.isArray(courseData.TeachersAssigned) ? courseData.TeachersAssigned : [];

        // Add the userId to the TeachersAssigned array
        const updatedTeachersAssigned = [...teachersAssigned, userId];

        // Update the course document with the new TeachersAssigned array
        await updateDoc(courseRef, {
          TeachersAssigned: updatedTeachersAssigned,
        });
      }
      toast.success("Courses assigned successfully!");
      setSelectedCourses([]); // Clear selected courses
      setAssignOpen(false);
    } catch (error) {
      console.error("Error assigning courses:", error);
      toast.error("Failed to assign courses. Please try again.");
      setAssignOpen(false);
    }
  };

  const removeTeacherFromCourse = async (courseId: string) => {
    try {
      const courseRef = doc(db, 'course', courseId);

      // Fetch the course document
      const courseDoc = await getDoc(courseRef);

      // Check if the document exists
      if (!courseDoc.exists()) {
        console.error(`Course with ID ${courseId} does not exist.`);
        return;
      }

      const courseData = courseDoc.data() as CourseData;

      // Remove the userId from the TeachersAssigned array
      const updatedTeachersAssigned = courseData.TeachersAssigned.filter(
        (teacherId) => teacherId !== userId // Remove the current userId
      );

      // Update the course document with the new TeachersAssigned array
      await updateDoc(courseRef, {
        TeachersAssigned: updatedTeachersAssigned,
      });

      toast.success("Teacher removed from course successfully!");
    } catch (error) {
      console.error("Error removing teacher from course:", error);
      toast.error("Failed to remove teacher from course. Please try again.");
    }
  };

  const handleEditDetails = () => {
    setisAddUser(true);
    setIsEditing(true);
    if (data) {
      const nameParts = data?.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts[1] || '');
      setProfilePic(data.profilePic);
      setUserIdd(data.userId);
      setPhone(data.phone);
      setSelectedRole(data.role);
      setAdminIdd(data.adminId);
    }
  }

  if (loading) {
    return <LoadingData />
  }

  return (
    <div className=' flex flex-col p-8 gap-6 w-full h-auto'>
      <button className='flex flex-row gap-1'>
        <span className='text-base font-medium text-[#667085]'
          onClick={() => router.back()}>Role Management</span>
        <Image
          src="/icons/arrow-right-01-round.svg"
          width={24}
          height={24}
          alt="right-arrow" />
        <span className='text-base font-semibold  text-[#1D2939]'>{data?.name}</span>
      </button>

      <div className='w-full gap-6 flex flex-row '>
        <div className='h-[292px] w-1/2 bg-[#FFFFFF] border border-solid border-[#EAECF0] shadow-md rounded-lg p-6 gap-6 flex flex-col'>
          <div className='h-[72px] flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
              <Image className='rounded-full'
                src={data?.profilePic || '/defaultAdminDP.jpg'}
                width={72}
                height={72}
                alt="profile-pic" />
              <div className='flex flex-col gap-1'>
                <span className='font-medium text-[#1D2939] text-xl'>{data?.name}</span>
                <div> <UserRolesView role={data?.role || ''} /></div>
              </div>
            </div>

            <Popover placement="bottom"
              isOpen={popoveropen}
              onOpenChange={(open) => setPopoveropen(open)}>

              <PopoverTrigger>
                <button className=" h-10 w-10 focus:outline-none flex items-center justify-center rounded-[8px] hover:bg-[#F2F4F7] border border-solid border-[#EAECF0]">
                  <Image
                    src="/icons/three-dots.svg"
                    width={18}
                    height={18}
                    alt="three dots" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[167px]   rounded-md shadow-md  border border-solid border-[#EAECF0] px-0 flex flex-col h-auto">
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                  onClick={handleEditDetails}>
                  <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                  <span className="text-sm text-[#0C111D] font-normal">Edit profile</span>
                </button>
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#FEE4E2]  w-full" onClick={() => { setIsDeleteOpen(true); setPopoveropen(false) }}>
                  <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                  <span className="text-sm text-[#DE3024] font-normal">Delete profile</span>
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <hr className='border border-solid border-[#EAECF0]' />
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2">
              <span className="font-normal text-[#667085] text-[16px]">First Name</span>
              <span className="font-medium text-[#1D2939] text-[16px]">{firstNamee}</span>
            </div>
            <div className="flex flex-col w-1/2">
              <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
              <span className="font-medium text-[#1D2939] text-[16px]">{lastNamee}</span>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2">
              <span className="font-normal text-[#667085] text-[16px]">User ID</span>
              <span className="font-medium text-[#1D2939] text-[16px]">{data?.userId}</span>
            </div>
            <div className="flex flex-col w-1/2">
              <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
              <span className="font-medium text-[#1D2939] text-[16px]">{data?.phone}</span>
            </div>
          </div>

        </div>
        {/* Teacher Course div */}

        {data?.role === 'Teacher' && (
          <div className='max-h-[540px]  w-1/2 bg-[#FFFFFF] border border-solid border-[#EAECF0] shadow-md rounded-lg p-6 gap-6 flex flex-col'>
            <div className='h-10 flex flex-row justify-between items-center focus:outline-none'>
              <span className='text-lg font-semibold text-[#1D2939]'>Accessed Course</span>

              <button className='w-[200px] h-full rounded-md items-center flex flex-row justify-center focus:outline-none gap-2 border-2 border-solid border-[#EAECF0]'
                onClick={() => setAssignOpen(true)}>
                <Image
                  src="/icons/plus-dark.svg"
                  width={16}
                  height={16}
                  alt="plus-icon" />
                <span className='text-sm font-semibold text-[#1D2939]'>Assign New Course</span>
              </button>
            </div>

            <div className="border border-[#EAECF0] rounded-xl overflow-hidden">
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="h-[48px]">
                      <th className="py-3 px-8 text-left text-sm text-[#667085] font-medium">Courses</th>
                      <th className="py-3 px-8 text-right text-sm text-[#667085] font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedC.map((course, index) => (
                      <tr key={index} className="border-t h-[64px]">
                        <td className="py-3 px-8 text-left flex items-center gap-2">
                          <Image className='rounded-full object-cover w-[40px] h-[40px]'
                            src={course.courseImage || ''}
                            width={40}
                            height={40}
                            alt="profile-icon"
                          />
                          <span className="text-[#9012FF] font-semibold text-sm underline">
                            {course.courseName}
                          </span>
                        </td>
                        <td className="py-2 px-8 text-right text-[#DE3024] text-sm font-medium">
                          <button onClick={() => removeTeacherFromCourse(course.courseId)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
        <Dialog open={assignOpen} onClose={() => setAssignOpen(false)} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6 pb-2 max-h-[92%] overflow-y-auto">
              <div className=''>
                <div className="flex flex-row justify-between my-4 ">
                  <h3 className="text-lg font-bold text-[#1D2939]">
                    Assign New Course
                  </h3>
                  <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                    <button onClick={() => setAssignOpen(false)}>
                      <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                    </button>
                  </button>
                </div>
                <div className='flex flex-col overflow-y-auto max-h-[500px] border rounded-sm divide-y-small'>
                  {courses.map((course, index) => (
                    <div key={index} className='flex flex-row w-full py-3 justify-start items-center hover:bg-[#EAECF0] px-2'>
                      <Checkbox color="primary" onChange={() => handleCheckboxChange(course.courseId)} />
                      <span className='text-[#0C111D] font-normal text-sm'>{course.courseName}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row justify-end my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
                  <button onClick={() => setAssignOpen(false)} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold hover:bg-[#F2F4F7] text-sm">Cancel</button>
                  <button
                    onClick={assignCourses}
                    // disabled={!isFormValid || loading}
                    className={`py-[0.625rem] px-6 text-white shadow-inner-button  border border-white rounded-md font-semibold text-sm bg-[#9012FF]`}
                  >
                    Assign
                  </button>
                </div>

              </div>
            </DialogPanel>
          </div >
        </Dialog >

      </div>
      <ToastContainer />
      {isDeleteOpen && <Delete onClose={closeDelete} open={true} authId={data?.adminId || ''} name={data?.name || ''} />}
      {isAddUser && <Addnewuser close={closeAddUser} open={true} isEditing={isEditing} profilePic={profilePic} setProfilePic={setProfilePic} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} userId={userIdd} setUserId={setUserIdd} phone={phone} setPhone={setPhone} selectedRole={selectedRole} setSelectedRole={setSelectedRole} adminIdd={adminIdd} setAdminId={setAdminIdd} />}

    </div>
  );
}

export default UsersRoleName;

