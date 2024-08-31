import React from 'react';

export default function ContactComponent() {
  return (
    <section id="contact" className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-left text-gray-600 mb-2" htmlFor="name">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-gray-600 mb-2" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-gray-600 mb-2" htmlFor="message">Message</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="message"
            rows="4"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
