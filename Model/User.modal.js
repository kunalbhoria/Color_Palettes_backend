const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name:{type:String},
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save',async function(next){
    try{
   const password = await bcrypt.hash(this.password,10);
   this.password = password;
   next()
    }catch(e){
        next(e)
    }
});

UserSchema.methods.isValidPassword = async function(password){
    try {
        return  bcrypt.compare(password, this.password)
    } catch (error) { 
        throw error
    }
};

module.exports = mongoose.model('User', UserSchema);

