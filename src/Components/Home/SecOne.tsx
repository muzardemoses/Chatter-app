import { Link } from 'react-router-dom';
import bgImg from '../../Images/Home/sec-one-bg-img.jpg';

export const SecOne = () => {
    return (
        <div className="h-[765px] w-full relative flex justify-center items-center xl:h-[600px]" >
            <div className="z-10 bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
                <div className='w-max flex flex-col gap-9'>
                    <div className='w-max flex flex-col gap-6'>
                        <h1 className='w-[984px] text-white text-5xl leading-relaxed font-bold xl:w-[760px]' >Welcome to Chatter: A Haven for Text-Based Content</h1>
                        <p className='w-[740px] text-white text-2xl leading-normal font-medium sec-one-p-width xl:w-[750px]'>Unleash the Power of Words, Connect with Like-minded Readers and Writers</p>
                    </div>
                    <Link to="/register">
                        <button className='text-white text-lg font-semibold bg-blue-700 rounded-lg py-3.5 px-7 w-max hover:bg-blue-800 transition duration-500 ease-in-out' >Get Started</button>
                    </Link>
                </div>
            </div>
            <img src={bgImg} alt="a girl with a pencil" className="absolute top-0 left-0 w-full h-full" />
        </div>
    )
}