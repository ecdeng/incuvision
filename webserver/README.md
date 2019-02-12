# Node Server Installation Instructions

1. Install the LTS version of Node (from https://nodejs.org/en/download/)
2. Install the server's dependencies by running `npm install`
  - Also recommended: install nodemon with `npm install -g nodemon`, since the `npm start` script runs with nodemon.
3. Run the server with the command `npm start`
  - This script can be modified in `package.json`, but it currently runs `nodemon ./src/server.js`.

# Deployment Instructions

We use Heroku's git CLI for deployment, so all you need to deploy the webserver to **incuvision-webserver.herokuapp.com** is the following:
1. Navigate to the `webserver/` directory -- this is important!
2. `git add .`
3. `git commit -m <deployment commit message>`
4. `git push heroku master`
5. And you're done!