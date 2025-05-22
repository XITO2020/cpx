const NUM_404_IMAGES = 27;

export function getRandomNotFoundImage(): string {
  const randomIndex = Math.floor(Math.random() * NUM_404_IMAGES) + 1;
  return `/404/404-${randomIndex.toString().padStart(2, '0')}.jpg`;
}

export function preloadNotFoundImages(): void {
  if (typeof window !== 'undefined') {
    for (let i = 1; i <= NUM_404_IMAGES; i++) {
      const img = new Image();
      img.src = `/404/404-${i.toString().padStart(2, '0')}.jpg`;
    }
  }
}