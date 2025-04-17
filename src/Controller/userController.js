import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Database/Schema/User.Schema.js"; 

// Controller function to handle user sign up (create user)
export const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    const newUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to handle user login (generate JWT token)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    // Generate JWT token (expires in 1 hour)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: "Login successful",
      token, // Send the token to the client
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateUserDetails = async (req, res) => {
  const userId = req.user.id; // Extracted from token
  const { fullName, email, password } = req.body;

  try {
    // Find the user
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user
    await user.save();

    res.json({
      message: "User updated successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete user
export const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne(); // Delete the user

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
