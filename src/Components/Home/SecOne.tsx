import { Link } from 'react-router-dom';
import bgImg from '../../Images/Home/sec-one-bg-img.jpg';

export const SecOne = () => {
    return (
        <div className="h-[765px] w-full relative flex justify-center items-center xl:h-[600px] lg:h-[500px] md:h-[400px] sm:h-[350px]">
            <div className="z-10 bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
                <div className='w-max flex flex-col gap-9 md:w-full md:px-10 lg:gap-6 md:gap-4 sm:px-6'>
                    <div className='w-max flex flex-col gap-6 md:w-full'>
                        <h1 className='w-[984px] text-white text-5xl leading-relaxed font-bold xl:w-[760px] lg:w-[660px] lg:leading-normal md:w-full md:text-4xl md:leading-[unset] sm:text-[28px]' >Welcome to Chatter: A Haven for Text-Based Content</h1>
                        <p className='w-[740px] text-white text-2xl leading-normal font-medium sec-one-p-width xl:w-[750px] lg:w-[650px] md:w-full md:text-xl md:leading-[unset] sm:text-lg'>Unleash the Power of Words, Connect with Like-minded Readers and Writers</p>
                    </div>
                    <Link to="/register">
                        <button className='text-white text-lg font-semibold bg-blue-700 rounded-lg py-3.5 px-7 w-max hover:bg-blue-800 transition duration-500 ease-in-out md:text-base md:font-normal md:py-3 md:px-5 sm:text-sm' >Get Started</button>
                    </Link>
                </div>
            </div>
            <img src={bgImg} alt="a girl with a pencil" className="absolute top-0 left-0 w-full h-full" />
        </div>
    )
}