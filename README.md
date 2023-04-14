# Daily Faith Journal - CST452 Senior Capstone
MEVN Technology Stack: MongoDB, Express, Vue, and Node

## Abstract
  This project, Daily Faith Journal, will be developed for the web but will be also be accessible on mobile via a web browser. Marketed toward the Christian audience, the user of the app will be able to journal and take sermon notes when they attend church. The problem many currently face is taking the time out of the day to reflect and make note of what they are feeling and experiencing. It is important for Christians to take a moment of reflection to read God’s word and pray. This application would help solve that problem by providing the user one app to handle the day-to-day reflections they want to keep note of. 
This application can be accessed online via a web browser either through a computer or mobile phone. The user will make an account, login, and write a journal entry for the day. It will have the date along with an option for the user to enter a title, current mood, and message. In a separate portion of the app, he or she could also take notes of a sermon being given which would include the date, name of the pastor, title, and notes. These entries will be saved to the user’s account, so they do not need to worry about their notes being lost. The user can search for old entries, or delete them if they so choose. The overall goal of the Daily Faith Journal is to help Christians grow closer to Christ and establish healthy habits by having a place to express their feelings. 

## Design Introduction
At a high level the team is designing a website to serve as a journaling application. The problem the team intends to solve is not having one convenient location to journal, reference scripture, or take notes during church services. The team aims for the application and UI to be simple enough for the technologically inexperienced (those who are used to pen and paper format), but engaging enough for those who use technology on a regular basis. The Daily Faith Journal would help address this problem by allowing users to complete all of these tasks within one location. 
In this section, the team will illustrate how the database will be designed, layout the UI of the application, documentation of the API, explain the component design at a high level, display the sitemap of the application, and have both logical and physical diagrams of how the application will be structured. Operational support will also be described in order to help resolve any issues that may arise if the site goes down. 

## Detailed High Level Solution Design

### Logical Diagram
![LOGICALDIAGRAM-V5 horizontal](https://user-images.githubusercontent.com/91271439/232165602-ee9aa965-ed1a-4e21-b132-08e43467fc85.png)

TODO

### Physical Diagram
![physicaldiagram-v4](https://user-images.githubusercontent.com/91271439/232165644-62b21e19-684a-4350-8ac0-c2f927056e30.png)

Heroku is being used to help the team build, ship, and deploy the application. The code is uploaded on GitHub and the repository will be selected when setting up the environment. This will allow for the frontend and backend to be continuously deployed. MongoDB is hosted on AWS N.Virginia us-east-1.The free tier is M10 with 2GB of RAM and 10GB of storage. In order to check if the site is ever down or not operational, UptimeRobot will be utilized. This will ensure the team will be the first to know if the website is ever down. 

## Detailed Technical Design

### General Technical Approach
The team is planning for this site to be built with the MEVN technology stack. It will be accessible through the most common web browsers such as Chrome, Edge, Firefox, and Opera. The plan is to have users be able to log in or register. They will be able to journal and create sermon notes through the site. Their account and data associated with it will be stored in a non-relational database: MongoDB. Vue will provide the interface in which users can interact with the application and will communicate with the backend (Express and Node) through the use of axios. Standard CRUD operations will apply when it comes to users, journal entries, and sermon note entries. Users will be authenticated through their email and password to ensure they have authorized access to the application. It will be secured using JWT and vue router guards. Any data they enter will be saved to their account.

### Key Technical Design Decisions
MongoDB, Express.js, Vue.js, and Node.js are being used as the primary technology stack. MongoDB is being used because the team is more comfortable working with a non-relational database and will be ideal for the application as it is less strict than a relational one. The team wants to have users be able to add data (such as a pastor’s name) into their sermon notes as an option but not mandatory. This will be easier to display using MongoDB. Express and Node are being used for the APIs to render HTTP objects. It is being utilized for my middleware and application routes. Lastly, Vue.js is being used as a JavaScript framework to help manage HTML, CSS, and JavaScript. The user will create and use the forms and components to log in, register, create, view, edit, and remove their journal and sermon note entries. Single file components have been easier for the team to manage and work with. The team is styling the site pages with Tailwind CSS along with plain CSS.

### Component Design
TODO

### Database Diagram
TODO

### Nonfunctional Requirement
Usability is the nonfunctional requirement defined for this application. Usability is defined by the ability of a system to allow its users to interact and accomplish tasks efficiently, safely, and effectively. To measure and test this the team will be following the 10 Usability Heuristics for User Interface Design. The user will be informed of the system status, natural language will be used, exits or go-backs will be given as an option in case a user makes a mistake, consistent standards will be laid out, clear error messages will be displayed as well as how to recover from those errors, recognition rather than recall will be followed, shortcuts can be implemented for experienced users (but hidden from novice ones), a minimalist design will be followed, error messages will be displayed in a clear manner rather than using codes that the user may not understand, and lastly, help and documentation will be available if a user needs assistance accomplishing their tasks. The team plans to implement these principles into test cases to determine if this NFR has been accomplished.

