import { ReactNode } from 'react';
import authBgImg from '../Images/Auth/auth-bg-img.png';
import { useNavigate } from "react-router-dom";
import backImg from "../assets/Svg/Auth/arrowcircleleft.svg"

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row w-full gap-40 overflow-hidden h-screen'>
            <div className='auth-layout-div-width relative flex'>
                <div className='z-10 px-9 bg-black bg-opacity-50 w-full h-full flex flex-col gap-6 justify-center items-center'>
                    <h3 className='text-white text-5xl font-bold'>
                        Chatter
                    </h3>
                    <p className='text-white text-2xl font-medium leading-normal'>
                        Unleash the Power of Words, Connect with Like-minded Readers and Writers
                    </p>
                </div>
                <img src={authBgImg} alt="a woman writing" className='z-0 absolute top-0 left-0 w-full h-full' />
            </div>
            <div className='flex-grow overflow-auto pl-8 pr-28 relative z-20'>
                {children}
                <div className="absolute right-10 top-10">
                    <button onClick={() => navigate(-1)} className="bg-white rounded-full flex gap-1 items-center">
                        <img src={backImg} alt="back" className="w-8 h-8" />
                        <p className="text-sm text-black">Back</p>
                    </button>
                </div>
            </div>
        </div>
    )
}