import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers";
import Doward from "../images/doward.png";
import Month from "../images/Month.png";

const CalenderExpire = () => {
  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-md p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h2 className="text-xl font-medium mb-4 sm:mb-0">Calendar</h2>
        <div className="flex space-x-3">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white text-sm text-gray-900 rounded-full group-hover:bg-gray-100 flex items-center gap-2">
              MonthlyHello <img src={Doward} className="w-5" alt="" />
            </span>
          </button>

          <div className="rounded-full h-full p-2 bg-gray-400">
            <img src={Month} alt="" className="w-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Calendar Section */}
        <div className="flex justify-center w-full sm:w-auto">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={null}
              onChange={() => {}}
              sx={{
                width: { xs: "100%", sm: "70%", md: "50%" },
                maxWidth: "400px",
                height: "300px",
                border: "2px solid #d3d3d3",
                borderRadius: "16px",
                padding: "8px",

                ".MuiPickersCalendarHeader-root": {
                  height: "40px",
                  fontSize: "0.875rem",
                },
                ".MuiDayCalendar-root": {
                  minHeight: "200px",
                },
                ".MuiPickersDay-root": {
                  width: "32px",
                  height: "32px",
                  fontSize: "0.75rem",
                },
              }}
              renderDay={(day, selectedDates, pickersDayProps) => {
                const isToday = day.isSame(new Date(), "day");
                return (
                  <PickersDay
                    {...pickersDayProps}
                    sx={isToday ? { backgroundColor: "yellow" } : {}}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </div>

        {/* Upcoming Events Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Upcoming Expirations</h2>
          </div>

          {/* Scrollable List */}
          <div className="h-64 overflow-y-auto space-y-2 pr-2 border-b-2 border-gray-300">
            {[
              { month: "January 2024", count: 1 },
              { month: "March 2024", count: 5 },
              { month: "July 2024", count: 7 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-sm font-medium">{item.month}</span>
                <span className="bg-teal-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {item.count}
                </span>
              </div>
            ))}
            <h2 className="text-[1rem] font-normal mt-6">Upcoming Renewals</h2>
            <div className="h-64 overflow-y-auto space-y-2 pr-2">
              {[
                { month: "January 2024", count: 5 },
                { month: "April 2024", count: 8 },
                { month: "August 2024", count: 2 },
                { month: "August 2024", count: 2 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm"
                >
                  <span className="text-sm font-medium">{item.month}</span>
                  <span className="bg-teal-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderExpire;
