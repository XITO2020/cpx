import React from 'react';

const getSearchResults = async (searchTerm: string) => {
    const searchParams = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm, // Correction de la faute de frappe
        gsrlimit: '20',
        prop: 'pageimages|extracts',
        exchars: '100',
        exintro: 'true',
        explaintext: 'true', // Correction de la faute de frappe
        exlimit: 'json',
        origin: '*',
    });

    const response = await fetch(`/api/search?${searchParams.toString()}`);
    return response.json();
};

export default getSearchResults;
