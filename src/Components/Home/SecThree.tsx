import analytiicImg from '../../assets/Svg/Home/carbon-analytics.svg';
import socialImg from '../../assets/Svg/Home/social-interact.svg';
import contentImg from '../../assets/Svg/Home/content-creation.svg';



export const SecThree = () => {
    return (
        <div className="px-52 flex flex-col gap-14 mb-28 2xl:px-36 xl:px-14 lg:px-8 md:mb-16 md:gap-10 sm:mb-12">
            <div className="flex flex-col justify-center items-center gap-6 md:gap-4">
                <h4 className="text-black text-5xl font-bold md:text-4xl sm:text-3xl">Why you should join chatter</h4>
                <p className="text-black text-lg font-normal sm:text-base">Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people</p>
            </div>
            <div className="flex justify-between md:flex-col md:gap-5">
                <div className="h-[324px] w-[306px] pt-4 pl-5 pr-8 border-gray-200 border rounded-lg flex flex-col gap-3 xl:w-[295px] lg:w-[225px] lg:h-[380px] lg:pl-3 lg:pr-4 md:w-full md:h-max md:pb-4 md:flex-row">
                    <div className='bg-gray-100 flex justify-center items-center w-24 h-24 rounded-full sm:w-20 sm:h-20'>
                        <img src={analytiicImg} alt="carbon_analytics" className='h-8 w-8' />
                    </div>
                    <div className='flex flex-col gap-3 md:w-[77%]'>
                        <h5 className='text-black text-2xl font-semibold sm:text-xl'>Analytics</h5>
                        <p className='text-gray-700 text-lg font-normal sm:text-sm'>Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time</p>
                    </div>
                </div>
                <div className="h-[324px] w-[306px] pt-4 pl-5 pr-8 border-gray-200 border rounded-lg flex flex-col gap-3 xl:w-[295px] lg:w-[225px] lg:h-[380px] lg:pl-3 lg:pr-4 md:w-full md:h-max md:pb-4 md:flex-row">
                    <div className='bg-gray-100 flex justify-center items-center w-24 h-24 rounded-full sm:w-20 sm:h-20'>
                        <img src={socialImg} alt="social-interact" className='h-8 w-8' />
                    </div>
                    <div className='flex flex-col gap-3 md:w-[77%]'>
                        <h5 className='text-black text-2xl font-semibold sm:text-xl'>Social interactions</h5>
                        <p className='text-gray-700 text-lg font-normal sm:text-sm'>Users on the platform can interact with posts they like, comment and engage in discussions</p>
                    </div>
                </div>
                <div className="h-[324px] w-[306px] pt-4 pl-5 pr-8 border-gray-200 border rounded-lg flex flex-col gap-3 xl:w-[295px] lg:w-[225px] lg:h-[380px] lg:pl-3 lg:pr-4 md:w-full md:h-max md:pb-4 md:flex-row">
                    <div className='bg-gray-100 flex justify-center items-center w-24 h-24 rounded-full sm:w-20 sm:h-20'>
                        <img src={contentImg} alt="content-creation" className='h-8 w-8' />
                    </div>
                    <div className='flex flex-col gap-3 md:w-[77%]'>
                        <h5 className='text-black text-2xl font-semibold sm:text-xl'>Content creation</h5>
                        <p className='text-gray-700 text-lg font-normal sm:text-sm'>Write nice and appealing with our in-built markdown, a rich text editor</p>
                    </div>

                </div>
            </div>
        </div>
    )
}