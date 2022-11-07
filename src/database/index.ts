import mongoose from "mongoose";

const MONGO_URI: string = `${process.env.MONGO_URI}`;

mongoose.connect(MONGO_URI).catch((error) => console.log(error));

export default mongoose;
