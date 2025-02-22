import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Loader } from 'lucide-react';

export default function BirthdayScreen({
    birthDate,
    setBirthDate,
    handleDateConfirm,
    isLoading,
}) {
    // You can adjust these ranges to fit your app’s needs
    const years = Array.from({ length: 121 }, (_, i) => 1900 + i); // 1900–2020
    const months = Array.from({ length: 12 }, (_, i) => i + 1);    // 1–12
    const days = Array.from({ length: 31 }, (_, i) => i + 1);      // 1–31

    // Parse existing birthDate if available; otherwise, default to something
    const defaultDate = birthDate ? new Date(birthDate) : new Date(2000, 0, 1);

    const [selectedYear, setSelectedYear] = useState(defaultDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(defaultDate.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(defaultDate.getDate());

    // Whenever the user changes year/month/day, update the parent state (birthDate)
    useEffect(() => {
        // Construct a valid date from the chosen Y/M/D
        const updatedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
        setBirthDate(updatedDate.toISOString().substring(0, 10));
        // Storing as YYYY-MM-DD string; adjust if you prefer a Date object
    }, [selectedYear, selectedMonth, selectedDay, setBirthDate]);

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* Top Section */}
            <div className="p-4" style={{ flex: '0 0 auto' }}>
                <h2 className="text-xl font-semibold mb-2">Birthday</h2>
                <h2 className="text-xl mb-4">When did your life begin?</h2>
            </div>

            {/* Middle Section: Scrollable Picker */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="flex items-center mb-6">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span className="text-sm text-gray-400">Select your date of birth</span>
                </div>

                <div className="flex gap-4">
                    {/* Months */}
                    <div style={{ textAlign: 'center' }}>
                        <h3 className="mb-2 text-gray-300 text-sm">Month</h3>
                        <div
                            style={{
                                height: '120px',
                                overflowY: 'scroll',
                                border: '1px solid #555',
                                width: '70px',
                            }}
                        >
                            {months.map((month) => (
                                <div
                                    key={month}
                                    onClick={() => setSelectedMonth(month)}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: month === selectedMonth ? '#333' : 'transparent',
                                    }}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Days */}
                    <div style={{ textAlign: 'center' }}>
                        <h3 className="mb-2 text-gray-300 text-sm">Day</h3>
                        <div
                            style={{
                                height: '120px',
                                overflowY: 'scroll',
                                border: '1px solid #555',
                                width: '70px',
                            }}
                        >
                            {days.map((day) => (
                                <div
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: day === selectedDay ? '#333' : 'transparent',
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Years */}
                    <div style={{ textAlign: 'center' }}>
                        <h3 className="mb-2 text-gray-300 text-sm">Year</h3>
                        <div
                            style={{
                                height: '120px',
                                overflowY: 'scroll',
                                border: '1px solid #555',
                                width: '70px',
                            }}
                        >
                            {years.map((year) => (
                                <div
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: year === selectedYear ? '#333' : 'transparent',
                                    }}
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Continue Button & Loader */}
            <div className="p-4" style={{ flex: '0 0 auto' }}>
                <button
                    onClick={handleDateConfirm}
                    className="w-full md:w-auto px-6 py-2 bg-white rounded text-black transition"
                >
                    Continue
                </button>

                {isLoading && (
                    <div className="mt-4 flex items-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Generating timeline...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
