const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        email : {
            type:String,
            required:true,
            unique:true
        },
        password : {
            type:String,
            required:true
        },
        isAdmin : {
            type:Boolean,
            required:true,
            default:false
        },
        pic:{
            type:String,
            required:true,
            default:"https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
        },
        
    },
    {
        timestamps:true,

    }
);

userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User' , userSchema);

module.exports = User;
