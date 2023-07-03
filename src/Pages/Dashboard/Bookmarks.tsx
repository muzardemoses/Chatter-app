import ReactMarkdown from "react-markdown";

export const Bookmarks = () => {
    const demo = "**Hello world!!!**"
    return (
        <div className="">
            <ReactMarkdown>{demo}</ReactMarkdown>
        </div>
    )
}