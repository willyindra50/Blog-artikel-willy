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

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
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
