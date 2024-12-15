import React, { useState, useEffect } from 'react';
import { HomeIcon, FolderIcon, ChartBarIcon, DocumentTextIcon, CogIcon, QuestionMarkCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import companyLogo from "../images/company.png";

const menuItems = [
    { icon: HomeIcon, label: 'Home' },
    { icon: FolderIcon, label: 'Repository' },
    { icon: ChartBarIcon, label: 'Analytics' },
    { icon: DocumentTextIcon, label: 'Reports' },
    {
        icon: () => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
            </svg>
        ),
        label: 'Custom',
    },
];

const bottomItems = [
    { icon: QuestionMarkCircleIcon, label: 'Help' },
    { icon: CogIcon, label: 'Settings' },
];

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY) {
                    setShowButton(false);
                } else {
                    setShowButton(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <div className="relative">
            <button
                className={`md:hidden fixed top-4 left-4 z-50 px-2 py-1 rounded-md shadow-md transition-opacity duration-300 ${showButton ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <XMarkIcon className="w-6 h-6 text-blue-500" /> : <Bars3Icon className="w-6 h-6 text-blue-500" />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div className={`
                bg-white w-64 md:w-16 flex-shrink-0 flex flex-col justify-between py-4 border-r
                fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
                <div>
                    <div className="flex justify-center mb-8">
                        <img src={companyLogo} alt="Logo" className="w-10 h-10" />
                    </div>
                    <nav>
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className="flex justify-center p-3 text-gray-500 hover:bg-blue-100 rounded-xl mx-2 mb-2"
                            >
                                <item.icon className="w-6 h-6 text-blue-500" />
                            </a>
                        ))}
                    </nav>
                </div>
                <nav>
                    {bottomItems.map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className="flex items-center p-3 text-gray-500 hover:bg-blue-100 rounded-xl mx-2 mb-2"
                        >
                            <item.icon className="w-6 h-6 text-blue-500" />
                            <span className="ml-3 md:hidden">{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
