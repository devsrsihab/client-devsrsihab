import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  return (
    <section
      id="contactSection"
      className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionTitle
          title="Get in Touch"
          subtitle="Let's connect and discuss how we can work together"
        />
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-[#009688] focus:border-[#009688] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-[#009688] focus:border-[#009688] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-[#009688] focus:border-[#009688] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your message here..."
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#009688] hover:bg-[#00796b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009688] transition duration-150 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-[#009688] text-white p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-6 h-6 mt-1 mr-4" />
                    <p>123 Developer Street, Tech City, CA 90210</p>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="w-6 h-6 mr-4" />
                    <p>(123) 456-7890</p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="w-6 h-6 mr-4" />
                    <p>hello@yourportfolio.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {/* Add social media icons here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
