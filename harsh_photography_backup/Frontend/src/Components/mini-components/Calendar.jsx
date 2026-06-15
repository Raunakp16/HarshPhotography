import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Generate years array
const years = Array.from(
  { length: getYear(new Date()) - 1990 + 1 },
  (_, i) => 1990 + i
);

function CalendarSelect({ value, options, onChange, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!selectRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  return (
    <div className={`client-calendar__select ${className}`} ref={selectRef}>
      <button
        type="button"
        className="client-calendar__select-trigger"
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <span>{selectedOption?.label}</span>
        <span className="client-calendar__select-arrow">v</span>
      </button>

      {isOpen && (
        <div className="client-calendar__menu">
          {options.map((option) => (
            <button
              type="button"
              className={`client-calendar__menu-item ${
                option.value === value ? "is-selected" : ""
              }`}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Calendar({ selectedDate, onDateChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      placeholderText="Select Event Date"
      dateFormat="dd-MM-yyyy"
      className="calendar-input"
      calendarClassName="client-calendar"
      popperClassName="client-calendar-popper"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          className="client-calendar__header"
        >
          <button
            type="button"
            className="client-calendar__nav"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>

          <CalendarSelect
            className="client-calendar__select--year"
            value={getYear(date)}
            options={years.map((year) => ({
              label: year,
              value: year,
            }))}
            onChange={changeYear}
          />

          <CalendarSelect
            className="client-calendar__select--month"
            value={getMonth(date)}
            options={MONTHS.map((month, index) => ({
              label: month,
              value: index,
            }))}
            onChange={changeMonth}
          />

          <button
            type="button"
            className="client-calendar__nav"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      )}
    />
  );
}

