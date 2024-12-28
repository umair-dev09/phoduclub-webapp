import Image from "next/image";

export default function AttendTest() {
  
    return(
       <div className="Main Layout flex flex-col w-full h-full">
        <div className="flex w-full h-12 bg-[#3b56c0] pl-3 items-center">
         <h3 className="text-white text-[18px] font-bold font-[Inter]">Phodu JEE Mains All Subject Test (2025)</h3>
        </div>
        <div className="Container flex flex-row h-full">
        <div className="flex flex-col flex-1 pb-[80px]">
        <div className="flex flex-row  border-b border-[#a1a1a1] h-8 pl-2 pr-5 py-2 justify-between items-center">
            <p className="font-[Inter] font-medium text-[12px] text-[#868686]">Section</p>
            <div className="flex flex-row gap-3">
            <button className="flex flex-row gap-1 items-center">
              <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
              <p className="font-[Inter] font-medium text-[12px] ">Instructions</p> 
            </button>
            <p className="font-[Inter] font-semibold text-[12px] ">Time Left: 178:41</p>
            </div>
        </div> 

        <div className="flex flex-row h-8 border-b border-[#A1A1A199]">
        <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2 bg-[#4871CB]">
        <span className="font-[Inter] font-semibold text-[11px] text-white ">Phy sec 1</span>
        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
        </button>
        <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2">
        <span className="font-[Inter] font-semibold text-[11px] text-[#4298EB] ">Phy sec 2</span>
        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
        </button>
        <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2">
        <span className="font-[Inter] font-semibold text-[11px] text-[#4298EB] ">Phy sec 3</span>
        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
        </button>
        </div>
        
        <div className="flex h-8 border-b border-[#A1A1A199] items-center px-3">
        <h3 className="font-[Inter] font-semibold text-[14px] ">Question No 1.</h3>
        </div>

        <div className="Question Area flex flex-col flex-1 overflow-y-auto ">
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Question</p>
            <p>Last</p>

        </div> 

        </div>

        <div className="flex flex-col w-[365px]  border-l border-r border-[#A1A1A199] pb-[77px] bg-[#DEF7FE]">

         <div className="flex flex-row bg-[#DEF7FE] h-[120px] border-t border-b border-[#A1A1A199] items-center pl-6">
         <Image className="w-20 h-20 rounded-[100px] border border-black  " src="/defaultDP.svg" alt="Profile Pic" width={80} height={80}/> 
         <div className="flex flex-col ml-3 items-center justify-center h-20">
            <p className="font-semibold font-['Inter'] text-[16px] text-[#131313] ml-[-2px]">John Smith</p>
            <p className="font-normal font-['Inter'] text-[14px] text-[#667085]">shaiumai6807</p>
         </div>
         </div>

        <div className="flex flex-col h-fit bg-[#f5f5f5] p-4 gap-5">
        <div className="flex flex-row gap-6">
        <div className="flex flex-row gap-[6px] items-center">
        <Image src="/icons/answered.svg" alt="Answered Icon" width={28} height={28}/> 
        <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Answered</p>
        </div>
        <div className="flex flex-row gap-[6px] items-center">
        <Image src="/icons/not-answered.svg" alt="Answered Icon" width={28} height={28}/> 
        <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Answered</p>
        </div>
        </div>

        <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-[6px] items-center">
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Visited</p>
        </div>
        <div className="flex flex-row gap-[6px] items-center">
        <Image src="/icons/marked.svg" alt="Answered Icon" width={28} height={28}/> 
        <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Marked for Review</p>
        </div>
        </div>

        <div className="flex flex-row ">
        <div className="flex flex-row gap-[6px] items-center">
        <Image src="/icons/answered-marked.svg" alt="Answered Icon" width={28} height={28}/> 
        <p className="font-medium font-['Inter'] text-[14px] text-[#131313] w-[250px]">Answered and Marked for Review
        (Will be considered for evaluation)</p>
        </div>
        </div>
        </div>

        <div className="flex h-9 bg-[#4871CB] pl-3 border-t border-b border-[#A1A1A199] items-center">
        <h3 className="text-white text-[14px] font-bold font-[Inter]">Phy sec 1</h3>
        </div>
 
        <div className="flex flex-col flex-1 bg-[#DEF7FE] overflow-y-auto px-4 py-2">
        <p className=" text-[14px] font-medium font-[Inter]">Choose a Question</p>
        <div className="flex flex-row flex-wrap mt-2 gap-3">
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
        <span>Hello</span>

        </div>

        </div>
       
        </div>
        </div>

        <div className="flex flex-row sticky bottom-0 h-16 border-t border-b border-[#A1A1A199] ">
        
        <div className="flex flex-row py-2 flex-1 px-2 justify-between items-center">
        <div className="flex flex-row gap-2">
        <button className="flex border border-[#A1A1A199] items-center justify-center h-[28px] px-4">
        <span className="font-bold font-['Inter'] text-[12px] text-[#717171]">Mark for Review and Next</span>
        </button>   
        <button className="flex border border-[#A1A1A199] items-center justify-center h-[28px] px-4">
        <span className="font-bold font-['Inter'] text-[12px] text-[#717171]">Clear Response</span>
        </button>   
        </div> 
        <button className=" flex items-center justify-center h-[36px] rounded-[3px] bg-[#4871CB] border border-[#A1A1A199] px-3">
         <span className="font-bold font-['Inter'] text-[12px] text-[#F5F5F5]">Save & Next</span>
        </button>
        </div>


        <div className="flex flex-col w-[365px] h-full border-l border-r border-[#A1A1A199] bg-[#def7fe] items-center justify-center py-[4px]">
        <button className=" flex items-center justify-center w-[74px] h-[36px] rounded-[3px] bg-[#4298EB] border border-[#A1A1A199]">
         <span className="font-bold font-['Inter'] text-[12px] text-[#F5F5F5]">Submit</span>
        </button>
        </div>

        </div>

       </div>
    );
}