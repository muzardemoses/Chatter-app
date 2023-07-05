
import boyImg from '../../Images/Home/sec-four-img.jpg';


export const SecFour = () => {

   
    return (
        <div className="py-24 px-20 flex gap-14 xl:px-14 lg:px-10 lg:py-20 lg:gap-7 lg:justify-between md:py-12 md:flex-col md:gap-6" style={{ backgroundColor: "#FFEDCC80" }}>
            <img src={boyImg} alt="boy" className="rounded-full lg:w-60 lg:h-60 md:w-52 md:h-52" />
            <div className='flex flex-col gap-6 lg:gap-3 lg:w-[60%] md:w-full'>
                <div className='flex flex-col gap-12 lg:gap-6 md:gap-4'>
                    <p className='text-lg font-normal'>"Chatter has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions.”</p>
                    <h5 className='text-2xl font-semibold'>Adebobola Muhydeen,<span className='text-lg font-medium'> Software developer at Apple</span> </h5>
                </div>

                <button className='w-max px-6 py-3.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-500 ease-in-out md:py-3 md:px-5 md:font-normal'>Join chatter</button>
            </div>
          
        </div>
    )
}