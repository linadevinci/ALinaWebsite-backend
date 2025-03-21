import config from "./config";
import mongoose from "mongoose";

export function connect(){
    return mongoose.connect(config.mongoDbUrl,{
    });
}