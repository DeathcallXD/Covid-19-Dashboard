import mongoose from 'mongoose';
import User from '../models/User.js';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

export const newUserDetailsGoogle = async (req,res) => {
  const {token} = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const {name, email, picture} = ticket.getPayload();

  const userDetails = await User.isThisEmailInUse(email);

  if(userDetails){
    return res.status(200).json(userDetails);
  }
  else{
    const details = {name, email, img: picture};

    const newUser = new User(details);

    try{
      await newUser.save();

      res.status(201).json(newUser);
    } catch(error){
      res.status(409).json({message: error.message}).send({message: error.message});
    }
  }
}
