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
            <div className='flex flex-col w-full  ml-6'>
                <div className='ml-6 mb-4 mt-5'>
                    <h3>Suggested</h3>
                </div>
                <div className='flex '>
                    <SuggestedTestSeries />
                </div>
            </div>
        </div>
    );
}
