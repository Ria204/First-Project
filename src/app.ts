//Main file, we are hitting the app.ts file when server is running
//in this file, routes are being define and all the middlewares are called

import express from "express"; //express js is a framework of nodejs use to built api and routes
import cors from "cors"; //cors for browsing security
import router from "./app/routes"; //we are importing the router that we created in the routes folder, and we are using it in our main app file to define the routes for our application. The router will contain all the routes that we have defined in the routes folder, and we can use it to organize our routes and keep our code clean. We can also use it to define middleware for specific routes, and we can use it to handle errors for specific routes.
import cookieParser from "cookie-parser"; //cookie-parser used to parse cookies sent by the client
import notFoundHandler from "./app/middlewares/notFoundHandeler"; //for not found route handling, 
import globalErrorHandler from "./app/middlewares/globalErrorHandeler";

const app = express();

// Enabling cookie parsing
app.use(cookieParser()); //cookie-parser is a middleware

// Middleware for parsing JSON bodies
app.use(express.json({ limit: "10mb" })); //parse the json data into object because in mongo we have to deal with the onjects. express.json is a middleware. Limit 10 mb means we are limiting the data to 10mb.
app.use(express.urlencoded({ extended: true, limit: "10mb" })); //using urlencoded middleware to read the data from forms

// app.use(express.static("./uploads"));
app.use(cors({  //using cors for cross-origin request and browser security
    origin: [],  //we can specify the allowed origins here, blank means no origin is allowed, for allowing all origins we can use origin: "*"
    credentials: true, //allowing jwt token, authentication, headers, cookies to access
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], //methods that are allowed for cross-origin requests
    allowedHeaders: ["Content-Type", "Authorization"], //headers that are allowed in cross-origin requests, here we are allowing content-type and authorization headers    content type json and multi part form data
  }),
); 

// Root route
app.get("/", (req, res) => {
  res.send("Welcome! Api is up and running.");
});

// Application routes
app.use("/api/v1", router); //we are using the router that we created in the routes folder, and we are prefixing all the routes with /api/v1, which means that all the routes defined in the router will be accessible with the prefix /api/v1, for example, if we have a route defined as /users in the router, then it will be accessible as /api/v1/users

// Catch-all route for handling 404 errors
app.use(notFoundHandler); //we are using the notFoundHandler middleware to handle the 404 errors, which means that if a route is not found in our application, then the notFoundHandler middleware will be called, and it will return a 404 error with the message 'Route Not Found'. This is a catch-all route that will handle all the requests that do not match any of the defined routes in our application. It is important to place this middleware after all the defined routes, so that it can catch all the requests that do not match any of the defined routes.

// Global error handling middleware
app.use(globalErrorHandler);

export default app; //we are exporting the app so that we can use it in our server.ts file to start the server and listen on a specific port. We can also use it to connect to the database and perform other operations before starting the server.
