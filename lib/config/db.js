import mongoose from 'mongoose';

export const ConnectDB=async()=>{
    await mongoose.connect('mongodb+srv://todoapp:todoapp@cluster0.wvjgz3g.mongodb.net/todo-app')
    console.log("DB Connected");    
}