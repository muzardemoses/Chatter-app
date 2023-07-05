export const Footer = () => {
    return (
        <div className="pt-12 pb-40 pl-32 pr-44 flex justify-between 2xl:pl-20 2xl:pr-32 2xl:pb-20 xl:pl-14 xl:pr-20 lg:pl-10 lg:pr-12 md:pt-10 md:pb-12 md:flex-col md:gap-6 sm:pr-4 sm:pl-6 sm:pb-9 sm:pt-8" style={{ backgroundColor: "#FFEDCC80" }}>
            <div>
                <h2 className="mt-3 uppercase font-bold text-5xl text-blue-700 lg:text-[40px] md:text-3xl md:mt-0">Chatter</h2>
            </div>
            <div className="flex gap-52 2xl:gap-36 xl:gap-20 lg:gap-9 md:gap-4 md:justify-between sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-6">
                <div className="flex flex-col gap-7 md:gap-4">
                    <h3 className="text-2xl font-medium sm:text-xl">Explore</h3>
                    <div className="flex flex-col gap-4 md:gap-2">
                        <p className="text-lg font-normal sm:text-base">community</p>
                        <p className="text-lg font-normal sm:text-base">Trending blogs</p>
                        <p className="text-lg font-normal sm:text-base">Chatter for teams</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7 md:gap-4">
                    <h3 className="text-2xl font-medium sm:text-xl">Support</h3>
                    <div className="flex flex-col gap-4 md:gap-2">
                        <p className="text-lg font-normal sm:text-base">Support docs</p>
                        <p className="text-lg font-normal sm:text-base">Join slack</p>
                        <p className="text-lg font-normal sm:text-base">Contact</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7 md:gap-4">
                    <h3 className="text-2xl font-medium sm:text-xl">Official blog</h3>
                    <div className="flex flex-col gap-4 md:gap-2">
                        <p className="text-lg font-normal sm:text-base">Official blog</p>
                        <p className="text-lg font-normal sm:text-base">Engineering blog</p>
                    </div>
                </div>
            </div>
        </div>
    )
}