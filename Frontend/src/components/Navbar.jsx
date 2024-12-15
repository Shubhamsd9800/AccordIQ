import React, { useState, useEffect } from 'react';
import { BellIcon, CheckCircleIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Photo from "../images/photo.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchContracts } from "../App/Feature/contractsSlice" // Import your fetchContracts async thunk

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Fetch contracts from the Redux store
    const dispatch = useDispatch();
    const { contracts, loading, error } = useSelector((state) => state.contracts);

    // Fetch contracts when the component mounts
    useEffect(() => {
        if (contracts.length === 0) {
            dispatch(fetchContracts());
        }
    }, [dispatch, contracts.length]);

    // Filter contracts based on search query
    const filteredContracts = contracts.filter(contract =>
        contract.name.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming 'name' is the field for contract name
    );

    return (
        <nav className="px-16 py-2">
            <div className="flex items-center justify-between">
                {/* Search input - visible on all screens */}
                <div className="relative flex-grow max-w-md md:max-w-xs">
                    <input
                        type="search"
                        placeholder="Search contracts..."
                        className="w-full pl-10 pr-8 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Show suggestions dropdown if search query is not empty */}
                    {searchQuery && filteredContracts.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
                            {filteredContracts.map((contract, index) => (
                                <div key={index} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                    {contract.name} 
                                </div>
                            ))}
                        </div>
                    )}

                    {loading && <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10">Loading...</div>}
                    {error && <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10 text-red-500">Error: {error}</div>}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-lg px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Upload</button>
                    <BellIcon className="w-6 h-6 text-gray-500" />
                    <CheckCircleIcon className="w-6 h-6 text-gray-500" />
                    <img src={Photo} alt="User" className="w-8 h-8 rounded-full" />
                </div>

                <div className="md:hidden flex items-center space-x-2">
                    <img src={Photo} alt="User" className="w-8 h-8 rounded-full" />
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-1 text-gray-500"
                    >
                        <span className="sr-only">Open user menu</span>
                        <ChevronDownIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {isDropdownOpen && (
                <div className="mt-2 py-2 bg-white rounded-md shadow-lg md:hidden">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-lg px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+ Upload</button>
                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <BellIcon className="w-5 h-5 mr-2" /> Notifications
                    </button>
                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <CheckCircleIcon className="w-5 h-5 mr-2" /> Tasks
                    </button>
                </div>
            )}

            {isMenuOpen && (
                <div className="mt-2 md:hidden">
                </div>
            )}
        </nav>
    );
}

export default Navbar;
