import moment from "moment";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { Context } from '../../context/contextApi';

export default function GetCustomToolbar(toolbar) {
    const { toolbarDate, setToolbarDate, view, setView } = useContext(Context)
    // console.log(toolbar);
    const [dropdown, setDropdown] = useState(false)

    const goToDayView = () => {
        setDropdown(false)
        toolbar.onView('day');
        setView('day')
    };

    const goToWeekView = () => {
        setDropdown(false)
        toolbar.onView('week');
        setView('week')
    };

    const goToMonthView = () => {
        setDropdown(false)
        toolbar.onView('month');
        setView('month')
        setTimeout(() => {
            // Implement setOffRangeDateStyle() logic here
        }, 100);
    };

    const goToBack = () => {
        const mDate = toolbar.date;
        let newDate;

        if (view === "month") {
            newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
        } else if (view === "week") {
            newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth(),
                mDate.getDate() - 7,
                1
            );
        } else {
            newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth(),
                mDate.getDate() - 1,
                1
            );
        }

        toolbar.onNavigate("prev", newDate);
        setToolbarDate(newDate);
        // Implement getCalendarEvents(newDate) logic here
    };

    const goToNext = () => {
        let mDate = toolbar.date;
        let newDate;
        if (view === "month") {
            newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
        } else if (view === "week") {
            newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth(),
                mDate.getDate() + 7,
                1
            );
        } else {
            newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth(),
                mDate.getDate() + 1,
                1
            );
        }
        toolbar.onNavigate("next", newDate);
        console.log(newDate);
        setToolbarDate(newDate)
    };

    const goToToday = () => {
        const now = new Date();
        setToolbarDate(now)
        toolbar.onNavigate('current', now);
        setView('day')
        toolbar.onView('day')
    }

    useEffect(() => {
        setView(toolbar.view)
        setToolbarDate(toolbar.date)
    }, [toolbar.view]);

    return (
        <div className="toolbar-container mb-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 items-center justify-between">

            {/* <div onClick={goToToday} className="today px-5 py-2 hover:bg-black hover:text-white border-2 cursor-pointer border-black rounded-lg">Today</div> */}

            <div className="navigation space-x-4 text-4xl flex items-center justify-between w-full  sm:w-3/5 flex-row">

                <div onClick={goToBack} className="back cursor-pointer ">
                    <MdNavigateBefore />
                </div>

                {view === "day" && view !== 'month' && view !== 'week'
                    ? new Date().toDateString() === toolbar.date.toDateString()
                        ? <div className="date text-blue-600 font-bold "> {toolbar.label} </div>
                        : <div className="date font-bold "> {toolbar.label} </div>
                    : <div className="date font-bold "> {toolbar.label} </div>
                }

                <div onClick={goToNext} className="next cursor-pointer ">
                    <MdNavigateNext />
                </div>

            </div>

            <div className="flex flex-row space-x-3">

                <div onClick={goToToday} className="today text-lg px-5 py-2 hover:bg-black hover:text-white border-2 cursor-pointer border-black rounded-lg">Today</div>

                <div className="views relative">
                    <button onClick={() => setDropdown(!dropdown)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-black hover:bg-black font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-black dark:focus:ring-black" type="button">{view.charAt(0).toUpperCase() + view.slice(1)}

                        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>

                    </button>

                    <div id="dropdown" class={`z-10 bg-white absolute ${!dropdown ? 'hidden' : ''} top-14    right-0 transition-all divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul class="py-2 text-lg text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <div onClick={goToMonthView} className={` px-5 py-2 cursor-pointer    hover:bg-slate-100`}>Month</div>
                            </li>
                            <li>
                                <div onClick={goToWeekView} className={`px-5 py-2  cursor-pointer hover:bg-slate-100 `}>Week</div>
                            </li>
                            <li>
                                <div onClick={goToDayView} className={`px-5 py-2  cursor-pointer  hover:bg-slate-100`}>Day</div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );
};