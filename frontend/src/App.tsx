// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

// Event component
const Event = ({ event, onDelete, onRSVP }) => {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <button onClick={() => onRSVP(event._id)}>RSVP</button>
      <button onClick={() => onDelete(event._id)}>Delete</button>
    </div>
  );
};

// EventForm component
const EventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, date });
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

// Notification component
const Notification = ({ message }) => {
  return <div className="notification">{message}</div>;
};

// Main App component
const App = () => {
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async (eventData) => {
    try {
      await axios.post('http://localhost:5000/api/events', eventData);
      fetchEvents();
      setNotification('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      setNotification('Failed to create event.');
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      fetchEvents();
      setNotification('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      setNotification('Failed to delete event.');
    }
  };

  const rsvpToEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`);
      setNotification('RSVP successful!');
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      setNotification('Failed to RSVP.');
    }
  };

  const sendReminder = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/remind`);
      setNotification('Reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      setNotification('Failed to send reminder.');
    }
  };

  return (
    <div>
      <h1>Event Management App</h1>
      <EventForm onSubmit={createEvent} />
      {notification && <Notification message={notification} />}
      <h2>Events</h2>
      {events.map((event) => (
        <Event
          key={event._id}
          event={event}
          onDelete={deleteEvent}
          onRSVP={rsvpToEvent}
        />
      ))}
      <button onClick={() => sendReminder(events[0]?._id)}>
        Send Reminder for Latest Event
      </button>
    </div>
  );
};

export default App;