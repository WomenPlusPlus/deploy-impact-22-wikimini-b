# Wikimini - by The Wiki Factory
This repository is the base for our vision of what Wikimini, the encyclopedia for kids, could be like in the future. Follow the instructions below it to install and run it on your local machine. Documentation can be found in the docs folder, our source code can be found in scr/node-backend and src/angular-frontend, and the designs are behind the links included below.

# Git Workflow

- The main branch contains production-ready, to-be-deployed code, the development branch contains all the latest developed features and will be used for testing, to then be merged into main.

- Features will be developed in dedicated branches named as follows:

    "i" + number of the relative issue + "-description-of-feature"

    For example, if I want to work on issue https://github.com/WomenPlusPlus/deploy-impact-22-wikimini-b/issues/14 and need to create a branch, I will create branch "i14-initialize-backend-structure" (GitHub can create a branch with that name from an issue automatically)

- All newly created feature branches should originate from main or development, and at the end of implementing the feature, a pull request for the development branch is to be created and reviewed, and then merged into the development branch.

- It is important to periodically rebase development into one's feature branch (for example, right before beginning to work at the start of the day) to make sure to have the latest features and avoid conflicts.

- Feature branches should never be merged into each other.

- Barring exceptional cases, no commits shall be made to development or main, only merges.

# Local testing using XAMPP

## Install and run MediaWiki

- The instructions to install MediaWiki on XAMPP are [here](https://www.mediawiki.org/wiki/Manual:Installing_MediaWiki_on_XAMPP)
- Install XAMPP on your PC: download the installer for your operating system [here](https://www.apachefriends.org/index.html)
- Follow the instructions on the MediaWiki manual for the following steps:
    - Getting Apache and MySQL running
    - Creating your database
    - Editing PHP.ini
       - you should also look for "intl" in the php.ini file and uncomment the intl extension line (remove the ;), and then restart the server
    - Setting up MediaWiki
- after finishing the setup, add the code from the file docs/Additions to LocalSettings.php to your LocalSettings.php file and restart the XAMPP services
    
## Run Wikimini (to be completed)

- Install an IDE; e.g. [VSCode](https://code.visualstudio.com/)
- Install node.js and npm
- Clone the repository on your PC (instructions on how to do are e.g. [here](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-ssh-urls)), e.g. using the inbuilt vscode GIT functionalities

## Installing Node.js & npm
- go to: https://nodejs.org/en/download/ and click on your operating system option
- follow installation wizard
  * no need to install "tools for native modules" once you get to that screen in wizard
- once done, open your terminal and write "node -v" and "npm -v", you should see on your screen the versions

## Installing MariaDB
- https://www.mariadbtutorial.com/getting-started/install-mariadb/
- keep configurations as is (in HeidiSQL)

## Running The App
- clone repo on your machine
- open bash terminal and `cd src/angular-frontend && npm i && cd ../node-backend && npm i` to install node modules
- to start frontend, run `npm start` in angular-frontend directory
- to start backendend, run `npm start` in node-backend directory
