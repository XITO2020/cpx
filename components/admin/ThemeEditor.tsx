import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';

interface ColorInput {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInput> = ({ label, value, onChange }) => (
  <div className="flex items-center gap-4">
    <label className="text-gray-400 w-32">{label}</label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-12 h-12 rounded cursor-pointer"
    />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg"
    />
  </div>
);

const ThemeEditor: React.FC = () => {
  const { theme } = useTheme();
  const [colors, setColors] = useState({
    primary: '#000000',
    secondary: '#000000',
    accent: '#000000',
    buttonPrimary: '#000000',
    buttonSecondary: '#000000',
    text: '#000000',
    background: '#000000',
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, colors }),
      });

      if (!response.ok) throw new Error('Failed to save theme');
      
      // Show success message
    } catch (error) {
      console.error('Theme save error:', error);
      // Show error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-8">Theme Editor</h2>

      <div className="space-y-6 bg-zinc-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4 capitalize">
          {theme} Theme
        </h3>

        <div className="space-y-4">
          <ColorInput
            label="Primary Color"
            value={colors.primary}
            onChange={(value) => setColors(prev => ({ ...prev, primary: value }))}
          />
          <ColorInput
            label="Secondary Color"
            value={colors.secondary}
            onChange={(value) => setColors(prev => ({ ...prev, secondary: value }))}
          />
          <ColorInput
            label="Accent Color"
            value={colors.accent}
            onChange={(value) => setColors(prev => ({ ...prev, accent: value }))}
          />
          <ColorInput
            label="Button Primary"
            value={colors.buttonPrimary}
            onChange={(value) => setColors(prev => ({ ...prev, buttonPrimary: value }))}
          />
          <ColorInput
            label="Button Secondary"
            value={colors.buttonSecondary}
            onChange={(value) => setColors(prev => ({ ...prev, buttonSecondary: value }))}
          />
          <ColorInput
            label="Text Color"
            value={colors.text}
            onChange={(value) => setColors(prev => ({ ...prev, text: value }))}
          />
          <ColorInput
            label="Background"
            value={colors.background}
            onChange={(value) => setColors(prev => ({ ...prev, background: value }))}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold mt-8"
        >
          Save Theme
        </motion.button>
      </div>
    </div>
  );
};

export default ThemeEditor;