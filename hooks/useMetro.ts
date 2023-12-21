export const useMetro = () => {
  const lines = [
    { 
      color: 'bg-pink-600',
      name: 'Ligne 1',
      clipPath: 'polygon(0% 0%, 2% 15%, 7% 20%, 12% 22%, 28% 24%, 31% 26%, 33% 29%, 33% 31%, 40% 68%, 40% 71%, 43% 73%, 48% 74%, 75% 74%, 79% 76%, 81% 79%, 82% 83%, 82% 87%, 82% 100%, 84% 100%, 85% 87%, 85% 83%, 83% 77%, 80% 73%, 75% 71%, 48% 71%, 44% 70%, 43% 67%, 42% 62%, 37% 30%, 36% 26%, 34% 22%, 29% 18%, 14% 18%, 9% 17%, 8% 16%, 7% 13%, 3% 0%)',

      stations: [
        { stationName: 'Station A1', link: 'https://www.youtube.com' },
        { stationName: 'Station A2', link: 'https://www.youtube.com' },
        { stationName: 'Station A3', link: 'https://www.youtube.com' },
        { stationName: 'Station A4', link: 'https://www.youtube.com' },
      ]
    },
    { 
      color: 'bg-violet-600',
      name: 'Ligne 2',
      clipPath: 'polygon(78% 0, 57% 36%, 58% 64%, 41% 88%, 29% 99%, 24% 100%, 39% 85%, 54% 63%, 54% 36%, 71% 0%);',
      stations: [
        { stationName: 'Station B1', link: 'https://www.youtube.com' },
        { stationName: 'Station B2', link: 'https://www.youtube.com' },
        { stationName: 'Station B3', link: 'https://www.youtube.com' },
        { stationName: 'Station B4', link: 'https://www.youtube.com' },
      ]
    },
    { 
      color: 'bg-rose-500',
      name: 'Ligne 3',
      clipPath: 'polygon(99% 58%, 57% 36%, 54% 48%, 36% 54%, 0 46%, 0 40%, 34% 46%, 51% 38%, 54% 30%, 100% 51%)',
      stations: [
        { stationName: 'Station C1', link: 'https://www.youtube.com' },
        { stationName: 'Station C2', link: 'https://www.youtube.com' },
        { stationName: 'Station C3', link: 'https://www.youtube.com' },
        { stationName: 'Station C4', link: 'https://www.youtube.com' },
      ]
    },
    { 
      color: 'bg-yellow-400',
      name: 'Ligne 4',
      clipPath: 'polygon(25% 0%, 32% 0%, 34% 34%, 73% 75%, 73% 100%, 69% 100%, 67% 75%, 29% 35%, 26% 0%, 31% 0%)',
      stations: [
        { stationName: 'Station D1', link: 'https://www.youtube.com' },
        { stationName: 'Station D2', link: 'https://www.youtube.com' },
        { stationName: 'Station D3', link: 'https://www.youtube.com' },
        { stationName: 'Station D4', link: 'https://www.youtube.com' },
      ]
    },
  ];

  return { lines };
};
