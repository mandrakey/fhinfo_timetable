/*******************************************************************************
 * Copyright (C) 2013 Maurice Bleuel <mandrakey@lavabit.com>
 * 
 * This file is part of FHInfo Timetable.
 * 
 * FHInfo Timetable is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the Free 
 * Software Foundation, either version 3 of the license, or (at your option) 
 * any later version.
 * 
 * FHInfo Timetable is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTIBILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General 
 * Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License 
 * along with FHInfo Timetable. If not, see
 * http://www.gnu.org/licenses/.
 ******************************************************************************/

//==============================================================================
// PROGRAM GLOBALS

/** Global timetable instance holder. */
_TIMETABLE = null;

/** Global Matrikelnummer holder. */
_MATNR = localStorage.matnr;

/** Contains all weekdays, their text and short names for ICS files. */
_WEEKDAYS = [
    { name: "Montag", short: "MO" },
    { name: "Dienstag", short: "TU" },
    { name: "Mittwoch", short: "WE" },
    { name: "Donnerstag", short: "TH" },
    { name: "Freitag", short: "FR" },
    { name: "Samstag", short: "SA" },
    { name: "Sonntag", short: "SU" },
];

/** Contains the current day (index for _WEEKDAYS). */
_CURRENT_DAY = 0;

//==============================================================================
// ENTRY POINT

$(document).ready(function() {
    setTimeout(main, 300);
});

/**
 * Program entry point.
 * Shows login page, gets current date, loads data from local and session 
 * storage and prepares events to be handled.
 */
function main()
{
    $.mobile.changePage("#login", { transition: "none" });
    
    d = new Date();
    _CURRENT_DAY = d.getDay() - 1;
    
    if (_MATNR != null)
        $("#loginForm_matnr")[0].value = _MATNR;
    
    $(document).on("swipeleft", "#pDayView", function() {
        if (_CURRENT_DAY < 5)
            pDayView_displayTimetable(++_CURRENT_DAY);
    });
    $(document).on("swiperight", "#pDayView", function() {
        if (_CURRENT_DAY > 0)
            pDayView_displayTimetable(--_CURRENT_DAY);
    });
}
