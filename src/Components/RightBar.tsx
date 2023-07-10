export const RightBar = () => {
    return (
        <div className="py-8 px-6 w-80 flex flex-col gap-16 xl:px-4 xl:w-72 lg:hidden">
            <div className="px-3 py-5 bg-gray-100 rounded-lg flex flex-col gap-5">
                <h4 className="text-gray-900 text-2xl font-semibold">
                    Trending
                </h4>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-900 text-base font-medium">
                        No trending posts yet
                    </p>
                </div>
            </div>

            <div className="px-3 py-5 bg-gray-100 rounded-lg flex flex-col gap-5">
                <h4 className="text-gray-900 text-2xl font-semibold">
                    Popular hashtags
                </h4>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-900 text-base font-medium">
                        No popular hashtags yet
                    </p>
                </div>
            </div>
        </div>
    )
}