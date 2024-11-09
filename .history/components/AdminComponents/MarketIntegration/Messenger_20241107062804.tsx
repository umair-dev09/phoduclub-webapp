function Messenger() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
                <h1 className="font-semibold text-lg text-[#1D2939]">Messenger</h1>
                <button
                    className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                >
                    <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                </button>
            </div>


        </div>

    )
}
export default Messenger;