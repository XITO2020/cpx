import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useContentModeration from '@/hooks/useContentModeration';

const ContentModeration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'articles' | 'comments'>('videos');
  const { pendingContent, approveContent, rejectContent } = useContentModeration(activeTab);

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Content Moderation</h2>

      <div className="flex space-x-4 mb-6">
        {(['videos', 'articles', 'comments'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize ${
              activeTab === tab
                ? 'bg-rose-600 text-white'
                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {pendingContent.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-800 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">
                  By {item.author} • {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => approveContent(item.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => rejectContent(item.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </motion.button>
              </div>
            </div>
          ))}

          {pendingContent.length === 0 && (
            <p className="text-center text-gray-400 py-4">
              No pending {activeTab} to moderate
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};