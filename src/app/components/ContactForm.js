'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.send(
      'service_b7m9wna',
      'template_fyse2st',
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      'BjhMpfPLdGjsM4ExU'
    )
    .then(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setStatus('Error sending message. Please try again.');
    });
  };

  return (
    <div className="flex justify-center items-center py-8 px-4 ">
      <div className="w-full max-w-md bg-white shadow-md p-6 dark:bg-darkCard">
        <h2 className="text-2xl font-semibold text-center mb-2">Contact</h2>
        <p className="text-center text-sm mb-6">
          Have a question or want to work together? Leave your details and I'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 bg-gray-200 dark:bg-darkest text-sm focus:outline-none focus:ring-2 focus:ring-skyCustom"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 bg-gray-200 text-sm dark:bg-darkest focus:outline-none focus:ring-2 focus:ring-skyCustom"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="4"
            required
            className="w-full p-2 bg-gray-200 text-sm dark:bg-darkest focus:outline-none focus:ring-2 focus:ring-skyCustom"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-skyCustom text-sm font-semibold hover:text-darkSky transition relative after:block after:h-[1px] after:w-full after:bg-skyCustom after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:origin-left"
            >
              SUBMIT
            </button>
          </div>
        </form>

        {status && (
          <p className="text-center text-sm mt-4 text-gray-600">{status}</p>
        )}
      </div>
    </div>
  );
}
