import { useState, useEffect } from 'react';
import type { CollectionEntry } from 'astro:content';

interface Props {
  initialItems: CollectionEntry<'directory'>[];
  initialStatus: string[];
  initialRating: string | null;
}

export default function DirectoryFilters({ initialItems, initialStatus, initialRating }: Props) {
  const [items, setItems] = useState(initialItems);
  const [statusFilters, setStatusFilters] = useState(initialStatus);
  const [ratingFilter, setRatingFilter] = useState(initialRating);

  // Filter items based on current filters
  const filterItems = () => {
    return initialItems.filter(item => {
      // Apply status filters if any are selected
      if (statusFilters.length > 0) {
        const matchesStatus = statusFilters.some(status => {
          switch (status) {
            case 'featured':
              return item.data.featured;
            case 'official':
              return item.data.official;
            case 'new':
              return item.data.new;
            default:
              return false;
          }
        });
        if (!matchesStatus) return false;
      }

      // Apply rating filter if selected
      if (ratingFilter) {
        const minRating = parseInt(ratingFilter);
        if ((item.data.rating || 0) < minRating) return false;
      }

      return true;
    });
  };

  // Update URL when filters change
  const updateURL = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('status');
    url.searchParams.delete('rating');

    statusFilters.forEach(status => {
      url.searchParams.append('status', status);
    });

    if (ratingFilter) {
      url.searchParams.set('rating', ratingFilter);
    }

    window.history.pushState({}, '', url);
  };

  // Update filtered items and URL when filters change
  useEffect(() => {
    const filtered = filterItems();
    setItems(filtered);
    updateURL();
  }, [statusFilters, ratingFilter]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-lg p-6 sticky top-6 space-y-6">
        <div>
        <h3 className="font-medium text-gray-900 mb-3">Status</h3>
        <div className="space-y-2">
          {['featured', 'official', 'new'].map(status => (
            <label key={status} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                name="status"
                value={status}
                checked={statusFilters.includes(status)}
                onChange={(e) => {
                  const newStatus = e.target.checked
                    ? [...statusFilters, status]
                    : statusFilters.filter(s => s !== status);
                  setStatusFilters(newStatus);
                }}
                className="rounded text-[#5CEBA1] focus:ring-[#5CEBA1] transition-all duration-300 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-[#5CEBA1] transition-colors duration-300 capitalize">
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2].map(rating => {
            const isSelected = ratingFilter === rating.toString();
            return (
              <label
                key={rating}
                className={`w-full flex items-center p-3 rounded-md transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#5CEBA1]/10 text-[#5CEBA1] ring-1 ring-[#5CEBA1]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={isSelected}
                  onChange={() => setRatingFilter(rating.toString())}
                  className="sr-only"
                />
                <div className="flex items-center w-full">
                  <span className="flex">
                    {Array(rating).fill(0).map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {Array(5 - rating).fill(0).map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </span>
                  <span className="ml-3 text-sm">{rating === 5 ? '5 stars' : `${rating} stars & up`}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      </div>

      <div className="w-full md:w-3/4 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 text-sm">
            Showing <span className="font-medium">{items.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5CEBA1]">
              <option>Most Relevant</option>
              <option>Newest First</option>
              <option>Highest Rated</option>
              <option>Name (A-Z)</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 directory-grid">
          {items.map(item => {
            const id = item.id.replace(/\.md$/, '');
            return (
              <div key={id} className="card group relative overflow-hidden animate-fade-up bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-[#5CEBA1]/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.data.logo} alt={item.data.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {item.data.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#5CEBA1]/10 text-[#5CEBA1]">
                          Featured
                        </span>
                      )}
                      {item.data.official && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Official
                        </span>
                      )}
                      {item.data.new && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          New
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 truncate">{item.data.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">by {item.data.author}</p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{item.data.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        {Array(item.data.rating || 0).fill(0).map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.data.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 hover:bg-[#5CEBA1]/10 hover:text-[#5CEBA1] transition-colors duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <a href={`/item/${id}`} className="absolute inset-0 z-10"></a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
