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
- Live Site URL: [Add live site URL here](https://chatter.mosesadebayo.me/)

### My process

**Day-1** **_June 6, 2023_**

- I started by creating the project by running the command npm create vite app-name --template react-ts

- I created a env file and added it to the gitignore file so that my api keys will not be exposed.

- I run npm install --save-dev @types/node in order to use process.env in my project.

- I then created a repository on github and pushed the project to github.

- I then installed the necessary dependencies for the project such as react-router-dom, firebase, redux, react-redux, @reduxjs/toolkit, react-toastify, tailwindcss, dot-env, and many more.
- I then created the necessary folders and files for the project such as the components folder, pages folder, and the redux folder.

- Lastly, I created the header component.

**Day-2** **_June 7, 2023_**

- I created and build the home page.

**Day-3** **_June 8, 2023_**

- I created the Footer component.
- I created the Login page and the Register page.

**Day-4** **_June 9, 2023_**

- Pending...
- Working on how the sign in and sign up page will work.

**Day-5** **_June 10, 2023_**

- Same as day-4
- Updated the login and register page user interface by adding google, twitter and github sign in buttons.

**Day-6** **_June 11, 2023_**

- Add the functionality to the login and register page.
- Set up the firebase config file.
- I had to change the way I got the config variables from the env file because it was not working. From process.env.API_KEY to import.meta.env.VITE_API_KEY

**Day-7** **_June 12, 2023_**

- Continue working on the login and register page.

**Day-8** **_June 13, 2023_**

- Implement initial dashboard design (Sidebar, Right Sticky Bar, and Dashboard Subheader).

**Day-9** **_June 14, 2023_**

- Implement initial messaging page design.

**Day-10** **_June 15, 2023_**

- Add the functionality to the messaging page.

**Day-11** **_June 16, 2023 - June 21, 2023_**

- Implement feed page and create-content page design.

**Day-12** **_June 22, 2023_**

- implement initial blog post design.
- Installed moment to format the date and time of the post.

**Day-13** **_June 23, 2023_**

- Implement minimum and maximum character count for blog post title and content.
- Implement picture and video size to fit the blog post.
- Implement initial blog post like and comment layout.

**Day-14** **_June 25, 2023_**

- Implement Content page design.
- Implement comment functionality.

**Day-** **_June 29, 2023_**

- Header profile drop-down
- Created \_redirects file in public

**Day-** **_June 30, 2023_**

- Finalize Login page
- Created drafts, teams and explore page

**_July 3, 2023_**

- installed react-markdown-editor-lite react-markdown and remark-gfm
- Add markdown for rich text editor in create content page for blog post

**_July 4, 2023_**

- Update bookmark page to display bookmarked posts

**_July 5, 2023_**

- Make landing page responsive

**_July 8, 2023_**

- Make Auth-Layout and it's pages responsive

**_July 9, 2023_**

- Make Dashboard-Layout and it's pages responsive
- Add toggle effect to left sidebar at screen size 639px and below

**_July 10, 2023_**

- Finalize the responsiveness of the dashboard layout and it's pages
- Implement the bookmark page design and functionality

**_July 11, 2023_**

- Add loading state to post and comment section
- Add loading state to bookmark page
- Add auto-save functionality to create content page(supposed to be draft     functionality but I will implement that later)
- Implement analytics functionality fo posts
- Add SEO to all pages

**_July 12, 2023_**
- Implement analytics design 

**_July 13, 2023_**
- Install react-ga and react-helmet-async
- Add google analytics to the project
- Add Meta tags to all pages

**_July 18, 2023_**
- Implement the profile page design (profile, edit-profile e.t.c)

**_July 19, 2023_**
- Implement action buttons in profile which are follow, unfollow and edit Profile.

**_July 20 - 21, 2023_**
- Finalize the handleFollow functionality
- Finalize action buttons in profile

**_July 31, 2023_**
- Finalize the profile page design

**_August 1, 2023_**
- Implement followings and followers page layout design.

**_August 2, 2023_**
- Implement followings and followers page functionality

**_August 3, 2023_**
- Implement initial edit profile page design

**_August 5 - 6, 2023_**
- Implement edit profile page functionality
- Finalize edit profile page design

  Cancel updates


### TO-DO AFTER PROJECT SUBMISSION

- Right sticky bar should be put in a button under screen size 1024px and will be used to open the right sticky bar.

### Built wth

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

``Somehow I need to take note of state that are mull initially e.g loggedInUser, I need to add ? to it even if I am not notified by typescript or eslint because it has code a lot of bugs and headache for me by showing in the console that `react-dom.development.js:12056 Uncaught TypeError: Cannot read properties of null (reading 'id')`.``

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
