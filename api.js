const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

const app = express();

// Set up middleware
app.use(bodyParser.json());

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));


mongoose.connect('mongodb+srv://dzsportsteam:teamofproject2023@cluster0.kkxcapz.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

//model
const userSchema = new mongoose.Schema({
    fullName :{ 
       type:String,
      },
    email : { 
      type:String,
     },
    password : { 
      type:String,
     },
    phone:{ 
      type:String,
     },
    birthday:{ 
      type:String,
     },
    wilaya:{ 
      type:String,
     },
    daira:{ 
      type:String,
     },
    baladia:{ 
      type:String,
     },
    favsport:{ 
      type:String,
     },
    gender:{ 
      type:String,
     },
  });

  const User = mongoose.model('User', userSchema);



// Registration

app.post('/register', async (req, res) => {
  try {
    // Create a new user object with the data from the request body
    const user = new User(req.body);
    console.log(req.body);
    // Save the user to the database
    await user.save();
    // Return a success message
    res.send({ message: 'User registered successfully'});
  } catch (err) {
    // Handle any errors that occur during registration
    res.status(500).send({ error: err.message });
  }
});



//login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the specified email address
  const user = await User.findOne({ email });

  // If no user is found, return an error message
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // If the password is incorrect, return an error message
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // If the email and password are valid, generate a JWT token and return it in the response
  const token = jwt.sign({ email: user.email }, JWT_SECRET);
  res.json({ token });
});


