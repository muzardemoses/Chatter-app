
import boyImg from '../../Images/Home/sec-four-img.jpg';


export const SecFour = () => {

   
    return (
        <div className="py-24 px-20 flex gap-14" style={{ backgroundColor: "#FFEDCC80" }}>
            <img src={boyImg} alt="boy" className="rounded-full" />
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-12'>
                    <p className='text-lg font-normal'>"Chatter has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions.”</p>
                    <h5 className='text-2xl font-semibold'>Adebobola Muhydeen,<span className='text-lg font-medium'> Software developer at Apple</span> </h5>
                </div>

                <button className='w-max px-6 py-3.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-500 ease-in-out'>Join chatter</button>
            </div>
          
        </div>
    )
}