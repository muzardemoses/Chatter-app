import { Link } from "react-router-dom"

export const Drafts = () => {
    return (
        <div className="flex flex-col gap-4 items-center h-screen pt-16">
            <div className='flex justify-center flex-col items-center h-[400px] gap-5'>
                <h4 className='text-3xl font-semibold text-gray-900'>
                    No drafts yet
                    <span className='ml-2 text-2xl font-semibold text-gray-900'>
                        😢
                    </span>
                </h4>
                <p className='text-gray-500 text-center'>
                    Your unpublished posts will appear here as drafts
                    <br />
                    <span >
                        Create a new post {" "}
                        <Link to='/create-content' className='text-blue-500 hover:underline'>
                            here
                        </Link>.
                    </span>
                </p>
            </div>
        </div>
    )
}