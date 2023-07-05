import imgOne from "../../Images/Home/sec-five-img-one.jpg";
import imgTwo from "../../Images/Home/sec-five-img-two.jpg";
import imgThree from "../../Images/Home/sec-five-img-three.jpg";

export const SecFive = () => {
    return (
        <div className="py-20 px-52 flex justify-between 2xl:px-32 2xl:gap-10">
            <div className="flex gap-6 items-center">
                <div className="flex flex-col gap-24">
                    <img src={imgOne} alt="woman" className="rounded-full h-40 w-40" />
                    <img src={imgTwo} alt="man" className="rounded-full h-40 w-40" />
                </div>
                <img src={imgThree} alt="man" className="rounded-full h-40 w-40" />
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <h3 className="w-[665px] text-5xl font-bold leading-relaxed 2xl:w-[550px]">Write, read and connect with great minds on chatter</h3>
                    <p className="w-[594px] text-lg font-normal 2xl:w-[540px]">Share people your great ideas, and also read write-ups based on your interests. connect with people of same interests and goals  </p>
                </div>
                <button className='w-max px-6 py-3.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-500 ease-in-out'>
                    Get Started
                </button>
            </div>
        </div>
    )
}