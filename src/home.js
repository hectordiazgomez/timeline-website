import React, { useState } from 'react';
import { Plus, Share2, ChevronDown, Grid, Calendar } from 'lucide-react';

const Home = () => {
    const [timelines, setTimelines] = useState([]);
    const [view, setView] = useState('grid'); // 'grid' or 'list'

    // Generate a 90-year grid (1080 months)
    const generateEmptyGrid = () => {
        const years = 90;
        const monthsPerYear = 12;
        return Array(years).fill(null).map(() => Array(monthsPerYear).fill(null));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Lifeline</h1>
                        <div className="flex items-center space-x-4">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Timeline
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-500">
                                <Grid className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Popular
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Recent
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-600">
                            <Calendar className="h-5 w-5" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-600">
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sample Timeline Preview */}
                    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">My Life Journey</h3>
                                <p className="text-sm text-gray-500">90 years</p>
                            </div>
                            <button className="p-1 text-gray-400 hover:text-gray-500">
                                <Share2 className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-12 gap-0.5">
                            {Array(48).fill(null).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="aspect-square bg-gray-100 rounded-sm"
                                />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last updated 2d ago</span>
                            <button className="text-sm text-blue-600 hover:text-blue-700">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;