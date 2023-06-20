import { useState } from 'react'
import addSVG from '../../assets/Svg/Feed/outline-add.svg'
import closeSVG from '../../assets/Svg/Feed/outline-close.svg'


export const CreateContent = () => {

    const [showMediaOptions, setShowMediaOptions] = useState(false)


    return (
        <div className="h-full p-8">
            <div className="w-full h-full pt-9 pl-20 pr-36 border border-gray-300 rounded-lg flex flex-col gap-10">
                <button className="self-end bg-blue-700 text-white w-36 py-4 rounded-lg text-base font-medium">
                    Publish
                </button>
                <div className="w-full flex gap-9">
                    <div className='h-max gap-7'>
                        <button className='mt-9 p-2 border border-gray-300 rounded-full'
                            onClick={() => setShowMediaOptions(!showMediaOptions)}
                        >
                            <img src={showMediaOptions ? closeSVG : addSVG}
                                alt={showMediaOptions ? "close" : "add"}
                                className={`w-9 h-9 transform transition-transform duration-500 ${showMediaOptions ? "rotate-0" : "rotate-90"}`}
                            />
                        </button>
                        {showMediaOptions &&
                            <div>
                              
                            </div>}
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <input type="text" placeholder="Title" className="w-full h-24 border-none px-4 text-5xl font-bold focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out" />
                        <textarea placeholder="Write your story..." className="w-full h-96 border-none px-4 text-xl font-normal focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out" />
                    </div>
                </div>
            </div>
        </div>
    )
}