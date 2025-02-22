import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Loader } from 'lucide-react';

export default function BirthdayScreen({
    birthDate,
    setBirthDate,
    handleDateConfirm,
    isLoading,
}) {
    const years = Array.from({ length: 121 }, (_, i) => 1900 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const defaultDate = birthDate ? new Date(birthDate) : new Date(2000, 0, 1);

    const [selectedYear, setSelectedYear] = useState(defaultDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(defaultDate.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(defaultDate.getDate());

    useEffect(() => {
        const updatedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
        setBirthDate(updatedDate.toISOString().substring(0, 10));
    }, [selectedYear, selectedMonth, selectedDay, setBirthDate]);

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            {/* Header - Fixed height with flex-none */}
            <div className="flex-none p-4">
                <h2 className="text-xl text-center font-semibold mb-2">Birthday</h2>
                <h2 className="text-xl text-center mb-4">When did your life begin?</h2>
            </div>

            {/* Main content - Scrollable with flex-1 */}
            <div className="flex-1 relative">
                <div className="absolute inset-0 overflow-auto">
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="flex items-center mb-6">
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            <span className="text-sm text-gray-400">Select your date of birth</span>
                        </div>

                        <div className="flex gap-4">
                            {/* Months */}
                            <div className="text-center">
                                <h3 className="mb-2 text-gray-300 text-sm">Month</h3>
                                <div className="h-32 overflow-y-auto border border-gray-700 w-20">
                                    {months.map((month) => (
                                        <div
                                            key={month}
                                            onClick={() => setSelectedMonth(month)}
                                            className={`p-2 cursor-pointer ${month === selectedMonth ? 'bg-gray-800' : ''
                                                }`}
                                        >
                                            {month}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Days */}
                            <div className="text-center">
                                <h3 className="mb-2 text-gray-300 text-sm">Day</h3>
                                <div className="h-32 overflow-y-auto border border-gray-700 w-20">
                                    {days.map((day) => (
                                        <div
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            className={`p-2 cursor-pointer ${day === selectedDay ? 'bg-gray-800' : ''
                                                }`}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Years */}
                            <div className="text-center">
                                <h3 className="mb-2 text-gray-300 text-sm">Year</h3>
                                <div className="h-32 overflow-y-auto border border-gray-700 w-20">
                                    {years.map((year) => (
                                        <div
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            className={`p-2 cursor-pointer ${year === selectedYear ? 'bg-gray-800' : ''
                                                }`}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Fixed height with flex-none */}
            <div className="flex-none p-4 border-t border-gray-700">
                <button
                    onClick={handleDateConfirm}
                    className="w-full py-2 bg-white rounded text-black transition"
                >
                    Continue
                </button>

                {isLoading && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Generating timeline...</span>
                    </div>
                )}
            </div>
        </div>
    );
}