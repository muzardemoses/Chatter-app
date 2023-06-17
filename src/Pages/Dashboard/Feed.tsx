

export const Feed = () => {
    //to={{ pathname: "/messages", state: { fromFeed: true } }}


    return (
        <div className="py-6 px-28 flex flex-col gap-12">
            <div className="flex justify-between items-center">
                <h4 className="text-3xl text-black font-medium">
                    Feed
                </h4>
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg">
                    <p className="text-base">
                        Create Content
                    </p>
                </button>
            </div>
            <div></div>
        </div>
    )
}