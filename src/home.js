import React, { useState, useEffect } from 'react';
import BirthdayScreen from './calendar';
import MonthScreen from './MonthScreen';
import {
    Calendar as CalendarIcon,
    Loader,
    Share2,
    Plus,
    X,
    Check,
    ZoomIn,
    ZoomOut
} from 'lucide-react';

const COLOR_SWATCHES = [
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Yellow', value: 'bg-yellow-400' },
    { name: 'Red', value: 'bg-red-500' },
];

const Home = () => {
    const [view, setView] = useState('home');
    const [birthDate, setBirthDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [zoomLevel, setZoomLevel] = useState('90y');
    const [timelineData, setTimelineData] = useState([]);
    const [selectedSquares, setSelectedSquares] = useState([]);
    // For month screen – we save the current timeline square being drilled into
    const [currentSquare, setCurrentSquare] = useState(null);

    useEffect(() => {
        if (timelineData.length === 0) {
            // Initialize 1080 squares. Each square now may include an optional "months" array.
            const squares = Array.from({ length: 1080 }, (_, idx) => ({
                id: idx,
                label: '',
                color: '',
                // months will be an array of 12 objects (one for each month)
                months: Array.from({ length: 12 }, () => ({
                    label: '',
                    color: '',
                    activities: [],
                })),
            }));
            setTimelineData(squares);
        }
    }, [timelineData]);

    // ----- HANDLERS -----

    const handleStart = () => {
        setView('date-picker');
    };

    const handleDateConfirm = () => {
        if (!birthDate) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setView('timeline');
        }, 1000);
    };

    // Instead of opening a modal immediately, clicking a square moves to the MonthScreen.
    const handleTimelineSquareClick = (squareId) => {
        const square = timelineData.find(s => s.id === squareId);
        if (!square) return;
        setCurrentSquare(square);
        setView('month-picker');
    };

    // Update the timelineData for a given square once the month label(s) are set.
    const updateSquareMonths = (updatedMonths) => {
        setTimelineData(prev =>
            prev.map((square) =>
                square.id === currentSquare.id ? { ...square, months: updatedMonths } : square
            )
        );
        // Return to timeline view.
        setCurrentSquare(null);
        setView('timeline');
    };

    const handleZoomIn = () => {
        if (zoomLevel === '90y') setZoomLevel('10y');
        else if (zoomLevel === '10y') setZoomLevel('1y');
        else if (zoomLevel === '1y') setZoomLevel('1m');
    };

    const handleZoomOut = () => {
        if (zoomLevel === '1m') setZoomLevel('1y');
        else if (zoomLevel === '1y') setZoomLevel('10y');
        else if (zoomLevel === '10y') setZoomLevel('90y');
    };

    const handleShare = () => {
        alert('Share link copied to clipboard! (mock)');
    };

    if (view === 'home') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
                <h1 className="text-3xl font-bold mb-4">Life Timeline</h1>
                <p className="max-w-md text-center mb-8">
                    Visualize and share your life’s journey in a simple, interactive grid.
                </p>
                <button
                    onClick={handleStart}
                    className="px-6 py-2 rounded bg-white text-black transition"
                >
                    Get Started
                </button>
            </div>
        );
    }

    if (view === 'date-picker') {
        return (
            <BirthdayScreen
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                handleDateConfirm={handleDateConfirm}
                isLoading={isLoading}
            />
        );
    }

    if (view === 'month-picker' && currentSquare !== null) {
        return (
            <MonthScreen
                square={currentSquare}
                updateSquareMonths={updateSquareMonths}
                colorSwatches={COLOR_SWATCHES}
            />
        );
    }

    if (view === 'timeline') {
        return (
            <div className="h-screen bg-black text-white flex flex-col">
                {/* Header */}
                <div className="flex-none flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold">Timeline (90 years)</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={handleZoomOut}
                            className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded hover:bg-gray-700"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded hover:bg-gray-700"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded hover:bg-gray-700"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 relative">
                    <div className="absolute inset-0 overflow-auto p-4">
                        <TimelineGrid
                            timelineData={timelineData}
                            zoomLevel={zoomLevel}
                            onSquareClick={handleTimelineSquareClick}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-none p-4 border-t border-gray-700 flex justify-end">
                    {/* Optionally keep other timeline actions here */}
                    <button
                        onClick={handleShare}
                        className="flex items-center bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        <span>Share Timeline</span>
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

function TimelineGrid({ timelineData, zoomLevel, onSquareClick }) {
    let squaresPerRow = 10;
    return (
        <div
            className="grid gap-1"
            style={{
                gridTemplateColumns: `repeat(${squaresPerRow}, minmax(0, 1fr))`,
            }}
        >
            {timelineData.slice(0, 80).map((square) => {
                // Render each square. (A square may be colored or not.)
                return (
                    <div
                        key={square.id}
                        data-square-id={square.id}
                        onClick={() => onSquareClick(square.id)}
                        className={`w-8 h-8 md:w-10 md:h-10 border border-gray-700 cursor-pointer
              ${square.color}
            `}
                        title={square.label ? square.label : `Square #${square.id}`}
                    />
                );
            })}
        </div>
    );
}

export default Home;
