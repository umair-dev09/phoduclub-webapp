

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const CustomCalendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <div className="relative">
            {/* Date Display */}
            <div className="text-lg font-semibold mb-2">
                {selectedDate ? format(selectedDate, 'dd-MM-yyyy') : 'Select Date'}
            </div>

            {/* Date Picker */}
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                className="bg-white p-4 rounded-lg shadow-lg"
                calendarClassName="custom-calendar"
                dayClassName={(date) =>
                    format(date, 'd') === format(new Date(), 'd')
                        ? 'bg-purple-500 text-white rounded-full'
                        : ''
                }
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={decreaseMonth}
                            className="text-purple-500 hover:text-purple-700"
                        >
                            {'<'}
                        </button>
                        <div className="text-lg font-semibold">
                            {format(date, 'MMMM yyyy')}
                        </div>
                        <button
                            onClick={increaseMonth}
                            className="text-purple-500 hover:text-purple-700"
                        >
                            {'>'}
                        </button>
                    </div>
                )}
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                    Cancel
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                    Apply
                </button>
            </div>
        </div>
    );
};

export default CustomCalendar;

