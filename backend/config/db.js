import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
	try {
		const uri = "mongodb+srv://rsrividya2003:QX6d1rzC6ezURjYA@cluster0.3qod3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
		const conn = await mongoose.connect(uri); //process.env.MONGO_URI
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};
export default connectDB;