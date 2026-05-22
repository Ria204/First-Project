//Server.ts is connecting with the server, database, also we are defining server related errors

import app from "./app"; //importing the app from app.ts file, which is the main file of our application, and it contains all the routes and middlewares that we have defined in our application. We are importing it here to start the server and listen on a specific port. We can also use it to connect to the database and perform other operations before starting the server.
import config from "./app/config";
import mongoose from "mongoose"; //importing database moongoose
import { Server } from "http"; //importing the Server from http module, which is used to create a server and listen on a specific port. We are using it to create a server and listen on a specific port, and we are also using it to handle the unhandledRejection and uncaughtException events, which are used to handle the errors that are not handled by the global error handler middleware in our application. We are using it to close the server and exit the process when an unhandledRejection or uncaughtException event occurs, which means that if there is an error that is not handled by the global error handler middleware, then the server will be closed and the process will be exited with a status code of 1, which indicates that there was an error in the application.

let server: Server; //declaring a variable server of type Server, which will be used to store the server instance that we will create later in the main function. We are declaring it here so that we can use it in the unhandledRejection and uncaughtException event handlers to close the server when an error occurs.

async function main() {
  try {
    await mongoose.connect(config.db_url as string); //connecting with mongoose
    server = app.listen(config.port, () => {
      //listening on port
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main(); //calling main function

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  process.exit(1);
});
