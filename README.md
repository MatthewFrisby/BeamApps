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
After installing Node.js, MongoDB, and Angular, open the terminal window and clone this repository by running
```git clone https://github.com/MatthewFrisby/BeamApps.git```

Change directories by running
```cd beamapps```

Now you are in the project folder!

 few more installations are necessary before you can launch the development servers. In the beamapps folder in your terminal, run ```npm i```. This will install all the required dependencies for the Node.js server. Next, change directories again by navigating to the front-end folder and calling ```cd frontend```. Rerun ```npm i``` to install the front-end dependencies. Now you are ready to launch the development servers!

To launch the servers, open three separate terminal windows. For two of the windows, I recommend using your file explorer to navigate to the front-end and back-end portions of the project. Right-click in each folder and select "Git Bash Here" to open the Git Bash window in that directory. The third terminal window can be opened anywhere.

Follow these commands IN ORDER:

1. In your third terminal window (the miscellaneous window), run the command ```mongod``` and wait until it reads "waiting for connection on port..."
2. Then, move to the terminal for the back-end and run ```nodemon server```. This will start your Node.js server.
3. The last step is to go to the front-end terminal and run ```ng serve``` to start your Angular development server.

Once complete, open your browser and go to [http://localhost:4200](http://localhost:4200) to see the Laser Cutter Queue.

### Additional Notes
1. Your browser may try to open [http://localhost:3000](http://localhost:3000) with what looks like http://localhost:4200 but what you are actually seeing on http://localhost:3000 is the completely built application. Any changes made will not appear there. To update the built application, go to the front-end folder in the terminal and run ```ng build --prod``` to update.

2. Because you have just created a new database when loading, you will not have an admin account registered. To do so, navigate to [http://localhost:3000](http://localhost:3000)  and open your developer tools. In the console of the dev tools, paste and run this command with your own chosen username and password:
```
fetch('http://localhost:3000/api/lasercutter', {
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
3. You may run into issues concerning local cookies. This is fine, as that works completely when served. Most browsers refuse to save cookies coming from local sources for security reasons. If you are unable to get access while developing, follow the steps above (#2) but use this command instead:
```
fetch('http://localhost:3000/api/lasercutter', {
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

## Editing
Suggested editor for working on this or any other web project is Atom. You can log in to Git through Atom and make all Git commands in the window, but feel free to use your editor of choice.

## Resources and Documentation
[Git](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)

[Node.js](https://nodejs.org/en/docs/)

[NPM](https://docs.npmjs.com/)

[Express](https://expressjs.com/en/guide/routing.html)

[MongoDB](https://mongoosejs.com/docs/guide.html)

[Angular](https://angular.io/docs)
