// Auto-import all .jpg files from assets/icons so we can easily map them in UI
// Vite will bundle assets referenced from this manifest.
const modules = import.meta.glob('../assets/icons/*.{jpg,JPG,png,svg}', { eager: true, import: 'default' });

export const allImages = Object.values(modules);

// Lookup by filename (e.g., 'Royco.jpg')
export const imageByFile = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').pop(), url])
);

export function getAsset(fileName) {
  return imageByFile[fileName] || '';
}

// Convenience splits
export const peopleImages = allImages.slice(0, 20);
export const iconImages = allImages.slice(20);

export function getImage(index = 0) {
  if (!allImages.length) return '';
  return allImages[index % allImages.length];
}


