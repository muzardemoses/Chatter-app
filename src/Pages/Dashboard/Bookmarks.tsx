// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
//import Markdown from "markdown-to-jsx";
import "react-markdown-editor-lite/lib/index.css";

export const Bookmarks = () => {
 
    return (
        <div className="prose">
            {/* <ReactMarkdown children={demo} remarkPlugins={[remarkGfm]} /> */}

            <div className="flex flex-col gap-4 items-center h-screen pt-16">
                <div className="flex flex-col gap-2">
                    <h4 className="text-gray-900 text-2xl font-semibold">
                        Bookmarks
                    </h4>
                    <p className="text-gray-900 text-base font-medium">
                        Not implemented yet
                    </p>
                </div>
            </div>
        </div>
    )
}