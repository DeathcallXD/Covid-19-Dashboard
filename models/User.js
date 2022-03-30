import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    password:{
      type: String
    },
    img: {
      type: String
    }
});

userSchema.statics.isThisEmailInUse = async function (email) {
  if(!email) throw new error('Invalid Email!!');
  try{
    const user = await this.findOne({email});

    if(user) return user;
    return false;
  }
  catch(error){
    console.log('\n'+error+'\n');
    return true;
  }
}

const User = mongoose.model('User', userSchema);

export default User;
