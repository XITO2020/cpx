import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const links = [
    {
      name: 'Tabasco City',
      image: '/img/tbcity.png',
      desc: 'architecture-robloxcity/portfolio/eCom',
      width: 32
    },
    { name: 'Shonen Dump', desc: 'Manga/webcomics' },
    { name: 'Memeral Reserv', desc: 'NFT/MEMES' },
    { name: 'Scroll You All', desc: 'discord/team-crea-roman-photo' },
    {
      name: 'Zarmazon',
      image: '/img/zz-lemon.png',
      desc: 'eCom/zarmazon prime concurrence',
      width: 32
    },
    { name: 'GreenScreenSchool', desc: 'LMS: Paranostra how to hack' },
    {
      name: 'nouvelle',
      image: '/img/doxa.png',
      desc: 'blog/articles',
      width: 16
    },
    { name: 'Future404', desc: 'point&clickGame' },
    { name: 'Terra343', desc: 'Arcos-landing-renting' },
    { name: 'Garow, game of Truth', desc: 'quizz-games' }
  ];

  return (
    <footer className="w-full h-64 netflix transition border-opacity-60 border-t-rose-700 border-t-2">
      <div className="grid grid-cols-5 gap-4 text-zinc-700 p-6">
        {links.map((link, index) => (
          <div key={index} className="text-center">
            <Link href="#" target="_blank" className="block">
              {link.image ? (
                <Image
                  src={link.image}
                  alt={`logo ${link.name}`}
                  width={link.width * 10}
                  height={link.width * 10}
                  className={`mx-auto opacity-70 hover:opacity-100 transition ${
                    link.name === 'Tabasco City' ? 'glowy' : ''
                  }`}
                />
              ) : (
                link.name
              )}
            </Link>
            <p className="text-sm mt-1">{link.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-white text-center font-bebas tracking-wider mt-4">
        This serie of websites is exclusive Property of naïmé tabasco in heritance from O. Opal, ©2013-2023
      </div>
    </footer>
  );
};

export default Footer;