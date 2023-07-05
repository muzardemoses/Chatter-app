export const Footer = () => {
    return (
        <div className="pt-12 pb-40 pl-32 pr-44 flex justify-between 2xl:pl-20 2xl:pr-32 2xl:pb-20 xl:pl-14 xl:pr-20 lg:pl-10 lg:pr-12 md:pt-10 md:pb-12 md:pl-6 md:pr-8" style={{ backgroundColor: "#FFEDCC80" }}>
            <div>
                <h2 className="mt-3 uppercase font-bold text-5xl text-blue-700 lg:text-[40px] md:text-3xl md:mt-0">Chatter</h2>
            </div>
            <div className="flex gap-52 2xl:gap-36 xl:gap-20 lg:gap-9 md:gap-4">
                <div className="flex flex-col gap-7 md:gap-4">
                    <h3 className="text-2xl font-medium">Explore</h3>
                    <div className="flex flex-col gap-4 md:gap-2">
                        <p className="text-lg font-normal">community</p>
                        <p className="text-lg font-normal">Trending blogs</p>
                        <p className="text-lg font-normal">Chatter for teams</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7 md:gap-4">
                    <h3 className="text-2xl font-medium">Support</h3>
                    <div className="flex flex-col gap-4 md:gap-2">
                        <p className="text-lg font-normal">Support docs</p>
                        <p className="text-lg font-normal">Join slack</p>
                        <p className="text-lg font-normal">Contact</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7 md:gap-4">
                    <h3 className="text-2xl font-medium">Official blog</h3>
                    <div className="flex flex-col gap-4 md:gap-2">
                        <p className="text-lg font-normal">Official blog</p>
                        <p className="text-lg font-normal">Engineering blog</p>
                    </div>
                </div>
            </div>
        </div>
    )
}