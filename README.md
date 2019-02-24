# BeAM Web Applications
Home of the BeAM API and BeAM Web Applications

Live Laser Cutter Queue

3D Printer Form (Coming Soon)

# Getting Started
Steps below to walk you through necessary downloads, installations, and setup

## Introduction
This project is divided into two parts: 
1. the [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/download-center/community), and [Express](https://expressjs.com/) back-end 
2. the [Angular](https://angular.io/) front-end

The app is hosted on [Heroku](https://heroku.com) and can be viewed [Here](http://beam-lasercutter.herokuapp.com)

## Downloads

### Git
First, register for a GitHub account if you haven't already. Git is a repository service that helps keep track of updates, issues, and project contributors. Install Git on your computer [Here](https://git-scm.com/downloads)

### Node.js and NPM
Node.js is a javascript runtime, which allows us to compile and run both the code and the dependencies. NPM (Node Package Manager) organizes our project packages (dependencies).

Install Node.js through the installation package [Here](https://nodejs.org/en/). Once installed, open the command prompt (Windows) or terminal (Mac OSX) to run
```
node -v
```
and
```
npm -v
```
to confirm that both NPM and Node.js were correctly installed and set as environmental variables on your system.

Then, use NPM to install Nodemon globally ```npm install -g nodemon```. Nodemon eases the development process by automatically refreshing your local Node server every time a change is saved.

### MongoDB
MongoDB is a NoSQL database system that stores entries as documents that are then organized in collections. MongoDB returns requests as JSON, making it easier to parse with Node.js and Angular.

To install MongoDB, follow the link [Here](https://www.mongodb.com/download-center/community). Once the installation is complete, return to your terminal and run ```mongod``` to start a database server locally. The data persists when the server is closed - don't worry about running and terminating the server often.

### Angular
Angular is the front-end framework used for this project. Unlike the Node.js back-end, Angular is programmed in TypeScript, which compiles down to JavaScript. TypeScript helps write neater code by keeping variables statically typed. To download Angular, go to your terminal and run
```
npm install -g @angular/cli
```
This will install the Angular client and create a new path variable. To confirm proper installation, run
```ng v```

## Getting The Project
After you have everything installed you can open your terminal window and clone this repository by running
```git clone https://github.com/MatthewFrisby/BeamApps.git```
navigate into the folder that git just created by calling
```cd beamapps```

Now you are in the project folder!

Before you can run anything though you need to do just a few more installations, in the beamapps folder in your terminal run
```npm i``` this will install all the required dependencies for the Node.js server
after that is done navigate to the frontend folder by calling
```cd frontend``` and rerun ```npm i``` to install the frontend dependencies

Now you are ready to launch the development servers! To do so you will need to open 3 seperate terminal windows, for two of them, i recommend using your file explorer to navigate to the frontend and backend portions of the project and right click in each folder and run "Git Bash Here" to open the Git bash window in that directory. For the third terminal window you can open it anywhere.
Here are the commands to run IN ORDER:

1. In your miscellaneous terminal window, the last one instructed to open, run the command ```mongod``` and wait until it says "waiting for connection on port..."
2. After you see that move to the terminal for the backend and run ```nodemon server``` this will start your Node.js server
3. Lastly go to the front end terminal and run ```ng serve``` and this will start your Angular development server.

Once all of those look like they are done you can open your browser and go to [http://localhost:4200](http://localhost:4200) to see the Laser Cutter Queue

### Some Things To Note
1. Your browser may try to open [http://localhost:3000](http://localhost:3000) with what looks exactly like what is on http://localhost:4200 but what you are seeing on http://localhost:3000 is the completely built application. If you make any changes they will not appear there because they are not happening there. To update the built application you can go to the frontend folder in the terminal and run ```ng build --prod``` to update.

2. Because you have just created a new database when loading, you will not have an admin account registered, to do so navigate to [http://localhost:3000](http://localhost:3000) and open your developer tools. In the console of the dev tools paste and run this command with your own username and password:
```
fetch('http://localhost:3000/lasercutter', {
  method: 'POST',
  body: JSON.stringify({
    username: 'admin',
    password: 'password',
    passwordConf: `password`
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
.then(res => res.json())
.then(console.log)
```
3. Lastly you may run into issues dealing with cookies locally, that is fine, that works completely when served. Most browsers refuse to save cookies coming from local sources due to security issues so if ever you are not getting access while developing, follow the steps of #2 but use this command instead
```
fetch('http://localhost:3000/lasercutter', {
  method: 'POST',
  body: JSON.stringify({
    logusername: 'admin',
    logpassword: 'password',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
.then(res => res.json())
.then(console.log)
```

## Editting
Suggested editor for working on this, and all, web projects is [Atom](https://atom.io/) since you can login to git through it and make all git commands in the window, but feel free to use whatever.

## Resources and Documentation
[Git](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)
[Node.js](https://nodejs.org/en/docs/)
[NPM](https://docs.npmjs.com/)
[Express](https://expressjs.com/en/guide/routing.html)
[MongoDB](https://mongoosejs.com/docs/guide.html)
[Angular](https://angular.io/docs)
