import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MapPin, Eye, Mail, Users } from 'lucide-react';

// L’IP admin est maintenant configurable via .env (VITE_ADMIN_IP)
const MY_ADMIN_IP = import.meta.env.VITE_ADMIN_IP;

// Typage pour un message récent
type RecentMessage = { id: number; name: string; subject: string; date: string };

// Données fictives pour le dashboard (à remplacer par API)
const MOCK_DASHBOARD = {
  visits: 12456,
  messages: 17,
  visitors: 8932,
  locations: [
    { country: 'France', count: 4120 },
    { country: 'Maroc', count: 2100 },
    { country: 'Canada', count: 1200 },
    { country: 'Tunisie', count: 900 },
    { country: 'Belgique', count: 600 },
  ],
  recentMessages: [
    { id: 1, name: 'Alice', subject: 'Demande de contact', date: '2025-07-17' },
    { id: 2, name: 'Karim', subject: 'Collaboration', date: '2025-07-16' },
    { id: 3, name: 'Sophie', subject: 'Bravo pour le site !', date: '2025-07-15' },
  ],
  // Ajout des métriques avancées
  peakHours: ['21h', '22h', '23h'],
  peakDays: ['Dimanche', 'Lundi'],
  conversionRate: 4.2, // %
  trafficSources: [
    { label: 'Direct', value: 52 },
    { label: 'Réseaux sociaux', value: 23 },
    { label: 'Moteurs de recherche', value: 18 },
    { label: 'Sites référents', value: 7 },
  ],
  avgTimeOnSite: '2m 37s',
  githubClicks: 312,
  cvDownloads: 188,
};

