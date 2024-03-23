import mongoose from "mongoose";

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongodb connection established");
        })

        connection.on('error', (err) => {
            console.log('Mongodb connection error: ' + err);
            process.exit(1);
        })
        
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}