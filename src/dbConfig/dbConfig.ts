import mongoose from "mongoose";

const connectDb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection

     connection.on("connected",()=>{
        console.log("mongo db connected successfully")
    })

    connection.on('err',(err)=>{
      console.log("Error while connecting to mongo",err)
      process.exit(1)
    })
  } catch (error) {
    console.log(error,"something went wrong while connecing with mongoDB")
  }

}

export default connectDb;

