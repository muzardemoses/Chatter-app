# Chatter-app


## Table of contents

- [Overview](#overview)
- [The challenge](#the-challenge)
- [Screenshot](#screenshot)
- [Links](#links)
- [My process](#my-process)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview  

Chatter is a multi-functional platform that empowers authors and readers to create and access text-based content. With features like user registration, content creation with Markdown support, personalized content discovery, social interactions, and detailed analytics, Chatter aims to provide a compelling alternative to traditional blogging platforms. Built with React, TypeScript, Firebase, and Tailwind CSS, Chatter combines modern web technologies to offer a seamless and engaging experience for content creators and readers alike.

 

### The challenge

In the age of visual content, Chatter aims to provide a haven for text-based content enthusiasts. Our goal is to create a multi-functional platform that competes with established blogging platforms. We strive to offer a seamless user experience with features like user registration, content creation with Markdown support, personalized content discovery, social interactions, and detailed analytics. By leveraging React, TypeScript, Firebase, and Tailwind CSS, we aim to deliver a modern and engaging platform for authors and readers alike.


### Screenshot

Not yet available
![](./screenshot.JPG)

### Links

- Solution URL: [Add solution URL here](https://github.com/muzardemoses/Chatter-app)
- Live Site URL: [Add live site URL here]()

### My process

**Day-1** ***June 6, 2023***
 - I started by creating the project by running the command npm create vite app-name --template react-ts

 - I created a env file and added it to the gitignore file so that my api keys will not be exposed.

 - I run npm install --save-dev @types/node in order to use process.env in my project.

 - I then created a repository on github and pushed the project to github.

 - I then installed the necessary dependencies for the project such as react-router-dom, firebase, redux, react-redux, @reduxjs/toolkit, react-toastify, tailwindcss, dot-env, and many more.
   
 - I then created the necessary folders and files for the project such as the components folder, pages folder, and the redux folder.

 - Lastly, I created the header component.

**Day-2** ***June 7, 2023***
 - I created and build the home page.

**Day-3** ***June 8, 2023***
- I created the Footer component.
- I created the Login page and the Register page.

**Day-4** ***June 9, 2023***
- Pending...
- Working on how the sign in and sign up page will work.

**Day-5** ***June 10, 2023***
- Same as day-4
- Updated the login and register page user interface by adding google, twitter and github sign in buttons.

**Day-6** ***June 11, 2023***
- Add the functionality to the login and register page.
- Set up the firebase config file.
- I had to change the way I got the config variables from the env file because it was not working. From process.env.API_KEY to import.meta.env.VITE_API_KEY

**Day-7** ***June 12, 2023***
- Continue working on the login and register page.

**Day-8** ***June 13, 2023***
- Implement initial dashboard design (Sidebar, Right Sticky Bar, and Dashboard Subheader).

**Day-9** ***June 14, 2023***
- Implement initial messaging page design.

**Day-10** ***June 15, 2023***
- Add the functionality to the messaging page.

**Day-11** ***June 16, 2023 - June 21, 2023***
- Implement feed page and create-content page design.

**Day-12** ***June 22, 2023***
- implement initial blog post design.
- Installed moment to format the date and time of the post.

**Day-13** ***June 23, 2023***
- Implement minimum and maximum character count for blog post title and content.
- Implement picture and video size to fit the blog post.
- Implement initial blog post like and comment layout.

**Day-14** ***June 25, 2023***
- Implement Content page design.
- Implement comment functionality.

**Day-** ***June 29, 2023***
- Header profile drop-down
- Created _redirects file in public

**Day-** ***June 30, 2023***
- Finalize Login page
- Created drafts, teams and explore page

***July 3, 2023***
- installed react-markdown-editor-lite react-markdown and remark-gfm
- Add markdown for rich text editor in create content page for blog post

***July 4, 2023***
- Update bookmark page to display bookmarked posts

***July 5, 2023***
- Make landing page responsive

***July 8, 2023***
- Make Auth-Layout and it's pages responsive



### Built with

- Firebase
- React Typescript
- Redux
- Tailwindcss
- React-router-dom
- React-toastify
- Dot-env
- Moment
- React-markdown-editor-lite
- React-markdown
- Remark-gfm
- Headlessui



### What I learned

<!-- ```html
<h1>Some HTML code I'm proud of 🎉</h1>
```

```css
.proud-of-this-css {
	color: papayawhip;
}
```

```js
const [isMenuOpen, setIsMenuOpen] = useState(false);

const handleClick = () => {
	const navLinks = document.querySelector(".nav-links");
	navLinks.classList.toggle("open");
	const linkItems = document.querySelectorAll(".link-item");

	linkItems.forEach((item) =>
		item.addEventListener("click", () => navLinks.classList.remove("open"))
	);

	setIsMenuOpen((prev) => !prev);
};
``` -->

### Continued development

I will continue to work on this project to make it better and add more features to it.



## Author

- GitHub - [@MuzardeMoses](https://github.com/muzardeMoses)
- Frontend Mentor - [@muzardemoses](https://www.frontendmentor.io/profile/muzardemoses)
- Twitter - [@Muzarde1](https://www.twitter.com/Muzarde1)
- LinkedIn - [Moses Adebayo](https://www.linkedin.com/in/muzardemoses/)
- Instagram - [@muzardemoses](https://www.instagram.com/ademuzardemoses/)
- Facebook - [Adebayo MuzardeMoses Olaoluwa ](https://facebook.com/ademuzardemoses)
- YouTube - [MuzardeMoses](https://www.youtube.com/channel/@muzardemoses)
- Website - [MuzardeMoses](https://mosesadebayo.me/)


## Acknowledgments

I would like to thank God for the grace to be able to complete this project.