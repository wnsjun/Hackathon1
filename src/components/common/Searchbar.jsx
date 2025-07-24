import { useState } from 'react';

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 w-72"
    >
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow text-sm text-black placeholder-gray-400 bg-transparent outline-none"
      />
      <button
        type="submit"
        className="ml-3 text-sm px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
      >
        검색
      </button>
    </form>
  );
};
