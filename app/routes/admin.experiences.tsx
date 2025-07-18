import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'app/styles/datepicker.css';
import { motion } from 'framer-motion';
import type { CreateExperience, Experience, UpdateExperience } from '../types/index';
import {  api } from '../services/index';

export function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Partial<CreateExperience & { id: string }>>({});

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await api.getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleAddExperience = () => {
    setCurrentExperience({});
    setIsModalOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    const { id, createdAt, updatedAt, ...editableFields } = experience;
    setCurrentExperience({ id, ...editableFields });
    setIsModalOpen(true);
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.deleteExperience(id);
        setExperiences(experiences.filter(exp => exp.id !== id));
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentExperience.id) {
        const { id, ...updateData } = currentExperience;
        await api.updateExperience(id, updateData as UpdateExperience);
      } else {
        const { id, ...createData } = currentExperience;
        await api.createExperience(createData as CreateExperience);
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Expériences</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddExperience}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Experience
          </motion.button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {experiences.map((experience) => (
                <motion.tr
                  key={experience.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {experience.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{experience.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{experience.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(experience.startDate).toLocaleDateString()} -{' '}
                      {experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString()
                        : 'Présent'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditExperience(experience)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(experience.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-200/70 via-indigo-100/80 to-white/90 backdrop-blur-2xl">
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.28 }}
            className="bg-white/80 rounded-3xl shadow-2xl p-12 max-w-2xl w-full border border-blue-200 relative animate-fadeIn backdrop-blur-xl ring-1 ring-blue-100/40">
            {/* Barre de progression animée en haut */}
            <div className="absolute left-0 top-0 w-full h-1 overflow-hidden rounded-t-3xl">
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 animate-pulse" />
            </div>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition-colors text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-full w-11 h-11 flex items-center justify-center shadow-md bg-white/70 backdrop-blur">
              <span className="sr-only">Fermer</span>
              <svg xmlns='http://www.w3.org/2000/svg' className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="mb-12 text-center flex items-center justify-center gap-4 select-none">
              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 via-blue-400 to-indigo-500 shadow-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <defs>
                    <linearGradient id="expIconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f472b6" />
                      <stop offset="0.5" stopColor="#60a5fa" />
                      <stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="7" width="18" height="13" rx="3" fill="url(#expIconGradient)" />
                  <path d="M7 7V5a5 5 0 0110 0v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="14" r="3" stroke="white" strokeWidth="2" />
                </svg>
              </span>
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg font-display animate-gradient-x">
                {currentExperience.id ? 'Modifier' : 'Ajouter'} une expérience
              </span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    id="title"
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-blue-400 group-hover:shadow-lg"
                    placeholder="Titre"
                    value={currentExperience.title || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
                  />
                  <label htmlFor="title" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3v9a1 1 0 001 1h4a1 1 0 001-1v-9h3a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1z" /></svg>
                    Titre
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    id="company"
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-indigo-400 group-hover:shadow-lg"
                    placeholder="Entreprise"
                    value={currentExperience.company || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                  />
                  <label htmlFor="company" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-indigo-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="7" width="18" height="13" rx="2" />
                      <path d="M9 21V9h6v12" />
                      <path d="M9 13h6" />
                    </svg>
                    Entreprise
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    id="location"
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-purple-400 group-hover:shadow-lg"
                    placeholder="Localisation"
                    value={currentExperience.location || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
                  />
                  <label htmlFor="location" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-purple-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 018 8c0 5.25-8 12-8 12S4 15.25 4 10a8 8 0 018-8z" /></svg>
                    Localisation
                  </label>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-1/2 group">
                    <DatePicker
                      selected={currentExperience.startDate ? new Date(currentExperience.startDate) : null}
                      onChange={date => setCurrentExperience({ ...currentExperience, startDate: date ? date.toISOString().slice(0, 10) : '' })}
                      dateFormat="yyyy-MM-dd"
                      className="peer h-12 w-full border-b-2 border-blue-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all text-base rounded-xl shadow-inner group-hover:border-blue-400 group-hover:shadow-lg pl-4 pr-10"
                      placeholderText="Date de début"
                      id="startDate"
                      required
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      autoComplete="off"
                    />
                    <label htmlFor="startDate" className="absolute left-2 -top-4 text-gray-600 text-base transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:text-base bg-white/80 px-1 rounded flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Début
                    </label>
                  </div>
                  <div className="relative w-1/2 group">
                    <DatePicker
                      selected={currentExperience.endDate ? new Date(currentExperience.endDate) : null}
                      onChange={date => setCurrentExperience({ ...currentExperience, endDate: date ? date.toISOString().slice(0, 10) : '' })}
                      dateFormat="yyyy-MM-dd"
                      className="peer h-12 w-full border-b-2 border-indigo-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 bg-white/60 transition-all text-base rounded-xl shadow-inner group-hover:border-indigo-400 group-hover:shadow-lg pl-4 pr-10"
                      placeholderText="Date de fin"
                      id="endDate"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      autoComplete="off"
                    />
                    <label htmlFor="endDate" className="absolute left-2 -top-4 text-gray-600 text-base transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-4 peer-focus:text-indigo-600 peer-focus:text-base bg-white/80 px-1 rounded flex items-center gap-1">
                      <svg className="w-4 h-4 text-indigo-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Fin
                    </label>
                  </div>
                </div>
                <div className="relative md:col-span-2 group">
                  <textarea
                    required
                    id="description"
                    rows={4}
                    className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all resize-none text-base pr-10 rounded-xl shadow-inner group-hover:border-indigo-400 group-hover:shadow-lg"
                    placeholder="Description"
                    value={currentExperience.description || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
                  />
                  <label htmlFor="description" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-indigo-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                    Description
                  </label>
                </div>
                <div className="relative md:col-span-2 group">
                  <input
                    type="text"
                    id="technologies"
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-pink-300 group-hover:shadow-lg"
                    placeholder="Technologies (séparées par des virgules)"
                    value={currentExperience.technologies?.join(', ') || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, technologies: e.target.value.split(',').map((t) => t.trim()) })}
                  />
                  <label htmlFor="technologies" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-pink-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M8 9l2 2-2 2" />
                      <path d="M12 15h4" />
                    </svg>
                    Technologies (séparées par des virgules)
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-6 mt-12">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 rounded-xl border border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100 transition-colors shadow-md font-semibold text-lg backdrop-blur"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg backdrop-blur"
                >
                  {currentExperience.id ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 