const stats = [
  {
    name: 'Expériences',
    href: '/admin/experiences',
    description: 'Gérer vos expériences professionnelles',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: 'Diplômes',
    href: '/admin/degrees',
    description: 'Gérer vos diplômes et formations',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
  },
  {
    name: 'Compétences',
    href: '/admin/skills',
    description: 'Gérer vos compétences techniques',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    name: 'Messages',
    href: '/admin/contacts',
    description: 'Gérer les messages de contact',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function AdminIndex() {
  // Pour simuler un chargement API
  const [dashboard, setDashboard] = useState<typeof MOCK_DASHBOARD>(MOCK_DASHBOARD);
  const [selectedMessage, setSelectedMessage] = useState<RecentMessage | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Vérifie l’IP publique du visiteur
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        console.log('IP visiteur:', data.ip);
        if (data.ip === MY_ADMIN_IP) setIsAdmin(true);
      })
      .catch(() => setIsAdmin(false));
    // Ici tu peux fetch tes vraies stats/messages si besoin
    // setDashboard(await fetchDashboard())
  }, []);

  // Simule le contenu d'un message (à remplacer par API)
  const getMessageContent = (msg: RecentMessage | null): string => {
    if (!msg) return '';
    if (msg.id === 1) return "Bonjour, je souhaite vous contacter pour discuter d'une opportunité professionnelle.";
    if (msg.id === 2) return "Bonjour, intéressé par une collaboration sur un projet web moderne.";
    if (msg.id === 3) return "Bravo pour votre site, il est très inspirant !";
    return "Contenu du message indisponible.";
  };
  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Dashboard premium */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bienvenue dans votre espace d'administration</h1>
            <p className="text-xl text-gray-600">Gérez facilement le contenu de votre portfolio</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/80 rounded-xl shadow px-5 py-3 border border-blue-100">
              <Eye className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-semibold text-gray-900">{dashboard.visits}</span>
              <span className="text-gray-500 text-sm">visites</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 rounded-xl shadow px-5 py-3 border border-pink-100">
              <Mail className="w-6 h-6 text-pink-500" />
              <span className="text-lg font-semibold text-gray-900">{dashboard.messages}</span>
              <span className="text-gray-500 text-sm">messages</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 rounded-xl shadow px-5 py-3 border border-indigo-100">
              <Users className="w-6 h-6 text-indigo-500" />
              <span className="text-lg font-semibold text-gray-900">{dashboard.visitors}</span>
              <span className="text-gray-500 text-sm">visiteurs</span>
            </div>
          </div>
        </div>
        {/* Statistiques avancées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-indigo-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-indigo-400" />
              <span className="font-semibold text-gray-800">Pic d’audience</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">Heures les plus actives :</div>
            <div className="flex gap-2 flex-wrap mb-2">
              {(dashboard.peakHours || []).map((h) => (
                <span key={h} className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">{h}</span>
              ))}
            </div>
            <div className="text-sm text-gray-600 mb-1">Jours les plus actifs :</div>
            <div className="flex gap-2 flex-wrap">
              {(dashboard.peakDays || []).map((d) => (
                <span key={d} className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">{d}</span>
              ))}
            </div>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-pink-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-gray-800">Conversion</span>
            </div>
            <div className="text-3xl font-bold text-pink-500 mb-1">{dashboard.conversionRate}%</div>
            <div className="text-sm text-gray-600">ont envoyé un message</div>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-blue-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-gray-800">Provenance du trafic</span>
            </div>
            <ul className="space-y-1">
              {(dashboard.trafficSources || []).map(src => (
                <li key={src.label} className="flex justify-between text-gray-700 text-sm">
                  <span>{src.label}</span>
                  <span className="font-semibold text-blue-600">{src.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-green-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-gray-800">Temps moyen sur le site</span>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{dashboard.avgTimeOnSite}</div>
            <div className="text-sm text-gray-600">par visiteur</div>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A8.001 8.001 0 014.07 13H5a1 1 0 110 2h-.93A8.001 8.001 0 0111 19.93V19a1 1 0 112 0v.93A8.001 8.001 0 0119.93 15H19a1 1 0 110-2h.93A8.001 8.001 0 0113 4.07V5a1 1 0 11-2 0V4.07A8.001 8.001 0 014.07 11H5a1 1 0 110-2h-.93A8.001 8.001 0 0111 4.07V5a1 1 0 112 0v-.93A8.001 8.001 0 0119.93 9H19a1 1 0 110 2h.93A8.001 8.001 0 0113 19.93z" /></svg>
              <span className="font-semibold text-gray-800">Visites GitHub</span>
            </div>
            <div className="text-2xl font-bold text-gray-700 mb-1">{dashboard.githubClicks}</div>
            <div className="text-sm text-gray-600">ont cliqué sur ton GitHub</div>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-yellow-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2zM7 10h10M7 14h10" /></svg>
              <span className="font-semibold text-gray-800">Téléchargements CV</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{dashboard.cvDownloads}</div>
            <div className="text-sm text-gray-600">ont téléchargé ton CV</div>
          </div>
        </div>
        {/* Localisation visiteurs + messages récents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-blue-100 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-gray-800">Top localisations visiteurs</span>
            </div>
            <ul className="space-y-2">
              {(dashboard.locations || []).map(loc => (
                <li key={loc.country} className="flex justify-between items-center text-gray-700">
                  <span>{loc.country}</span>
                  <span className="font-semibold text-blue-600">{loc.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-pink-100 flex flex-col md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-gray-800">Messages récents</span>
              <Link to="/admin/contacts" className="ml-auto text-blue-600 hover:underline text-sm font-medium">Voir tous les messages</Link>
            </div>
            <ul className="divide-y divide-pink-50">
              {(dashboard.recentMessages || []).map(msg => (
                <li key={msg.id} className="py-2 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">{msg.name}</span>
                  <span className="text-gray-500 text-sm">{msg.subject}</span>
                  <span className="ml-auto text-xs text-gray-400">{msg.date}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    className="text-pink-500 hover:underline text-xs font-medium focus:outline-none"
                  >Voir</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Grille de navigation admin visible uniquement pour l'admin */}
      {isAdmin && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.href}
                className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      {/* Popup message premium */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.22 }}
            className="bg-white/90 rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-pink-200 relative animate-fadeIn backdrop-blur-xl ring-1 ring-pink-100/40">
            <button onClick={() => setSelectedMessage(null)} className="absolute top-5 right-5 text-gray-400 hover:text-pink-600 transition-colors text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-pink-200 rounded-full w-10 h-10 flex items-center justify-center shadow bg-white/70 backdrop-blur">
              <span className="sr-only">Fermer</span>
              <svg xmlns='http://www.w3.org/2000/svg' className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-7 h-7 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">Message de {selectedMessage.name}</span>
            </div>
            <div className="mb-2 text-sm text-gray-500 flex gap-4">
              <span><b>Sujet :</b> {selectedMessage.subject}</span>
              <span><b>Date :</b> {selectedMessage.date}</span>
            </div>
            <div className="mt-6 text-gray-800 text-base whitespace-pre-line min-h-[60px]">
              {getMessageContent(selectedMessage)}
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedMessage(null)} className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold shadow hover:from-pink-600 hover:to-pink-500 transition-all text-base backdrop-blur">
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}