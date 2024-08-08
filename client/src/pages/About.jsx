import React from 'react';
import { FaTwitter, FaLinkedin, FaList, FaThLarge, FaRegCreditCard } from 'react-icons/fa';

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialHandles: {
      twitter: '@lesliealexander',
      linkedin: '/in/lesliealexander',
    },
  },
  {
    name: 'Michael Foster',
    role: 'CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1502767089025-6572583495b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialHandles: {
      twitter: '@michaelfoster',
      linkedin: '/in/michaelfoster',
    },
  },
  {
    name: 'Lindsay Walton',
    role: 'Chief Marketing Officer',
    imageUrl:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialHandles: {
      twitter: '@lindsaywalton',
      linkedin: '/in/lindsaywalton',
    },
  },
  // More people can be added here...
];

export default function About() {
  const [view, setView] = React.useState('grid');

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 xl:grid xl:grid-cols-3 xl:gap-x-8">
        <div className="max-w-2xl xl:col-span-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>

        <div className="xl:col-span-2">
          <div className="flex justify-end">
            <button
              className={`mr-4 ${view === 'list' ? 'text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setView('list')}
            >
              <FaList />
            </button>
            <button
              className={`mr-4 ${view === 'grid' ? 'text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setView('grid')}
            >
              <FaThLarge />
            </button>
            <button
              className={`${view === 'card' ? 'text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setView('card')}
            >
              <FaRegCreditCard />
            </button>
          </div>

          <ul
            role="list"
            className={`mt-12 grid gap-8 ${
              view === 'list' ? 'grid-cols-1' : view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {people.map((person) => (
              <li
                key={person.name}
                className={`flex ${view === 'list' ? 'flex-row items-center' : 'flex-col items-center text-center'}`}
              >
                <img
                  alt={person.name}
                  src={person.imageUrl}
                  className={`${
                    view === 'list' ? 'h-20 w-20' : 'h-32 w-32'
                  } rounded-lg object-cover ${view === 'list' ? 'mr-4' : ''}`}
                />
                <div className={view === 'list' ? 'text-left' : 'mt-4 text-center'}>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  <div className={`mt-2 flex ${view === 'list' ? 'justify-start' : 'justify-center'} space-x-4`}>
                    <a
                      href={`https://twitter.com/${person.socialHandles.twitter}`}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={`https://linkedin.com${person.socialHandles.linkedin}`}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
