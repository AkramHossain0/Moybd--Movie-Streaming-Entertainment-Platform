'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function UpdateBtn({ movieId }) {
  const router = useRouter();

  const handleUpdate = () => {
    if (router) {
      // Navigate to the update page for the movie
      router.push(`/admin/update/${movieId}`);
    }
  };

  return (
    <button
      onClick={handleUpdate}
      className="px-3 py-1 mt-2 text-white bg-green-600 rounded-md hover:bg-green-500"
    >
      Update Movie
    </button>
  );
}

export default UpdateBtn;
