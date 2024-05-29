import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    Name: {
        type: String,
    },
    About: {
        type: String,
    },
    Location: {
        type: String
    },
    Connections: {
        type: String
    },
    followers: {
        type: String
    },
});

const userDetails = mongoose.model(
    "userDetails",
    Schema,
);

export { userDetails };