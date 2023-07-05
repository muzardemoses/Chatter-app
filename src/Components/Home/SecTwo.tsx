import divTwoImg from '../../Images/Home/sec-two-div-img.jpg'

export const SecTwo = () => {
    return (
        <div className="py-24 px-20 flex justify-between w-full xl:px-12 lg:px-10 md:py-14 md:flex-col md:gap-4" id='about'>
            <div className='w-[53.5%] flex flex-col gap-8 md:w-full md:gap-5'>
                <h3 className='text-black text-5xl font-bold md:text-4xl'>About Chatter</h3>
                <p className='text-black text-lg font-normal'>Chatter is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm’s heaven and a blog to get access to more text based content. Our vision is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and understanding, we strive </p>
            </div>
            <img src={divTwoImg} alt="divTwoImg" className="h-[404px] w-[40%] rounded-lg xl:h-[350px] md:w-full" />
        </div>
    )
}