import React from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type = 'text',
  disabled = false
}) => {
  return (
    <div className="relative">
      <motion.input
        whileFocus={{ scale: 1.02 }}
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        disabled={disabled}
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-2
          focus:ring-rose-500
          peer
          disabled:opacity-70
          disabled:cursor-not-allowed
          transition
        "
        placeholder=" "
      />
      <motion.label
        htmlFor={id}
        className="
          absolute 
          text-md
          text-zinc-400
          duration-150 
          transform 
          -translate-y-3 
          scale-75 
          top-4 
          z-10 
          origin-[0] 
          left-6
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-3
        "
      >
        {label}
      </motion.label>
    </div>
  );
};

export default Input;