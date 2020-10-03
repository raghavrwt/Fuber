Steps to run the project: 

1. Download the project or clone it.
2. Run npm install.
3. Run npm start.
4. Run nodemon src/server.js

There is a very basic frontend that shows all the cabs available at http://localhost:3000

The port for the express server is 4000.

Also, the dummy data is in data.json file

AllCabs: http://localhost:4000 - GET
BookCab: http://localhost:4000/bookCab?latitude=${latitude}&longitude=${longitude}&color=${color} - GET
CompleteRide: http://localhost:4000/completeRide - POST