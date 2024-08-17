import React from 'react';
import { useRouter } from 'next/router';
import SubwayScene from '@/components/SubwayScene';
import Navbar from '@/components/Navbar';

const StationPage = () => {
  const router = useRouter();
  const { station } = router.query;

  return (
    <div>
      <Navbar />
      <h1>{station}</h1>
      <SubwayScene />
    </div>
  );
};

export default StationPage;
