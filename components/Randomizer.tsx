// components/RandomizerButton.tsx
import React from 'react';

const tkURLticheck= [
  'https://www.tiktok.com/@helmyfamily/video/7371388853577436417',
]


const GZurls = [
  'https://linktr.ee/amranmaxa',
  'https://www.gofundme.com/f/help-mahmouds-mother-get-medical-care',
  'https://www.gofundme.com/f/help-my-family-from-gaza-have-a-safe-secure-life?attribution_id=sl:dd02e197-a850-4d40-b1cf-fa8b0579b908&utm_campaign=man_sharesheet_dash&utm_medium=customer&utm_source=copy_link',
  'https://www.gofundme.com/f/help-rahaf-her-family-get-out-of-gaza?utm_campaign=p_cp+share-sheet&utm_medium=copy_link_all&utm_source=customer&utm_term=CP_SSS_variant',
  'https://www.gofundme.com/f/pour-sauver-les-familles-deplacees-de-guerre-rdc?utm_campaign=p_cp+share-sheet&utm_medium=copy_link_all&utm_source=customer',
  'https://www.gofundme.com/f/help-my-family-to-leave-gaza-for-treatment-i-have-an-injure?utm_campaign=fp_sharesheet&utm_medium=customer&utm_source=copy_link',
  'https://www.gofundme.com/f/help-rescue-family-from-gazas-crisis?utm_campaign=p_cp%2Bfundraiser-sidebar&utm_medium=copy_link_all&utm_source=customer',
];

const getRandomUrl = () => {
  const randomIndex = Math.floor(Math.random() * GZurls.length);
  return GZurls[randomIndex];
};

const Randomizer: React.FC = () => {
  const handleClick = () => {
    const randomUrl = getRandomUrl();
    window.open(randomUrl, '_blank');
  };

  return (
    <button onClick={handleClick} className="text-xl">
      Randomizer ! ! !  
    </button>
  );
};

export default Randomizer;
