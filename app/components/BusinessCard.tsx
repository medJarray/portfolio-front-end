import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaGlobe, 
  FaLinkedin, 
  FaGithub, 
  FaIdCard, 
  FaDownload, 
  FaShare,
  FaTimes,
  FaStar,
  FaRegIdCard
} from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineLightningBolt } from 'react-icons/hi';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';

interface BusinessCardProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  linkedin?: string;
  github?: string;
  photoUrl: string;
  qrUrl?: string;
  buttonText?: string;
  company?: string;
  location?: string;
  bio?: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  title,
  email,
  phone,
  website,
  linkedin,
  github,
  photoUrl,
  qrUrl,
  buttonText = 'Contact Me',
  company,
  location,
  bio,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [glowColor, setGlowColor] = useState('#0ea5e9');
  const cardRef = useRef<HTMLDivElement>(null);

  // Réinitialiser le flip quand on ouvre la carte
  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
    }
  }, [isOpen]);

  // Effet de changement de couleur du glow cyberpunk
  useEffect(() => {
    const colors = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#ec4899', '#06b6d4'];
    let index = 0;
    const interval = setInterval(() => {
      setGlowColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Données pour le QR code vCard
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${company || 'Freelance Developer'}
TITLE:${title}
TEL:${phone}
EMAIL:${email}
URL:${website}
${linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}` : ''}
${github ? `X-SOCIALPROFILE;TYPE=github:${github}` : ''}
${location ? `ADR:;;${location};;;;` : ''}
${bio ? `NOTE:${bio}` : ''}
END:VCARD`;

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
        });
        const link = document.createElement('a');
        link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-business-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Carte de visite - ${name}`,
          text: `${name} - ${title}`,
          url: website,
        });
      } catch (error) {
        console.error('Erreur lors du partage:', error);
      }
    } else {
      navigator.clipboard.writeText(website);
    }
  };

  return (
    <>
      {/* Bouton d'ouverture simple sans animations */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-3 rounded-xl border-none group overflow-hidden hover:scale-105 transition-all duration-200"
        title="Voir ma carte de visite digitale"
      >
        {/* Icône simple pour afficher la carte */}
        <FaRegIdCard className="w-5 h-5 text-gray-800" />
      </button>

      {/* Modal futuriste avec carte flippable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >

            <motion.div
              initial={{ scale: 0.8, rotateY: -15, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotateY: 15, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 400,
                duration: 0.4 
              }}
              onClick={e => e.stopPropagation()}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Conteneur de la carte avec flip instantané */}
              <div
                ref={cardRef}
                className="relative w-96 h-64"
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.25s ease',
                }}
              >
                {/* Face avant - Informations personnelles */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/50"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'transform',
                    background: `
                      linear-gradient(135deg, 
                        rgba(6, 182, 212, 0.1) 0%, 
                        rgba(59, 130, 246, 0.1) 35%, 
                        rgba(147, 51, 234, 0.1) 70%,
                        rgba(236, 72, 153, 0.1) 100%
                      )
                    `,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 0 60px ${glowColor}40, 
                      inset 0 0 60px rgba(255,255,255,0.1),
                      0 0 100px rgba(59, 130, 246, 0.3)
                    `,
                  }}
                >
                  {/* Contenu de la face avant */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Header avec photo et informations */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {/* Cercle de bordure simple */}
                        <div 
                          className="w-24 h-24 rounded-full p-1 relative"
                          style={{
                            background: `linear-gradient(45deg, ${glowColor}, #8b5cf6, ${glowColor})`,
                          }}
                        >
                          <img 
                            src={photoUrl} 
                            alt={name} 
                            className="w-full h-full rounded-full object-cover bg-gray-900"
                          />
                        </div>
                        
                        {/* Effet de pulse */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 opacity-60"
                          style={{ borderColor: glowColor }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />

                        {/* Étoiles flottantes */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute"
                            animate={{
                              x: [0, 20, 0],
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.7,
                            }}
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${10 + i * 20}%`,
                            }}
                          >
                            <FaStar className="text-yellow-400 text-xs" />
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex-1">
                        <motion.h2 
                          className="text-2xl font-bold text-white mb-1 tracking-wide"
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {name}
                        </motion.h2>
                        <motion.p 
                          className="text-lg font-semibold mb-1"
                          style={{ color: glowColor }}
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {title}
                        </motion.p>
                        {company && (
                          <motion.p 
                            className="text-sm text-gray-300"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            {company}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Informations de contact avec animations */}
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors group"
                        whileHover={{ x: 8, scale: 1.02 }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <FaEnvelope className="text-cyan-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                        <span className="text-sm font-mono truncate">{email}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors group"
                        whileHover={{ x: 8, scale: 1.02 }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <FaPhone className="text-green-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                        <span className="text-sm font-mono">{phone}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors group"
                        whileHover={{ x: 8, scale: 1.02 }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <FaGlobe className="text-blue-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                        <a 
                          href={website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm font-mono hover:underline truncate"
                        >
                          {website.replace(/https?:\/\//, '')}
                        </a>
                      </motion.div>
                    </div>

                    {/* Bouton pour retourner la carte */}
                    <button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="self-end px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-150 flex items-center space-x-2 shadow-lg hover:shadow-xl active:scale-95"
                    >
                      <HiOutlineSparkles className="text-sm" />
                      <span>QR Code</span>
                    </button>
                  </div>
                </div>

                {/* Face arrière - QR Code et réseaux sociaux */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-purple-400/50"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'transform',
                    transform: 'rotateY(180deg)',
                    background: `
                      linear-gradient(135deg, 
                        rgba(147, 51, 234, 0.1) 0%, 
                        rgba(59, 130, 246, 0.1) 35%, 
                        rgba(6, 182, 212, 0.1) 70%,
                        rgba(16, 185, 129, 0.1) 100%
                      )
                    `,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 0 60px ${glowColor}40, 
                      inset 0 0 60px rgba(255,255,255,0.1),
                      0 0 100px rgba(147, 51, 234, 0.3)
                    `,
                  }}
                >
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center space-y-6">
                    <motion.h3 
                      className="text-xl font-bold text-white text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      📱 Scannez pour me contacter
                    </motion.h3>

                    {/* QR Code avec effets futuristes */}
                    <motion.div 
                      className="relative"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <div 
                        className="p-4 rounded-2xl relative"
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: `0 0 40px ${glowColor}80`,
                        }}
                      >
                        <QRCodeCanvas 
                          value={qrUrl || vCardData} 
                          size={140} 
                          level="H"
                          className="rounded-lg"
                          fgColor="#1a1a1a"
                          bgColor="#ffffff"
                        />
                      </div>
                      
                      {/* Cercles d'animation autour du QR */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-2xl border-2"
                          style={{ borderColor: glowColor }}
                          animate={{
                            scale: [1, 1.2 + i * 0.1, 1],
                            opacity: [0.3, 0, 0.3],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Réseaux sociaux avec animations */}
                    <div className="flex space-x-4">
                      {linkedin && (
                        <motion.a
                          href={linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg"
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 10,
                            boxShadow: `0 10px 30px rgba(59, 130, 246, 0.5)`,
                          }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <FaLinkedin size={20} />
                        </motion.a>
                      )}
                      
                      {github && (
                        <motion.a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors shadow-lg"
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: -10,
                            boxShadow: `0 10px 30px rgba(75, 85, 99, 0.5)`,
                          }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          <FaGithub size={20} />
                        </motion.a>
                      )}
                    </div>

                    {/* Bouton retour */}
                    <motion.button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium hover:from-purple-400 hover:to-pink-500 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 10px 25px rgba(147, 51, 234, 0.4)`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <HiOutlineLightningBolt className="animate-pulse" />
                      <span>Retour</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Boutons d'actions flottants */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <motion.button
                  onClick={handleDownload}
                  className="p-4 rounded-full bg-green-600 text-white hover:bg-green-500 transition-colors shadow-lg"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    boxShadow: `0 15px 30px rgba(34, 197, 94, 0.4)`,
                  }}
                  whileTap={{ scale: 0.9 }}
                  title="Télécharger la carte"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <FaDownload size={18} />
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    boxShadow: `0 15px 30px rgba(59, 130, 246, 0.4)`,
                  }}
                  whileTap={{ scale: 0.9 }}
                  title="Partager"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <FaShare size={18} />
                </motion.button>
                
                <motion.button
                  onClick={() => window.open(`mailto:${email}`)}
                  className="p-4 rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors shadow-lg"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    boxShadow: `0 15px 30px rgba(239, 68, 68, 0.4)`,
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={buttonText}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <FaEnvelope size={18} />
                </motion.button>
              </div>

              {/* Bouton de fermeture */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 p-3 rounded-full bg-red-500 text-white hover:bg-red-400 transition-colors shadow-lg"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 90,
                  boxShadow: `0 10px 25px rgba(239, 68, 68, 0.4)`,
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <FaTimes size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BusinessCard;