'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

function Page() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/users`);
                setUsers(response.data.data);
            } catch (err) {
                setError("Failed to fetch users");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Show modal for delete confirmation
    const handleShowModal = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    // Handle user deletion
    const confirmDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/users/${userToDelete._id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id));
        } catch (err) {
            setError("Failed to delete user");
            console.error(err);
        } finally {
            setShowModal(false);
            setUserToDelete(null);
        }
    };

    // Pagination logic
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPagination = () => {
        const paginationItems = [];

        // Always show the first page
        paginationItems.push(
            <li
                key={1}
                className={`flex items-center justify-center px-4 py-2 rounded-md cursor-pointer ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                onClick={() => handlePageChange(1)}
            >
                1
            </li>
        );

        // Show "..." if currentPage > 3
        if (currentPage > 3) {
            paginationItems.push(
                <li key="start-ellipsis" className="flex items-center justify-center px-2 text-gray-600">
                    ...
                </li>
            );
        }

        // Show the previous, current, and next pages around the current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
            paginationItems.push(
                <li
                    key={i}
                    className={`flex items-center justify-center px-4 py-2 rounded-md cursor-pointer ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </li>
            );
        }

        // Show "..." before the last page if there are more than 3 pages after the current page
        if (currentPage < totalPages - 2) {
            paginationItems.push(
                <li key="end-ellipsis" className="flex items-center justify-center px-2 text-gray-600">
                    ...
                </li>
            );
        }

        // Always show the last page
        if (totalPages > 1) {
            paginationItems.push(
                <li
                    key={totalPages}
                    className={`flex items-center justify-center px-4 py-2 rounded-md cursor-pointer ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </li>
            );
        }

        return paginationItems;
    };

    if (isLoading) {
        return <p className="text-center">Loading users...</p>;
    }

    return (
        <>
            <h1 className="text-4xl font-semibold text-center">Users List</h1>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="flex flex-col justify-center overflow-x-auto w-[60vw] mx-auto mt-4">
                <table className="bg-white border border-gray-200">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="p-4 text-sm font-medium text-left text-white">Name</th>
                            <th className="p-4 text-sm font-medium text-left text-white">Email</th>
                            <th className="p-4 text-sm font-medium text-left text-white">Role</th>
                            <th className="p-4 text-sm font-medium text-left text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <tr key={user._id} className="even:bg-blue-50">
                                    <td className="p-4 text-sm text-black">{user.name}</td>
                                    <td className="p-4 text-sm text-black">{user.email}</td>
                                    <td className="p-4 text-sm text-black">{user.role}</td>
                                    <td className="p-4">
                                        <button
                                            className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-700"
                                            onClick={() => handleShowModal(user)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center border">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center my-4">
                <ul className="flex space-x-2">
                    <li
                        className={`flex items-center justify-center w-9 h-9 rounded-md cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-gray-200 text-gray-600"
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Prev
                    </li>
                    {renderPagination()}
                    <li
                        className={`flex items-center justify-center w-9 h-9 rounded-md cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-gray-200 text-gray-600"
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </li>
                </ul>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                        <svg
                            onClick={() => setShowModal(false)}
                            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                            viewBox="0 0 320.591 320.591"
                        >
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            ></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            ></path>
                        </svg>
                        <div className="my-4 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline w-14 fill-red-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                />
                                <path
                                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                />
                            </svg>
                            <h4 className="mt-4 text-base font-semibold text-gray-800">
                                Are you sure you want to delete it?
                            </h4>
                            <div className="mt-8 space-x-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className={`px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700`}
                                >
                                  Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Page;
