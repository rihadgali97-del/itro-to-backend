import { User } from "../models/user.model.js"; // Added the second dot

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!!!" });
        }

        // Check if user already exists
        // Fixed: toLowerCase() with a capital 'C'
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: "The email already exists!" });
        }

        // Create user
        const user = await User.create({
            username,
            email: email.toLowerCase(), // Fixed: toLowerCase()
            password,
            loggedIn: false,
        });

        // Good practice: Send a success response so the request doesn't hang!
        return res.status(201).json({
            message: "User registered successfully",
            user: { username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    // Implement login logic here
    try {
    // check if user exists
const { email, password } = req.body;
const user = await User.findOne({email: email.toLowerCase()});
// if user not found
if(!user) return res.status(400).json({
    message: "user not found!"
});
// check password
const isMatch = await user.comparePassword(password);
if(!isMatch) return res.status(400).json({
    message: "invalid credentials!"
});
// if credentials are valid, update loggedIn status
res.status(200).json({
    message: "Login successful",
    user: { username: user.username, email: user.email }
});
 } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

}}

const LogoutUser = async (req, res) => {
    try {
        const {email} = req.body;
        const user =await User.findOne({email: email.toLowerCase()});
        if(!user) return res.status(400).json({
            message: "user not found!"
        });
        user.loggedIn = false;
        await user.save();
        res.status(200).json({
            message: "Logout successful",
            user: { username: user.username, email: user.email }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
}

export { registerUser, loginUser, LogoutUser };