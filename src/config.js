import dotenv from "fotenv";

dotenv.config();

export default{
    port:process.env.PORT || 3000,
    mongoDbUrl: process.env.mongoDbUrl,
};