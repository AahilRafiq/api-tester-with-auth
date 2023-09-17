import mongoose, { Schema } from "mongoose";
import "dotenv/config";
import md5 from "md5";

const uri = process.env.MONGODB_URI;
mongoose.connect(uri , {dbName : 'apiTesterUsers'})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

/*
-----TO Add a user----
usersDB.addUser("example@mail.com", "123");

----- TO find a User----
await usersDB.findUser("example@mail.com", "123");

*/

const usersDB = {
    addUser : async function(username,password){
        const newUser = new User({ username: username, password: md5(password) });
        if(await User.findOne({username:username})){
            return null;
        }
        else{
            await newUser.save()
            return newUser;
        }
    },
    findUser : async function(username){
        const user = await User.findOne({username : username})
        return user;
    }
}

export {
    usersDB
}