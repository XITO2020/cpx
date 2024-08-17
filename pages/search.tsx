import CategoryGrid from '@/components/CategoryGrid';
import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Movie, LinkedArticle } from '@/lib/types';

const search = () => {
  const router = useRouter();
  const { genre } = router.query;

  return (
    <div>
      <CategoryGrid genre={genre as string} />
    </div>
  );
};

export default search;