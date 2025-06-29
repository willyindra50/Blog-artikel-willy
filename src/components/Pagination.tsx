'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const createPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const showRange = 2; // jumlah halaman kiri-kanan currentPage

      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - showRange);
      const end = Math.min(totalPages - 1, currentPage + showRange);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='flex justify-center items-center gap-2 mt-10'>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded text-sm text-gray-700 disabled:text-gray-400 hover:bg-gray-100'
      >
        &lt; Previous
      </button>

      {createPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && setCurrentPage(page)}
          disabled={page === '...'}
          className={`w-8 h-8 text-sm rounded-full ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          } ${page === '...' ? 'cursor-default text-gray-400' : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 rounded text-sm text-gray-700 disabled:text-gray-400 hover:bg-gray-100'
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
