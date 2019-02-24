# BeAM Web Applications
Home of the BeAM API and BeAM Web Applications

Live Laser Cutter Queue

3D Printer Form (Coming Soon)

# Getting Started
Steps below to walk you through necessary downloads, installations, and setup

## Introduction
his project is divided into two parts: 
1. the [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/download-center/community), and [Express](https://expressjs.com/) backend 
2. the [Angular](https://angular.io/) front-end

The app is hosted on [Heroku](https://heroku.com)

## Downloads

### Git
First make sure you have a github account, if not register for one. Git is our repository for all things related to this project and helps us keep track of updates, issues, and who is contributing to the project. You will need to install git on your computer [Here](https://git-scm.com/downloads)

### Node.js and NPM
Node.js is our javascript runtime, and it will be allowing us to compile and run our code and the dependencies
NPM (Node Package Manager) is exactly that, it handles our project packages (dependencies) and keeps them neatly organized for us

First thing you are going to need to do is install Node.js, you can find the install package [Here](https://nodejs.org/en/). Once that is installed completely it open your command prompt (Windows) or terminal (Mac OSX) and run
```
node -v
```
and
```
npm -v
```
doing so for both just to double check that both npm and node were installed and correctly set as environment variables on your system.
Lastly, just to make development easier use npm to install nodemon globally ```npm install -g nodemon``` Nodemon makes development easier for us because it refreshes your local Node server everytime you save a change, otherwise you will need to refresh it yourself manually.

### MongoDB
MongoDB is a NoSQL database system that stores entries in documents and those documents are stored in collections, we primarly use MongoDB because it will return our requests as JSON which makes it much easier to parse with Node.js and Angular.

To install MongoDB follow the link [Here](https://www.mongodb.com/download-center/community) and after it is done running you should be able to go back to your terminal and run ```mongod``` to start a database server locally. The data is persisted even when you close the server down so don't worry about running it and terminating it often.

### Angular
Angular is the frontend framework used for this project and unlike the Node.js backend, Angular is programmed in Typescript. Typescript compiles down to javascript and is overall very similar to it, but it helps us write neater code by keeping variables statically typed. To download Angular, go to your terminal and run
```
npm install -g @angular/cli
```
That will install the Angular client for you and will also create a new path variable. To check if it is properly installed run
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
