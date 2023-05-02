const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Set up middleware
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://dzsportsteam:teamofproject2023@cluster0.kkxcapz.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

//model
const userSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password : String,
    phone:Number,
    birthday:String,
    wilaya:String,
    daira:String,
    baladia:String,
    favsport:String,
    gender:String,
  });

  const User = mongoose.model('User', userSchema);



// Define the registration route
app.post('/register', async (req, res) => {
  try {
    // Create a new user object with the data from the request body
    const user = new User(req.body);
    // Save the user to the database
    await user.save();
    // Return a success message
    res.send({ message: 'User registered successfully'});
  } catch (err) {
    // Handle any errors that occur during registration
    res.status(500).send({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));