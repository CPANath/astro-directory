import { useEffect, useState } from 'react';
import { Button } from "./ui/button";

interface Props {
  tags: Array<[string, number]>;
  initialRating: string | null;
  initialStatus: string[];
}

export default function FiltersSidebar({ tags, initialRating, initialStatus }: Props) {
  const [currentRating, setCurrentRating] = useState<string | null>(initialRating);
  const [currentStatus, setCurrentStatus] = useState<string[]>(initialStatus);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.submit();
  };


  return (
    <div id="filters-form" className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6 animate-fade-up shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5CEBA1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </h2>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {tags.slice(0, 10).map(([tag, count]) => (
            <div key={tag} className="flex items-center justify-between">
              <a href={`/category/${tag}`} className="text-gray-600 hover:text-[#5CEBA1] flex items-center group transition-all duration-300 hover:translate-x-1">
                <span className="w-1 h-1 rounded-full bg-[#5CEBA1]/0 group-hover:bg-[#5CEBA1]/50 mr-2 transition-all duration-300"></span>
                <span className="text-sm">{tag}</span>
              </a>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full group-hover:bg-[#5CEBA1]/5 group-hover:text-[#5CEBA1] transition-colors duration-300">{count}</span>
            </div>
          ))}
          {tags.length > 10 && (
            <a href="/categories" className="text-[#5CEBA1] text-sm hover:underline mt-2 inline-block">
              View all categories
            </a>
          )}
        </div>
      </div>
      
      <form method="get" onSubmit={handleSubmit}>
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
                    setCurrentStatus(newStatus);
                    e.currentTarget.form?.submit();
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
            {/* Rating options */}
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
                    onChange={() => setCurrentRating(rating.toString())}
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
      </form>
    </div>
  );
}
