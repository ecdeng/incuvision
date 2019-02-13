# Node Server Installation Instructions

1. Install the LTS version of Node (from https://nodejs.org/en/download/)
2. Install the server's dependencies by running `npm install`
  - Also recommended: install nodemon with `npm install -g nodemon`, since the `npm start` script runs with nodemon.
3. Run the server with the command `npm start`
  - This script can be modified in `package.json`, but it currently runs `nodemon ./src/server.js`.

# MySQL Installation Instructions
### If you've already got a MySQL setup you like, all you need to do is modify the very top of DBManager.js. Otherwise, follow the instructions below!
1. Install [XAMPP](https://www.apachefriends.org/download.html).
2. Open XAMPP and make sure the MySQL Database is running.
3. Open your browser and navigate to `localhost/phpymyadmin`.
4. Create a new database by clicking the "New" button at the top of the column on the left.
5. Name the database "incuvision" if you don't wanna modify any files at all. Otherwise, name the database whatever you'd like, and go adjust the top of DBManager.js appropriately.
6. That's it! Sequelize should take care of the rest. If you want, you can manually drop tables or add/drop rows using phpmyadmin.

# Deployment Instructions

We use Heroku's git CLI for deployment, so all you need to deploy the webserver to **incuvision-webserver.herokuapp.com** is the following:
1. Navigate to the `webserver/` directory -- this is important!
2. `git add .`
3. `git commit -m <deployment commit message>`
4. `git push heroku master`
5. And you're done!