import React from 'react';
import { motion } from 'framer-motion';
import { useRewards } from '@/hooks/useRewards';
import { FaGift, FaClock, FaUpload, FaCoins } from 'react-icons/fa';

const RewardsPanel: React.FC = () => {
  const { rewards, isLoading, claimReward } = useRewards();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
      </div>
    );
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'tabz':
        return <FaCoins className="text-yellow-500" />;
      case 'upload_slot':
        return <FaUpload className="text-blue-500" />;
      case 'duration_increase':
        return <FaClock className="text-green-500" />;
      default:
        return <FaGift className="text-rose-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Rewards</h2>
      
      <div className="grid gap-4">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {getRewardIcon(reward.type)}
              <div>
                <p className="text-white font-semibold">
                  {reward.type === 'tabz' && `${reward.amount} TabZ Tokens`}
                  {reward.type === 'upload_slot' && 'Additional Upload Slot'}
                  {reward.type === 'duration_increase' && 'Increased Duration Limit'}
                </p>
                <p className="text-sm text-gray-400">
                  Earned on {new Date(reward.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {!reward.claimed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => claimReward(reward.id)}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Claim
              </motion.button>
            )}
          </motion.div>
        ))}

        {rewards.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No rewards available yet. Keep creating great content!
          </p>
        )}
      </div>
    </div>
  );
};