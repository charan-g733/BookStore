import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import { mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();
app.get("/", (req, res) => {
    res.send("WELCOME TO BOOK STORE");
    return res.status(200).send({ message: "Welcome to Book Store" });
});
//CORS Middleware
app.use(cors());
//Middleware for parsing request body
app.use(express.json());
  
app.use("/books", bookRoutes);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
     })
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        
})
    .catch((error) => {
        console.log("Error connecting to MongoDB: ", error.message);
    });