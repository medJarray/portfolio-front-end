import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { Code2, Server, Settings, Brain, Link2, Database, Wrench, Lightbulb, UserCheck, MessageCircle, ListChecks } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  description: string;
}

const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'Tools & DevOps',
  'Soft Skills',
];

export function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Erreur lors du chargement des compétences:', error);
    }
  };

  const handleAddSkill = () => {
    setCurrentSkill({});
    setIsModalOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setCurrentSkill(skill);
    setIsModalOpen(true);
  };

  const handleDeleteSkill = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      try {
        await api.deleteSkill(id);
        setSkills(skills.filter(skill => skill.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentSkill.id) {
        await api.updateSkill(currentSkill.id, currentSkill);
      } else {
        await api.createSkill(currentSkill);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'Débutant';
      case 2:
        return 'Intermédiaire';
      case 3:
        return 'Avancé';
      default:
        return 'Inconnu';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend development':
        return <Code2 className="h-6 w-6 text-indigo-400" />;
      case 'backend development':
        return <Database className="h-6 w-6 text-blue-500" />;
      case 'tools & devops':
        return <Wrench className="h-6 w-6 text-indigo-500" />;
      case 'soft skills':
        return <Brain className="h-6 w-6 text-indigo-400" />;
      default:
        return <Code2 className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Compétences</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Ajouter une compétence
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compétence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{skill.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {getLevelLabel(skill.level)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">{skill.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {currentSkill.id ? 'Modifier' : 'Ajouter'} une compétence
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom de la compétence
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={currentSkill.name || ''}
                  onChange={(e) =>
                    setCurrentSkill({
                      ...currentSkill,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={currentSkill.category || ''}
                  onChange={(e) =>
                    setCurrentSkill({
                      ...currentSkill,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Sélectionner une catégorie</option>
                  {SKILL_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Niveau
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={currentSkill.level || ''}
                  onChange={(e) =>
                    setCurrentSkill({
                      ...currentSkill,
                      level: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="1">Débutant</option>
                  <option value="2">Intermédiaire</option>
                  <option value="3">Avancé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={currentSkill.description || ''}
                  onChange={(e) =>
                    setCurrentSkill({
                      ...currentSkill,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  {currentSkill.id ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .animated-gradient-border {
          border-image: linear-gradient(120deg, #a5b4fc 0%, #f9a8d4 50%, #a7f3d0 100%) 1;
          transition: border 0.4s;
        }
        .group:hover .animated-gradient-border {
          border-width: 2.5px;
          border-image: linear-gradient(90deg, #6366f1, #0ea5e9, #f472b6, #a7f3d0) 1;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1.2s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 0.8s ease-in-out infinite;
        }
        @keyframes badge-pop {
          0% { transform: scale(0.8); opacity: 0.5; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-badge-pop {
          animation: badge-pop 0.7s cubic-bezier(.68,-0.55,.27,1.55) 1;
        }
        .group:hover .hover\:scale-\[1\.03\] {
          transform: scale(1.03);
        }
        .group:hover .hover\:bg-indigo-50\/60 {
          background-color: rgba(238, 242, 255, 0.6);
        }
        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .bg-white\/60 {
          background-color: rgba(255, 255, 255, 0.6);
        }
        .hover\:bg-white\/80:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }
        .border-indigo-200 {
          border-color: rgb(224, 231, 255);
        }
        .text-indigo-400 {
          color: rgb(129, 140, 248);
        }
        .text-indigo-500 {
          color: rgb(99, 102, 241);
        }
        .text-indigo-600 {
          color: rgb(79, 70, 229);
        }
        .from-indigo-100 {
          --tw-gradient-from: #e0e7ff;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(224, 231, 255, 0));
        }
        .to-pink-100 {
          --tw-gradient-to: #fce7f3;
        }
      `}</style>
    </div>
  );
} 