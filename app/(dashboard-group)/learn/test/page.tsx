import MyTestSeries from "@/components/DashboardComponents/LearnComponents/TestsComponents/MyTestSeries";
import SuggestedTestSeries from "@/components/DashboardComponents/LearnComponents/TestsComponents/SuggestedTestSeries";

export default function MyTests() {
    return (
        <div className="flex flex-col ">
            <div className='flex flex-col w-full flex-1 mt-4 ml-6'>
                <div className='flex flex-1'>
                    <MyTestSeries />
                </div>
            </div>
            <div className='flex w-full ml-6'>
                <div className='flex '>
                    <SuggestedTestSeries />
                </div>
            </div>
        </div>
    );
}
