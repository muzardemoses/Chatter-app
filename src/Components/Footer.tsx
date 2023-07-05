export const Footer = () => {
    return (
        <div className="pt-12 pb-40 pl-32 pr-44 flex justify-between 2xl:pl-20 2xl:pr-32 2xl:pb-20 xl:pl-14 xl:pr-20" style={{ backgroundColor: "#FFEDCC80" }}>
            <div>
                <h2 className="mt-3 uppercase font-bold text-5xl text-blue-700">Chatter</h2>
            </div>
            <div className="flex gap-52 2xl:gap-36 xl:gap-20">
                <div className="flex flex-col gap-7">
                    <h3 className="text-2xl font-medium">Explore</h3>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-normal">community</p>
                        <p className="text-lg font-normal">Trending blogs</p>
                        <p className="text-lg font-normal">Chatter for teams</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7">
                    <h3 className="text-2xl font-medium">Support</h3>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-normal">Support docs</p>
                        <p className="text-lg font-normal">Join slack</p>
                        <p className="text-lg font-normal">Contact</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7">
                    <h3 className="text-2xl font-medium">Official blog</h3>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-normal">Official blog</p>
                        <p className="text-lg font-normal">Engineering blog</p>
                    </div>
                </div>
            </div>
        </div>
    )
}