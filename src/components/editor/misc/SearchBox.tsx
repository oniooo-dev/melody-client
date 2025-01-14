import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', query);
    };

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
                <div className='relative w-full'>
                    <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search..."
                        className="
                            w-full 
                            pl-10 pr-4 py-2 
                            border border-gray-300 rounded-xl
                        "
                        aria-label="Search"
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchBox;