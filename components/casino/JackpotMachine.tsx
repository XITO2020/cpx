import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { JackpotReel } from './JackpotReel';
import { JackpotWinModal } from './JackpotWinModal';
import { useJackpotStore } from '@/stores/jackpotStore';
import { JACKPOT_REWARDS } from '@/lib/constants';

const SPIN_DURATION = 4000; // 4 seconds total spin time
const REEL_DELAY = 500; // 0.5 second delay between reels

export const JackpotMachine: React.FC = () => {
  const { data: session } = useSession();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [lastWinDate, setLastWinDate] = useState<Date | null>(null);
  const windowRef = useRef<Window | null>(null);
  const { canPlay, setLastPlayed } = useJackpotStore();

  const [reelResults, setReelResults] = useState<number[]>([]);
  const spinTimeoutRef = useRef<NodeJS.Timeout>();
  const windowTimeoutRef = useRef<NodeJS.Timeout>();

  const jackpotImages = [
    { id: 1, src: '/casino/symbol1.png', reward: 19 },
    { id: 2, src: '/casino/symbol2.png', reward: 27 },
    { id: 3, src: '/casino/symbol3.png', reward: 40 },
    { id: 4, src: '/casino/symbol4.png', reward: 79 },
    { id: 5, src: '/casino/symbol5.png', reward: 80 },
    // Add more symbols up to 12
  ];

  const handleSpin = () => {
    if (!session || !canPlay || isSpinning) return;

    setIsSpinning(true);
    const results = Array(3).fill(0).map(() => 
      Math.floor(Math.random() * jackpotImages.length)
    );
    setReelResults(results);

    // Open target window
    windowRef.current = window.open(
      '/casino/jackpot-window',
      'jackpot_window',
      'width=400,height=300'
    );

    // Check if window stays open for 1 minute
    windowTimeoutRef.current = setTimeout(() => {
      if (windowRef.current && !windowRef.current.closed) {
        checkWin(results);
      }
    }, 60000);

    // Stop spinning after duration
    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      if (results[0] === results[1] && results[1] === results[2]) {
        const reward = jackpotImages[results[0]].reward;
        setWinAmount(reward);
        setShowWinModal(true);
      }
    }, SPIN_DURATION + REEL_DELAY * 3);
  };

  const checkWin = async (results: number[]) => {
    if (results[0] === results[1] && results[1] === results[2]) {
      const reward = jackpotImages[results[0]].reward;
      try {
        const response = await fetch('/api/casino/claim-reward', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reward }),
        });
        
        if (response.ok) {
          setLastPlayed(new Date());
          setLastWinDate(new Date());
        }
      } catch (error) {
        console.error('Failed to claim reward:', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
      if (windowTimeoutRef.current) clearTimeout(windowTimeoutRef.current);
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 rounded-lg p-8 shadow-lg"
      >
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2].map((reelIndex) => (
            <JackpotReel
              key={reelIndex}
              images={jackpotImages}
              isSpinning={isSpinning}
              delay={reelIndex * REEL_DELAY}
              duration={SPIN_DURATION}
              result={reelResults[reelIndex]}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSpin}
          disabled={!canPlay || isSpinning || !session}
          className="w-full bg-rose-600 text-white py-3 rounded-lg font-bold text-xl
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Spinning...' : 'SPIN!'}
        </motion.button>

        <div className="mt-6 text-center text-gray-400">
          <h3 className="text-lg font-semibold mb-2">Jackpot Rules:</h3>
          <ul className="text-sm space-y-1">
            <li>• One spin per month per user</li>
            <li>• Keep the popup window open for 1 minute to claim your prize</li>
            <li>• Match 3 symbols to win TabZ rewards:</li>
            <li className="grid grid-cols-2 gap-2 max-w-xs mx-auto mt-2">
              {jackpotImages.map((img) => (
                <div key={img.id} className="flex items-center gap-2">
                  <img src={img.src} alt={`Symbol ${img.id}`} className="w-6 h-6" />
                  <span>{img.reward} TabZ</span>
                </div>
              ))}
            </li>
          </ul>
          {lastWinDate && (
            <p className="mt-4 text-sm">
              Last win: {lastWinDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showWinModal && (
          <JackpotWinModal
            amount={winAmount}
            onClose={() => setShowWinModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};