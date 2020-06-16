# Flipcard Memory Game Project
This project is a simple game to test the users memory developed using HTML,CSS and Javascript. 

Here is a link to the live website: [FlipCard](https://jadeosull93.github.io/memory-game/index.html)
## UX
The website was designed with ease of use for game players at the fore-front of the design. 
-	As a game player, I want clear navigation so that I can quickly access what I need, i.e how to play or a different level.
-   As a game player, I want to be able to have control over any audio on the site.
-   As a game player, I want to be able to access how to play the game at any time.
-	As a game player, I want to see bright eye-catching visual images which add to my experience.
-	As a game player, I want to be able to see how I am doing in the game: how many moves i've made and how long it has taken me.
-   As a game player, I want to be able to easily refresh the game at any time.
-   As a game player, I want to be able to receive a hint if I am struggling with the game.

### Mock Ups
I designed the mock ups for the site using Figma. Mock ups for the website can be found in the following [folder]()
### How To Play
The challenge is to match cards into pairs in the least time possible with the least moves. To play, you simply click on a card to reveal the image behind. You can flip two cards at a time and you must memorize the images in order to try and flip a pair. Once two cards are matched, they will remain flipped. Once all cards have been successfully flipped a modal will appear displaying the total moves and time. There will be an option to repeat the level or try a different level.
## Features
Please find a list of features which are live on the web game below: 
### Existing Features
*	Restart Button  - allows users to restart/refresh the level they are on in one click.
*   Hint Button - a function players can use if they are stuck which flashes cards to reveal images for 600 milliseconds.
*   Level Button - a button which allows players change to the other level.
*   Audio Controls - control icons which allow users to turn on and off game music/noises.

## Technologies Used
The following languages, frameworks and libraries were used throughout the design of this web game to accomodate the design, structre and style:
*	[HTML](https://html.com/) – the project uses html as the main language to build the website
*	[Bootstrap](https://getbootstrap.com/) – The bootstrap frame work is used to style and layout the website
*	[CSS](http://www.css3.info/) – CSS is used to add individual style to the website
*	[Javascript](https://www.javascript.com/) - JS was used to create the game board and how it operates.
*	[Font Awesome](https://fontawesome.com/) – this site was used to add icons to the site.
*	[Canva](https://www.canva.com/) – to make images for the cards.

## Testing
In order to assure that the webiste performs efficiently and the features carry out the functions that they are created to, I conducted several tests which are outlined below.
*	I investigated the responsiveness of the website by utilizing the Google Chrome extension to establish that the site was receptive to all device sizes; mobiles, tablets and monitors. For certain sections such as the Our Coffee page, padding and margins were removed using media queries to allow the page to be viewed more effectively on smaller devices. Another tool I used to study the responsiveness of the site was [responsivetesttool.com](http://responsivetesttool.com/) - a website that has almost every device listed from mobile phones to tablets and laptops, it allows you to examine what your site looks like across the specific screen sizes of numerous brands and devices. I found this tool particularly useful. 

*	I tested all the navigation links repeatedly to guarantee that they worked from each individual page.

*	I loaded pages several times to verify that the images loaded perfectly every time, as well as establishing that images appeared zoomed if they were designed to do so. 

*	I confirmed that all buttons on the site performed the task that they were set out to, E.G; the find out more button on the homepage brings the user to the About Us page. 

*	For the Contact form, I tested it’s function by: 
    1. Go to the “Contact Us” page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears

Please find a summary of how the site was tested and the results in the table below: 
![Test Results](/TestTable/testtable.jpg)    
## Deployment
I used GitPod to develop my project, this is where I wrote my code and ran it to assure it performed. On completion of each section I committed the work to GitHub. From the Github platform, I deployed the project to a hosting platform.  The project is hosted on Github Pages; in order to make the project go live, I had to insure I had the correct settings employed in Github. There is a Github Pages section in the repository settings which needed to be activated. Once activated it advised me that my site was available at the following address: [https://jadeosull93.github.io/my-full-template/](https://jadeosull93.github.io/my-full-template/) - it is critical to note that the homepage needs to be identified as index.html for Gitpages to find it and publish the site. 
##### When deploying FlipCard to Github Pages the steps below need to be followed: 
1. Navigate to 'Jadeosull93/my-full-template' 
2. On the naviagtion bar at the top click 'settings'
3. Scroll to the GitHub Pages section
4. Select 'Master Branch' from the 'Source' dropdown menu
5. Click confirm my selection
6. Yellow Door Coffee should now be live on Github Pages

#### In order to run FlipCard locally the following steps need to be followed:
1. Navigate to 'Jadeosull93/memorygame'
2. Click the 'Clone or Download' button
3. Copy the url in the dropdown box
4. Using your IDE of choice open up your preferred terminal
5. Choose your desired file location
6. Copy and paste the following code into your terminal to clone Yellow Door Coffee

git clone https://github.com/Jadeosull93/memorygame.git

### Additional Deployment
In addition to Github and Gitpod, I chose to run my code locally on an internal IP address within my home using an Apache web server running on Ubuntu. I used Windows Visual Studios to write the code and FireZilla to deploy the site to the internal webserver. This was benefical for testing code on different devices throughout the house without having to “push” the code each time I made a change.

## Credits
### Content
The game and the JS used in the game was inspired by the following YouTube tutorial: 
### Media
The images on the cards were created by using [Canva](https://www.canva.com/).
### Acknowledgements
I would also like to give a special thanks to my father [John O' Sullivan](https://www.linkedin.com/in/john-o-sullivan-15b17a34/), who gave up his time to give me guidence, support and encouragement and helped my to understand Javascript in depth. I would also like to thank my mentor [Precious Ijege](https://github.com/precious-ijege/) who was always happy to give excellent feedback and guide me in the right direction throughout the duration of the project.
