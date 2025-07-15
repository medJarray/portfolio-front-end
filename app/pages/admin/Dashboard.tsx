import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'experiences', title: 'Expériences', icon: '💼' },
    { id: 'education', title: 'Formation', icon: '🎓' },
    { id: 'skills', title: 'Compétences', icon: '⚡' },
    { id: 'contact', title: 'Messages', icon: '✉️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <Link
                  to={`/admin/${section.id}`}
                  className="block p-6"
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-3xl">{section.icon}</div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vue d'ensemble
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900">
                    Expériences
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900">
                    Formations
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-900">
                    Messages non lus
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-purple-600">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 