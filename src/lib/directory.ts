import { getCollection } from 'astro:content';

export async function getFilteredDirectory(statusFilter: string[] = [], ratingFilter: string | null = null) {
  return await getCollection('directory', (entry) => {
    // Apply status filters if any are selected
    if (statusFilter.length > 0) {
      const matchesStatus = statusFilter.some(status => {
        switch (status) {
          case 'featured':
            return entry.data.featured === true;
          case 'official':
            return entry.data.official === true;
          case 'new':
            return entry.data.new === true;
          default:
            return false;
        }
      });
      if (!matchesStatus) return false;
    }

    // Apply rating filter if selected
    if (ratingFilter) {
      const minRating = parseInt(ratingFilter);
      if ((entry.data.rating || 0) < minRating) return false;
    }

    return true;
  });
}
