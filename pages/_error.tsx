// pages/Error404.tsx

"use client"
import React from 'react';

type ResetFunction = () => void;

interface Error404Props {
  reset: ResetFunction;
}

const Error404: React.FC<Error404Props> = ({reset}) => {
  return (
    <div className="bg-yellow-400 text-4xl text-violet-800 w-full h-screen flex items-center justify-center">
      <h1>Page not found ! </h1>
      <p>
        <button className="p-4 m-2" onClick={reset}>Réessayer</button>
      </p>
     
    </div>
  );
};

export default Error404;
