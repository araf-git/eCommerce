import User from "../model/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        message: "Already Signed Up Using this email! Please Login",
      });
    }

    if (email && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ email, password: hashedPassword });
      const doc = await newUser.save();
      
      return res.status(201).json({
        message: "Registration Successful.",
      });
    } else {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unable to Register",
    });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await User.findOne({ email });
      console.log("user", user);
      if (!user) {
        return res.status(400).json({ message: "User not registered" });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      return res.status(200).json({ id: user.id, role: user.role });
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unable to Login",
    });
  }
};
