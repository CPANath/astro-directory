import { useState, useEffect } from 'react';

interface Props {
  initialItems: any[];
  initialStatus: string[];
  initialRating: string | null;
  onFilterChange: (items: any[]) => void;
}

export default function DirectoryFilter({ 
  initialItems, 
  initialStatus, 
  initialRating,
  onFilterChange 
}: Props) {
  const [items] = useState(initialItems);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const filterItems = (statusFilter: string[] = [], ratingFilter: string | null = null) => {
    return items.filter(entry => {
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
  };

  const updateURL = (params: Record<string, string | string[]>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.delete(key);
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, v));
      } else if (value) {
        url.searchParams.set(key, value);
      }
    });
    window.history.pushState({}, '', url);
  };

  const handleStatusChange = (newStatus: string[]) => {
    setCurrentStatus(newStatus);
    const filtered = filterItems(newStatus, currentRating);
    onFilterChange(filtered);
    updateURL({ status: newStatus });
  };

  const handleRatingChange = (newRating: string | null) => {
    setCurrentRating(newRating);
    const filtered = filterItems(currentStatus, newRating);
    onFilterChange(filtered);
    if (newRating) {
      updateURL({ rating: newRating });
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('rating');
      window.history.pushState({}, '', url);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Status</h3>
        <div className="space-y-2">
          {['featured', 'official', 'new'].map(status => (
            <label key={status} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                name="status"
                value={status}
                checked={currentStatus.includes(status)}
                onChange={(e) => {
                  const newStatus = e.target.checked
                    ? [...currentStatus, status]
                    : currentStatus.filter(s => s !== status);
                  handleStatusChange(newStatus);
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
            const isSelected = currentRating === rating.toString();
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
                  onChange={() => {
                    const newRating = rating.toString();
                    handleRatingChange(newRating);
                  }}
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
  );
}
