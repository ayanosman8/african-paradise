// Local images for menu items
export const localImages: Record<string, any> = {
  'beef-suugar': require('../../assets/beef-suqaar.jpg'),
  'malawax': require('../../assets/malawax.jpeg'),
};

// Helper to check if item has local image
export function getLocalImage(itemName: string): any | null {
  const key = itemName.toLowerCase().replace(/\s+/g, '-');
  return localImages[key] || null;
}
