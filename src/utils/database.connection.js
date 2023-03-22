import mongoose from "mongoose";
import config from "../configs";




let database;

const connect = async()=>{
    const MONGODB_URL=config.DB_CONNECTION_STRING;

    if(database) return;

    mongoose.connect(MONGODB_URL)
        .then((connection)=>{
            database=connection;
            console.log("🔌=> Database Synced");
        })
        .catch((err)=>{
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        })

    
}

export {connect};