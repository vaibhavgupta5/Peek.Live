'use client'
import React, { useState } from 'react';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    image: '',
    date: '',
    time: '',
    venue: '',
    questions: [],
    send_email: false,
    email_template: '',
    faq: [],
    timeline: [],
    sponsers: [],
    prizes: [],
    problem_statements: [],
    team_size: 0,
    teams: [],
    event_admin: '',
    event_username: '',
    autoVerify: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="event_name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input type="text" name="event_name" id="event_name" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>
        {/* Add more fields similarly */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input type="text" name="image" id="image" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Event
        </button>

      </form>
    </div>
  );
};

export default CreateEventForm;