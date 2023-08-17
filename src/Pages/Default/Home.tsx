import { Helmet } from "react-helmet-async";
import { SecOne, SecTwo, SecThree, SecFour, SecFive } from "../../Components/Home"

export const Home = () => {
    return (
        <div className="pt-1.5 lg:pt-0">
            <Helmet>
                <title>Home | Chattar App</title>
                <meta name="description" content="Chatter is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm’s heaven and a blog to get access to more text based content." />
                <meta
                    name="keywords"
                    content="Chattar, Chatter, Chatter App, Chatter Chat, Chatter Chat App, Chatter Chat Application, Chatter Chat Web App, Chatter Chat Web Application, Chatter Chat Website, Chatter Chat Web Site, C, Moses's Chatter, Moses's Chatter App, Moses's Chatter Chat, Moses's Chatter Chat App, Moses's Chatter Chat Application, Moses's Chatter Chat Web App, Moses's Chatter Chat Web Application, Moses's Chatter Chat Website, Moses's Chatter Chat Web Site, AltSchool, AltSchool Chatter, AltSchool Chatter App, AltSchool Chatter Chat, AltSchool Chatter Chat App, AltSchool Chatter Chat Application, AltSchool Chatter Chat Web App, AltSchool Chatter Chat Web Application, AltSchool Chatter Chat Website, AltSchool Chatter Chat Web Site, AltSchool Chatter, AltSchool Chatter App, AltSchool Chatter Chat, AltSchool Chatter Chat App, AltSchool Chatter Chat Application, AltSchool Chatter Chat Web App, AltSchool Chatter Chat Web Application, AltSchool Chatter Chat Website, AltSchool Chatter Chat Web Site"
                />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Moses Adebayo" />
                <meta name="url" content="https://chatter.mosesadebayo.me/" />

            </Helmet>
            <SecOne />
            <SecTwo />
            <SecThree />
            <SecFour />
            <SecFive />
        </div>
    )
}