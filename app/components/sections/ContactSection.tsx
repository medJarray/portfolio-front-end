import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, UserCheck, MessageCircle } from 'lucide-react';
import { EnvelopeSimple } from 'phosphor-react';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="connect" className="py-20 bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-indigo-400 via-blue-300 to-pink-300 shadow-md mb-2">
              <EnvelopeSimple size={32} className="text-indigo-600" />
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('contact.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t('contact.description')}
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-indigo-400 via-pink-400 to-blue-400 p-[2px] rounded-2xl w-full max-w-lg mx-auto">
            <form className="bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-6 border border-white w-full">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.name')}
                </label>
                <div className="flex items-center rounded-lg border border-gray-200 focus-within:border-indigo-400 transition bg-transparent">
                  <UserCheck className="h-5 w-5 ml-3 text-indigo-400" />
                  <input
                    type="text"
                    id="name"
                    className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 rounded-lg text-gray-900 placeholder-gray-400"
                    placeholder={t('contact.form.name_placeholder')}
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.email')}
                </label>
                <div className="flex items-center rounded-lg border border-gray-200 focus-within:border-indigo-400 transition bg-transparent">
                  <EnvelopeSimple className="h-5 w-5 ml-3 text-indigo-400" />
                  <input
                    type="email"
                    id="email"
                    className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 rounded-lg text-gray-900 placeholder-gray-400"
                    placeholder={t('contact.form.email_placeholder')}
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')}
                </label>
                <div className="flex items-start rounded-lg border border-gray-200 focus-within:border-indigo-400 transition bg-transparent">
                  <MessageCircle className="h-5 w-5 ml-3 mt-3 text-indigo-400" />
                  <textarea
                    id="message"
                    rows={4}
                    className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 rounded-lg text-gray-900 placeholder-gray-400 resize-none"
                    placeholder={t('contact.form.message_placeholder')}
                  ></textarea>
                </div>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" /> {t('contact.form.send')}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};