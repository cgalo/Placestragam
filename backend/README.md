# Placestragram Backend
Welcome to the backend of Placestragram! The backend utilizes [NodeJS](https://nodejs.org/en/) for the server, and [npm](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/) as package handler.
This project also requires a Google Map's API in order to show reactive maps. Please make sure to go over the [*Getting Started*](#Getting-Started) documentation in order to run this project.

## Table of Contents
1. [Getting Started](#Getting-Started)
2. [References](#References)

## Getting Started
To start you'll need to make sure to have Node and npm installed in your computer, as well as a Google Cloud account to get an API key for Google Maps.

### Install Node & npm
Node comes with npm, so this means you will only need to install Node in your computer to obtain both. You can download Node in their official website, [here](https://nodejs.org/en/).
To check if node and npm are installed in your computer run the following command in your terminal window.
``` 
node --version && npm --version 
```
### Install packages
Now that you have npm we need to install the dependency, or packages, that are needed for this nodeJS project, this can be easily done by just running the following command:
```
npm install
```
This might take a couple of minutes, but let it finish in order to install everything.
### Google Map API
To get your personal API key, which be saved inside __.env__ file inside our backend directory, in order to safetely store our API key, you'll need to follow these [instructions](https://bit.ly/3q86b5w). Make sure to get the [**Maps Javascript API**](https://developers.google.com/maps/documentation/javascript/overview).
### Environment Variables
Now that you have your Google Maps API, Node, and all the required packages we need to setup our environmental variables. For this I created a basic file in this directory called ```.sample.env```

Start by renaming the ```.sample.env ``` to only ```.env```, after that we need to edit the actual information inside the file. You will see some of the information inside the file has already been setup by me, personal variables such as API keys, are for you to fill with your information. 

Please make sure that you insert your Google Maps API key in the field **GOOGLE_MAPS_API_KEY** in order to run this project successfully.

You can read more about environmental variables [here](https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/).
I also utilized the npm packaged, called [*dotenv*](https://www.npmjs.com/package/dotenv), to handle these variables.

## References
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Google Maps Documentation](https://developers.google.com/maps/documentation)
- [Environmental Variables](https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/)