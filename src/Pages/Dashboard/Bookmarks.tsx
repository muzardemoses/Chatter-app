import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//import Markdown from "markdown-to-jsx";
import "react-markdown-editor-lite/lib/index.css";

export const Bookmarks = () => {
    const demo = `
    > hkkk block quote and a URL: https://reactjs.org.
    **Day-** ***June 30, 2023***
- Finalize Login page
- Created drafts, teams and explore page

***July 3, 2023***
- installed react-markdown-editor-lite and react-markdown
- Add markdown for rich text editor in create content page for blog post

table
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

task list
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

strike through
~~Mistaken text.~~


    `
    return (
        <div className="prose">
            <ReactMarkdown children={demo} remarkPlugins={[remarkGfm]} />


        </div>
    )
}