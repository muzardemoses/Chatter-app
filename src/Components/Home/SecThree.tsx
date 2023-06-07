import analytiicImg from '../../Assets/Svg/Home/carbon_analytics.svg';
import socialImg from '../../Assets/Svg/Home/social-interact.svg';
import contentImg from '../../Assets/Svg/Home/content-creation.svg';



export const SecThree = () => {
    return (
        <div className="px-52 flex flex-col gap-14 mb-28">
            <div className="flex flex-col justify-center items-center gap-6">
                <h4 className="text-black text-5xl font-bold">Why you should join chatter</h4>
                <p className="text-black text-lg font-normal">Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people</p>
            </div>
            <div className="flex justify-between">
                <div className="sec-three-divs pt-4 pl-5 pr-8 border-gray-200 border rounded-lg flex flex-col gap-3">
                    <div className='bg-gray-100 flex justify-center items-center w-24 h-24 rounded-full'>
                        <img src={analytiicImg} alt="carbon_analytics" className='h-8 w-8' />
                    </div>
                    <h5 className='text-black text-2xl font-semibold'>Analytics</h5>
                    <p className='text-gray-700 text-lg font-normal'>Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time</p>
                </div>
                <div className="sec-three-divs pt-4 pl-5 pr-8 border-gray-200 border rounded-lg flex flex-col gap-3">
                    <div className='bg-gray-100 flex justify-center items-center w-24 h-24 rounded-full'>
                        <img src={socialImg} alt="social-interact" className='h-8 w-8' />
                    </div>
                    <h5 className='text-black text-2xl font-semibold'>Social interactions</h5>
                    <p className='text-gray-700 text-lg font-normal'>Users on the platform can interact with posts they like, comment and engage in discussions</p>
                </div>
                <div className="sec-three-divs pt-4 pl-5 pr-8 border-gray-200 border rounded-lg flex flex-col gap-3">
                    <div className='bg-gray-100 flex justify-center items-center w-24 h-24 rounded-full'>
                        <img src={contentImg} alt="content-creation" className='h-8 w-8' />
                    </div>
                    <h5 className='text-black text-2xl font-semibold'>Content creation</h5>
                    <p className='text-gray-700 text-lg font-normal'>Write nice and appealing with our in-built markdown, a rich text editor</p>
                </div>
            </div>
        </div>
    )
}