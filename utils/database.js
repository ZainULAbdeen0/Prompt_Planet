import mongoose from 'mongoose';

let isConnected = false;

const connectToDB = async ()=>{
    mongoose.set("strictQuery" ,true)
    if(isConnected){
        console.log("DB connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGO_DB_URI,{
            dbName: "PromptPlanet",
        })
        isConnected = true;
    }catch(error){
        console.log("Database connection error: ",error);
    }
}


export {connectToDB};
