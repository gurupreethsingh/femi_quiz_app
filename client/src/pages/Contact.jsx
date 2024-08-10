import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Switch } from "@headlessui/react";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="isolate bg-white px-6 py-4 sm:py-8 lg:px-8 flex justify-center items-center min-h-screen">
      <div className="max-w-7xl w-full flex justify-center gap-6">
        <div className="flex-1">
          <div className="mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl text-start border-b">
              Contact
            </h2>
          </div>
          <form action="#" method="POST" className="mt-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <label className="text-sm leading-6 text-gray-600">
                  By selecting this, you agree to our{" "}
                  <a href="#" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </a>
                  .
                </label>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Let's talk
              </button>
            </div>
          </form>
        </div>

        {/* Google Maps Section */}
        <div className="flex-1">
          <div className="w-full h-50 rounded-md overflow-hidden border border-gray-300">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.085857622939!2d144.96315781586562!3d-37.81421744202192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce840!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1615919202314!5m2!1sen!2sus"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="w-full h-50%  gap-4 rounded-md overflow-hidden border">
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Company Address
              </h2>
              <p className="text-sm text-gray-700">
                McDonald Trivan International School, 1234 Elm Street
                <br />
                Melbourne, VIC 3000
                <br />
                Africa
              </p>

              <h3 className="text-md font-semibold text-gray-800 mt-6 mb-2">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://facebook.com"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
