import divTwoImg from '../../Images/Home/sec-two-div-img.jpg'

export const SecTwo = () => {
    return (
        <div className="py-24 px-20 flex justify-between w-full">
            <div className='sec-two-child-div flex flex-col gap-8'>
                <h3 className='text-black text-5xl font-bold'>About Chatter</h3>
                <p className='text-black text-lg font-normal'>Chatter is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm’s heaven and a blog to get access to more text based content. Our vision is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and understanding, we strive </p>
            </div>
            <img src={divTwoImg} alt="divTwoImg" className="sec-two-child-img rounded-lg" />
        </div>
    )
}