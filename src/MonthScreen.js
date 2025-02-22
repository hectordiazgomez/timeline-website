import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const MonthScreen = ({ square, updateSquareMonths, colorSwatches }) => {
    const months = Array.from({ length: 12 }, (_, i) => i); // month indices 0-11
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [labelText, setLabelText] = useState('');
    const [labelColor, setLabelColor] = useState(colorSwatches[0].value);
    const [activitiesText, setActivitiesText] = useState('');

    const toggleSelectMonth = (monthIndex) => {
        setSelectedMonths(prev =>
            prev.includes(monthIndex)
                ? prev.filter((m) => m !== monthIndex)
                : [...prev, monthIndex]
        );
    };

    const openModal = () => {
        if (selectedMonths.length > 0) {
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setLabelText('');
        setLabelColor(colorSwatches[0].value);
        setActivitiesText('');
        setSelectedMonths([]);
        setModalOpen(false);
    };

    const saveLabel = () => {
        // Create an updated copy of the months array for the square.
        const updatedMonths = [...square.months];
        selectedMonths.forEach((mIndex) => {
            updatedMonths[mIndex] = {
                label: labelText,
                color: labelColor,
                activities: activitiesText.split(',').map(s => s.trim()).filter(Boolean),
            };
        });
        updateSquareMonths(updatedMonths);
    };

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="flex-none p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Select Month(s)</h2>
                <p className="text-sm text-gray-400">
                    {square.label
                        ? 'This square is labeled. Update its month details below.'
                        : 'This square is not yet labeled. Select month(s) to add details.'}
                </p>
            </div>

            {/* Month Grid */}
            <div className="flex-1 p-4">
                <div className="grid grid-cols-4 gap-4">
                    {months.map((mIndex) => {
                        // Show month name or number
                        const monthData = square.months[mIndex];
                        const isSelected = selectedMonths.includes(mIndex);
                        return (
                            <div
                                key={mIndex}
                                onClick={() => toggleSelectMonth(mIndex)}
                                className={`p-4 border border-gray-700 cursor-pointer text-center
                  ${monthData.color ? monthData.color : 'bg-gray-800'}
                  ${isSelected ? 'border-white' : ''}
                `}
                            >
                                {new Date(0, mIndex).toLocaleString('default', { month: 'short' })}
                                {monthData.label && (
                                    <div className="text-xs mt-1">{monthData.label}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer with Add Label Button */}
            <div className="flex-none p-4 border-t border-gray-700 flex justify-end">
                <button
                    onClick={openModal}
                    className="flex items-center bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    <span>Add Label</span>
                </button>
            </div>

            {/* Modal for entering label & activities */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded shadow-lg w-80 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg mb-4">Add Details</h3>
                        <input
                            type="text"
                            placeholder="Label text"
                            value={labelText}
                            onChange={(e) => setLabelText(e.target.value)}
                            className="w-full mb-4 bg-gray-700 p-2 rounded outline-none"
                        />
                        <textarea
                            placeholder="Activities (comma separated)"
                            value={activitiesText}
                            onChange={(e) => setActivitiesText(e.target.value)}
                            className="w-full mb-4 bg-gray-700 p-2 rounded outline-none"
                        />
                        <div className="mb-4">
                            <p className="mb-2 text-sm text-gray-300">Pick a color:</p>
                            <div className="flex gap-2">
                                {colorSwatches.map((swatch) => (
                                    <button
                                        key={swatch.name}
                                        onClick={() => setLabelColor(swatch.value)}
                                        className={`w-6 h-6 rounded-full border-2 ${labelColor === swatch.value ? 'border-white' : 'border-transparent'
                                            } ${swatch.value}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeModal}
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
};

// Simple Plus icon component (using lucide-react) to match the styling.
const PlusIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
);

export default MonthScreen;
