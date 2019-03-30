
# Movuefy

> A simple application developed to browse movies and see what's new around. 🎃



**Technologies used**


- [NodeJS (v.11.9.4)](https://nodejs.org/en/)
- [Vue.JS (v.2.4.1)](http://https://vuejs.org/) 😻

**Dependencies**


- [SASS (v.4.11.0)](https://sass-lang.com/) 
- [Vuetify](https://https://vuetifyjs.com/)
- [Lodash](https://lodash.com/)
- Vuex
- Jest
- Webpack
- Vue Router
- Firebase

## Installation

### Clone 

- Clone this repo to your local machine using `$ git clone https://github.com/amendx/movuefy/`

### Setup


> install all dependencies first

```shell
$ npm install
```
or 

```shell
$ yarn add
```

### Adding Variables to your Environment

Don't forget to set up the variables! It allows us to have personalized configurations, but it also makes it easy to deploy our projects without having to store sensitive values in our codebase. If any doubt, read [this](https://github.com/dwyl/learn-environment-variables/blob/master/README.md) article.

A config file is placed under (`~/config/dev.env.js`) or (`~/config/prod.env.js`)  and there can be placed the values of the variables. You can find the variables names and description on the file `.env.example`:  


```json
{
    VUE_APP_FIREBASE_API_KEY= < firebase project api key > 
    VUE_APP_FIREBASE_AUTH_DOMAIN= < firebase project api auth domain >
    VUE_APP_FIREBASE_DB_URL= < firebase project api database url >
    VUE_APP_FIREBASE_PROJECT_ID= < firebase api project id > 
    VUE_APP_FIREBASE_STORAGE_BUCKET= < firebase api storage bucket >

    VUE_APP_MOVIEDB_API_KEY= < chave de api moviedb >
    VUE_APP_MOVIEDB_IMAGE_URL=< url de imagens >
}
```


> after that, feel free to run
```shell
$ npm start
```
> or if you want

```shell
$ yarn start
```



### Issues you might face

-  🍌 Lookout for those banana peels on the floor. If you've installed everything correctly and get an error like:

```shell
$ vue or jest is not recognized as an internal or external command
```
- **Don't worry**

> Just run this command: 
 - For Yarn
 
```shell
$ alias jest="~/AppData/Local/yarn/bin/jest"
``` 
or 

```shell
$ alias vue="~/AppData/Local/yarn/bin/vue"
```

  - This means you'll locally create an instance of vue cli or jest to run its internal commands 🚀


### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/amendx/movuefy`

### Step 2
- **What's new**
    - 🐢 Check out the latest upcoming movies around the world 
    
    
- **How to do's**
    - 😚 Sign in to Movuefy! You wont regret. If you already have an account, just look around. 
    
    - **Let's rock**
    - 🐙 See the complete movie list on the tab "View Movies". You're also able to see your favorite movies list on the tab "Favorite Movies". Isn't that awesome? 
    
    
    - **Movuefy workflow**
    - 👻 To have a full experience of the projetct, feel free to run all the projects' script. Basically, you can `register`, `login`, `see movies` and `favorite movie`. All registration and logins are persisted using `Firebase api`. Search around, favorite around, it's all yours. 


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
   
    
