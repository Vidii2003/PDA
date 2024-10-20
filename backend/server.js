import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from './models/user.js'; // Ensure this path is correct
import Admin from './models/admin.js';
import Event from './models/event.js';
const app = express();

app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect("mongodb+srv://rsrividya2003:QX6d1rzC6ezURjYA@cluster0.3qod3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Registration Route
app.post('/register', async (req, res) => {
    console.log(req.body); // Debugging to check if the body is received
    const { name, regno, department, email, password, confirmPassword } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password before saving
       //const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            name,
            email,
            password,
            regno,
            department
        });

        res.status(201).json({ message: "Registration successful", newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No record exists" });
        }
        // Compare the password with the hashed one in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "The password is incorrect" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
app.post('/AdminRegister', async (req, res) => {
    // Destructure the request body to match the field order specified
    const { name, email, password, regno, department, roleType } = req.body; 

    // Optional: Add basic validation
    // if (!name || !email || !password || !regno || !department || !roleType) {
    //     return res.status(400).json({ message: 'All fields are required.' });
    // }

    const newAdmin = new Admin({
        name,
        email,
        password,
        regno,       // Matches the input order from the frontend
        department,
        roleType,
    });

    try {
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully!' });
    } catch (error) {
        console.error("Error saving admin:", error); // Log the error for debugging
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});
app.post('/EventRegister', async (req, res) => {
        // Destructure the request body to match the fields specified in the Event schema
        const { 
            teamName, 
            teamLeaderName, 
            regNo, 
            year, 
            department, 
            phoneNumber, 
            email, 
            participant2, 
            participant3, 
            participant4 // Ensure each participant is destructured
        } = req.body; 
    
        // Optional: Basic validation
        if (!teamName || !teamLeaderName || !regNo || !year || !department || !phoneNumber || !email || !participant2 || !participant3) {
            return res.status(400).json({ message: 'All fields are required, and at least participant2 and participant3 must be provided.' });
        }
    
        // Create a new event instance with participants
        const newEvent = new Event({
            teamName,
            teamLeaderName,
            regNo,
            year,
            department,
            phoneNumber,
            email,
            participant2, // Participant 2 object
            participant3, // Participant 3 object
            participant4 // Participant 4 object, can be optional
        });
    
        try {
            await newEvent.save(); // Save the event to the database
            res.status(201).json({ message: 'Event registered successfully!', event: newEvent });
        } catch (error) {
            console.error("Error saving event:", error); // Log the error for debugging
            res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    });
    
app.post('/AdminLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "No admin record exists" });
        }
        
        // Compare the password with the hashed one in the database
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (isPasswordValid) {
            return res.json({ message: "Admin login successful" });
        } else {
            return res.status(401).json({ message: "The password is incorrect" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
app.get('/AdminEventDisplay', async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events from the database
      res.status(200).json(events); // Send the events as a response
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Internal Server Error' }); // Handle error response
    }
  });
  // Get admin details
app.get('/adminDetails', async (req, res) => {
    const admin = await Admin.findOne(); // Adjust to find the specific admin
    res.json(admin);
});

// Update admin details
app.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).send("Error updating admin details");
  }
});

// Get registered users
app.get('/RegisteredUsersDisplay', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.get("/eventRegistrations", async (req, res) => {
    try {
      const eventUsers = await Event.find(); // Assuming there's only one event and you want all registrations
      res.json(eventUsers);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
