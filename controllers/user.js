import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './util/tryCatch.js';


//import helper try/catch function to avoid repeating

export const register = tryCatch (async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(password)
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: 'Password must be 6 characters or more',
      });
    //check if user already exists
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    // console.log(existedUser)
    if (existedUser) {
        // console.log(true)
        return res.status(400).json({ success: false, message: 'User already exists!' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
        name,
        email: emailLowerCase,
        password: hashedPassword,
    });
    const { _id: id, photoURL, role, active } = user;
    const token = jwt.sign({ id, name, photoURL, role}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(201).json({
        success: true,
        result: { id, name, email: user.email, photoURL, token, role, active},
    });
  
});


export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  //if user doesnt exist
  if (!existedUser) {
    return res.status(404).json({ success: false, message: 'User does not exist!' });
  }
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  //if pw doesnt match
  if (!correctPassword) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
  //if match create token
  const { _id: id, name , photoURL, role, active} = existedUser;
  if (!active) {
    return res.status(400).json({ success: false, message: 'User is not active, Talk to your administrator' });
  }
  const token = jwt.sign({ id, name, photoURL, role}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, token, role, active}
  });
});

export const fetchUsers = tryCatch(async (req, res) => {
  const users = await User.find({}).sort({ _id: -1 });
  // console.log("users",users)
  res.status(200).json({
    success: true,
    result: users
  });
});

export const updateStatus = tryCatch(async (req, res) => {
  const {role, active} = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,{role, active});
  res.status(200).json({ success: true, result: {_id: req.params.userId} });
});

export const updateProfile = tryCatch(async (req, res) => {
    //mongoose update
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
    });
    console.log("updatedUser",updatedUser)
    const { _id: id, name, photoURL, role } = updatedUser;
    //create new token
    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({ success: true, result: { name, photoURL, token } });
});