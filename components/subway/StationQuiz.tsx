import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStationQuiz } from '@/hooks/useStationQuiz';
import { QuizQuestion } from '@/lib/types';

interface StationQuizProps {
  stationId: string;
  onComplete: (success: boolean) => void;
}

const StationQuiz: React.FC<StationQuizProps> = ({ stationId, onComplete }) => {
  const { quiz, submitQuiz } = useStationQuiz(stationId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = async (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (newAnswers.length === quiz?.questions.length) {
      setIsSubmitting(true);
      try {
        const result = await submitQuiz(newAnswers);
        onComplete(result.success);
      } catch (error) {
        console.error('Quiz submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-zinc-900 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-8">
        Station Quiz ({currentQuestion + 1}/{quiz.questions.length})
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="space-y-6"
        >
          <p className="text-lg text-white">{question.question}</p>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={isSubmitting}
                className="w-full p-4 text-left bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};