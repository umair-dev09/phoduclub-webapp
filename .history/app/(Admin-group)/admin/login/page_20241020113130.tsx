import Image from "next/image";
function login() {
    return (
        <div className=" bg-[#f7f8fb] h-screen w-screen flex justify-center items-center">

            <div className="flex justify-center items-center">
                <div>
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={150}
                        height={25}
                    />
                </div>

            </div>
        </div>

    )
}
export default login;