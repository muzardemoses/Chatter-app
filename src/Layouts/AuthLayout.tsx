import { ReactNode } from 'react';
import authBgImg from '../Images/Auth/auth-bg-img.png';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex flex-row w-full gap-48 pr-28'>
            <div className='relative h-screen auth-layout-div-width flex'>
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
            <div className='flex-grow'>
                {children}
            </div>
        </div>
    )
}