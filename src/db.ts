import dotenv from "dotenv";
dotenv.config();

export const dbConnection = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: process.env.MONGODBID,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
