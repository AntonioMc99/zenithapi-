The Zenith API is a backend I built with Node.js, Express, and Mongoose to manage an ecommerce product catalog. It handles all the basics like creating, reading, updating, and deleting products, and also makes it easy to filter by 
category, price, or tags, sort results, and use pagination when the data gets large. It connects to MongoDB Atlas using environment variables to keep things secure, and I kept the project organized with separate folders for configuration, 
models, and routes. Honestly, the backend came together much more smoothly than the frontend, and I actually enjoyed working on this part a lot more.



Reflection
I built the Zenith API with the goal of keeping it clean and easy to follow Once I got the database connection working everything else felt smoother dotenv handled the MONGO_URI and the server would not even start unless Mongoose connected
 I could clearly see when something went wrong Setting up the Product schema was simple and I liked how the validations kept bad data out right from the start The advanced GET endpoint was the part I had the most fun with since I had to figure 
 out how to build queries that could handle categories price ranges tags sorting and pagination all at once It was cool to see the requests in Postman actually filter and sort the data the way I wanted Overall the backend felt easier than the 
 frontend debugging was simpler the logic was more predictable and I enjoyed working on it more It was satisfying to watch the database update in real time and know everything was working




Resources
https://nodejs.org/en/docs
https://expressjs.com/
https://mongoosejs.com/docs/guide.html
https://www.mongodb.com/docs/atlas/
https://github.com/motdotla/dotenv
https://www.postman.com/
https://curl.se/docs/manpage.html
