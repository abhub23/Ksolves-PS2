// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://abdullahmukri25:4YAkPDHVVr7gPWfn@cluster0.exbkzsz.mongodb.net/Ksolves', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Event = mongoose.model('Event', eventSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const User = mongoose.model('User', userSchema);

// Activity Schema
const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  timestamp: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
});

// Create an event
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// RSVP to an event
app.post('/api/events/:id/rsvp', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      const newUser = new User({ name: req.body.name, email: req.body.email });
      await newUser.save();
      event.attendees.push(newUser._id);
      newUser.events.push(event._id);
      await newUser.save();
    } else {
      if (!event.attendees.includes(user._id)) {
        event.attendees.push(user._id);
        user.events.push(event._id);
        await user.save();
      }
    }
    
    await event.save();
    
    // Track user activity
    const activity = new Activity({
      user: user._id,
      action: `RSVP'd to event: ${event.title}`,
    });
    await activity.save();
    
    res.json({ message: 'RSVP successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send reminder
app.post('/api/events/:id/remind', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees');
    
    for (const attendee of event.attendees) {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: attendee.email,
        subject: `Reminder: ${event.title}`,
        text: `Don't forget about the event "${event.title}" on ${event.date}!`,
      };
      
      await transporter.sendMail(mailOptions);
    }
    
    res.json({ message: 'Reminders sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user activity
app.get('/api/users/:id/activity', async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.id }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});