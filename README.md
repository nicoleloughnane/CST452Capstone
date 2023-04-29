# Daily Faith Journal - CST452 Senior Capstone
MEVN Technology Stack: MongoDB, Express, Vue, and Node

![dailyfaithjournallogowhitetext](https://user-images.githubusercontent.com/91271439/235325086-9f8bf976-2c55-422f-94f1-d6e675826519.png)


## Abstract
  This project, Daily Faith Journal, will be developed for the web but will be also be accessible on mobile via a web browser. Marketed toward the Christian audience, the user of the app will be able to journal and take sermon notes when they attend church. The problem many currently face is taking the time out of the day to reflect and make note of what they are feeling and experiencing. It is important for Christians to take a moment of reflection to read God’s word and pray. This application would help solve that problem by providing the user one app to handle the day-to-day reflections they want to keep note of. 
This application can be accessed online via a web browser either through a computer or mobile phone. The user will make an account, login, and write a journal entry for the day. It will have the date along with an option for the user to enter a title, current mood, and message. In a separate portion of the app, he or she could also take notes of a sermon being given which would include the date, name of the pastor, title, and notes. These entries will be saved to the user’s account, so they do not need to worry about their notes being lost. The user can search for old entries, or delete them if they so choose. The overall goal of the Daily Faith Journal is to help Christians grow closer to Christ and establish healthy habits by having a place to express their feelings. 

## Design Introduction
At a high level the team is designing a website to serve as a journaling application. The problem the team intends to solve is not having one convenient location to journal or take notes during church services. The team aims for the application and UI to be simple enough for the technologically inexperienced (those who are used to pen and paper format), but engaging enough for those who use technology on a regular basis. The Daily Faith Journal would help address this problem by allowing users to complete all of these tasks within one location. 
In this section, the team will illustrate how the database will be designed, layout the UI of the application, documentation of the API, explain the component design at a high level, display the sitemap of the application, and have both logical and physical diagrams of how the application will be structured. Operational support will also be described in order to help resolve any issues that may arise if the site goes down. 

## Detailed High Level Solution Design

### Logical Diagram
![LOGICALDIAGRAM-V5 horizontal](https://user-images.githubusercontent.com/91271439/232165602-ee9aa965-ed1a-4e21-b132-08e43467fc85.png)

The user will access the application via the web browser. They will send their login information which will be authenticated using JWT authentication to secure the login. This is express-JWT specifically and grants the user a token which is valid for a defined period of time. This token lets them access the protected parts of the application (everything except for login and register). Vuex is a state management system designed by Vue which enables the team to globally keep track of whether the user is logged in or not. This enables the application to be properly protected. 
App.vue will utilize a router that contains the paths to the different components. These components will handle operations involving creating, reading, updating, and deleting journal and sermon note entries. These processes will be carried out by the backend API and are called by the frontend through the use of axios. The frontend verifies that the user entered data is valid and then passes it along to the backend, which will carry out the get, put, post, and delete operations - pulling or storing data from MongoDB. 


### Physical Diagram
![physicaldiagram-v4](https://user-images.githubusercontent.com/91271439/232165644-62b21e19-684a-4350-8ac0-c2f927056e30.png)

Heroku is being used to help the team build, ship, and deploy the application. The code is uploaded on GitHub and the repository will be selected when setting up the environment. This will allow for the frontend and backend to be continuously deployed. MongoDB is hosted on AWS N.Virginia us-east-1.The free tier is M10 with 2GB of RAM and 10GB of storage. In order to check if the site is ever down or not operational, UptimeRobot will be utilized. This will ensure the team will be the first to know if the website is ever down. 

## Detailed Technical Design

### General Technical Approach
The team is planning for this site to be built with the MEVN technology stack. It will be accessible through the most common web browsers such as Chrome, Edge, Firefox, and Opera. The plan is to have users be able to log in or register. They will be able to journal and create sermon notes through the site. Their account and data associated with it will be stored in a non-relational database: MongoDB. Vue will provide the interface in which users can interact with the application and will communicate with the backend (Express and Node) through the use of axios. Standard CRUD operations will apply when it comes to users, journal entries, and sermon note entries. Users will be authenticated through their email and password to ensure they have authorized access to the application. It will be secured using JWT and Vue Router guards. Any data they enter will be saved to their account.

### Key Technical Design Decisions
MongoDB, Express.js, Vue.js, and Node.js are being used as the primary technology stack. MongoDB is being used because of the non-relational structure and will be ideal for this application as it is less strict than a relational one. The team wants to have users be able to add data (such as a pastor’s name) into their sermon notes as an option but not mandatory. Express and Node are being used for the API to render HTTP objects. It is being utilized for the backend, middleware, and application routes. Lastly, Vue.js is being used as the JavaScript framework to help manage HTML, CSS, and JavaScript. The user will create and use the forms and components to log in, register, create, view, edit, and remove their journal and sermon note entries. Vue was chosen because of the single file component structure and a chance to learn something new. The team is styling the site pages with Tailwind CSS along with plain CSS. 

### Component Design
![componentdiagram drawio](https://user-images.githubusercontent.com/91271439/232178929-58464b2f-5870-47b1-b057-cc362f6c3d68.png)

This first diagram outlines the components being used on the JournalEntryHome Component. The NavBar will be standard for all pages of the application. The layout will be similar to the SermonNotesHome Component as well in that you can view all, see details of one, or create a new one. Search entries will be on both the JournalEntryHome Component and SermonNotesHome Component to help the user find what they are looking for. Journal entries are pulled from the backend on this page, and displayed conditionally in a grid of journal card components. The pencil and trash can icons are buttons that allow the user to edit or delete the entry. The create entry button takes the user to the create entry page. Lastly, clicking on the card itself lets the user view the entry by itself. 

### Database Diagram
![schemav2](https://user-images.githubusercontent.com/91271439/235325152-ca50f606-5440-4329-b23e-44e021e68a94.png)

There are 3 collections in MongoDB: User, Journal, and SermonNote. The journal entries and sermon notes are associated with the user by their ID. 

### Nonfunctional Requirement
Usability is the nonfunctional requirement defined for this application. Usability is defined by the ability of a system to allow its users to interact and accomplish tasks efficiently, safely, and effectively. To measure and test this the team will be following the 10 Usability Heuristics for User Interface Design. The user will be informed of the system status, natural language will be used, exits or go-backs will be given as an option in case a user makes a mistake, consistent standards will be laid out, clear error messages will be displayed as well as how to recover from those errors, recognition rather than recall will be followed, shortcuts can be implemented for experienced users (but hidden from novice ones), a minimalist design will be followed, error messages will be displayed in a clear manner rather than using codes that the user may not understand, and lastly, a help center is available if a user needs assistance accomplishing their tasks. The team plans to implement these principles into test cases to determine if this NFR has been accomplished.

![helpcenter](https://user-images.githubusercontent.com/91271439/235325213-7c92f8b2-6dbd-4677-9199-aeb6c3b58cd3.png)


