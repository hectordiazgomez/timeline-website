import React, { useState, useEffect } from 'react';
import BirthdayScreen from './calendar';
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
    const [labelModalOpen, setLabelModalOpen] = useState(false);
    const [labelText, setLabelText] = useState('');
    const [labelColor, setLabelColor] = useState(COLOR_SWATCHES[0].value);

    useEffect(() => {
        if (timelineData.length === 0) {
            const squares = Array.from({ length: 1080 }, (_, idx) => ({
                id: idx,
                label: '',
                color: '',
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
        // Simulate loading...
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setView('timeline');
        }, 1000);
    };

    const handleSquareClick = (squareId) => {
        // Toggle selection of a square (allow multi-select)
        setSelectedSquares((prev) => {
            if (prev.includes(squareId)) {
                return prev.filter((id) => id !== squareId);
            }
            return [...prev, squareId];
        });
    };

    const openLabelModal = () => {
        if (selectedSquares.length === 0) return;
        setLabelModalOpen(true);
    };

    const closeLabelModal = () => {
        setLabelText('');
        setLabelColor(COLOR_SWATCHES[0].value);
        setLabelModalOpen(false);
        setSelectedSquares([]);
    };

    const saveLabel = () => {
        // Update timeline data with new label/color
        const updated = timelineData.map((square) => {
            if (selectedSquares.includes(square.id)) {
                return {
                    ...square,
                    label: labelText,
                    color: labelColor,
                };
            }
            return square;
        });
        setTimelineData(updated);
        closeLabelModal();
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

    if (view === 'timeline') {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
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

                {/* Grid Container */}
                <div className="flex-1 overflow-auto p-4">
                    <TimelineGrid
                        timelineData={timelineData}
                        zoomLevel={zoomLevel}
                        onSquareClick={handleSquareClick}
                        selectedSquares={selectedSquares}
                    />
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-700 flex justify-end">
                    <button
                        onClick={openLabelModal}
                        className="flex items-center bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        <span>Add Label</span>
                    </button>
                </div>

                {/* Label Modal */}
                {labelModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded shadow-lg w-80 relative">
                            <button
                                onClick={closeLabelModal}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-lg mb-4">Add Label</h3>
                            <input
                                type="text"
                                placeholder="Label text"
                                value={labelText}
                                onChange={(e) => setLabelText(e.target.value)}
                                className="w-full mb-4 bg-gray-700 p-2 rounded outline-none"
                            />
                            <div className="mb-4">
                                <p className="mb-2 text-sm text-gray-300">Pick a color:</p>
                                <div className="flex gap-2">
                                    {COLOR_SWATCHES.map((swatch) => (
                                        <button
                                            key={swatch.name}
                                            onClick={() => setLabelColor(swatch.value)}
                                            className={`w-6 h-6 rounded-full border-2 ${labelColor === swatch.value
                                                    ? 'border-white'
                                                    : 'border-transparent'
                                                } ${swatch.value}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={closeLabelModal}
                                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition flex items-center"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                </button>
                                <button
                                    onClick={saveLabel}
                                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition flex items-center"
                                >
                                    <Check className="w-4 h-4 mr-1" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return null;
}


function TimelineGrid({ timelineData, zoomLevel, onSquareClick, selectedSquares }) {

    let squaresPerRow;
    switch (zoomLevel) {
        case '1m':
            squaresPerRow = 30;
            break;
        case '1y':
            squaresPerRow = 52;
            break;
        case '10y':
            squaresPerRow = 120;
            break;
        case '90y':
        default:
            squaresPerRow = 36;
            break;
    }

    const handleClick = (id) => {
        onSquareClick(id);
    };

    return (
        <div
            className="grid gap-1"
            style={{
                gridTemplateColumns: `repeat(${squaresPerRow}, minmax(0, 1fr))`,
            }}
        >
            {timelineData.map((square) => {
                const isSelected = selectedSquares.includes(square.id);
                return (
                    <div
                        key={square.id}
                        onClick={() => handleClick(square.id)}
                        className={`w-5 h-5 md:w-6 md:h-6 border border-gray-700 cursor-pointer
              ${square.color} 
              ${isSelected ? 'border-white' : ''}
            `}
                        title={square.label ? square.label : `Square #${square.id}`}
                    />
                );
            })}
        </div>
    );
}

export default Home;
