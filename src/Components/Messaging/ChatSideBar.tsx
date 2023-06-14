import newSVG from "../../assets/Svg/Messaging/new-indicator.svg"

export const ChatSideBar = () => {
    return (
        <div className="border-r bg-white border-gray-200 w-80 flex flex-col h-full">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h5 className="text-lg font-semibold text-gray-900">Messages</h5>
                <button
                    className="h-10 w-10 shadow-sm border border-gray-300 rounded-lg transition duration-500 ease-in-out hover:bg-gray-50"
                >
                    <img
                        src={newSVG}
                        alt="edit"
                        className="h-7 w-7 mx-auto"
                    />
                </button>
            </div>
        </div>
    )
}