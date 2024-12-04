import styles from './Profile.module.css';

const ExamType = () => {

    return (
        <div className="flex flex-wrap gap-2.5 p-2.5">
            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-red-500"></span>
                <p className="text-sm">JEE</p>
            </div>

            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-orange-500"></span>
                <p className="text-sm">BITSAT</p>
            </div>

            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-green-500"></span>
                <p className="text-sm">VITEEE</p>
            </div>

            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-blue-500"></span>
                <p className="text-sm">SRMJEEE</p>
            </div>

            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-blue-500"></span>
                <p className="text-sm">KCET</p>
            </div>

            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-red-500"></span>
                <p className="text-sm">COMEDK</p>
            </div>

            <div className="flex items-center px-2.5 border border-gray-300 rounded-3xl bg-white text-sm text-[#344054] font-medium min-h-[32px] max-h-[32px]">
                <span className="w-2 h-2 rounded-full mr-1.5 bg-orange-500"></span>
                <p className="text-sm">MET</p>
            </div>
        </div>

    );
};

export default ExamType;
