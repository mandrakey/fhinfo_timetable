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

_TIMETABLE = null;
_MATNR = null;

_WEEKDAYS = [
    { name: "Montag", short: "MO" },
    { name: "Dienstag", short: "TU" },
    { name: "Mittwoch", short: "WE" },
    { name: "Donnerstag", short: "TH" },
    { name: "Freitag", short: "FR" },
    { name: "Samstag", short: "SA" },
    { name: "Sonntag", short: "SU" },
];
_CURRENT_DAY = _WEEKDAYS[0];

//==============================================================================
// ENTRY POINT

$(document).ready(function() {
    setTimeout(main, 300);
});

function main()
{
    $.mobile.changePage("#login", { transition: "none" });
    
    d = new Date();
    _CURRENT_DAY = _WEEKDAYS[d.getDay() - 1];
    
    /* $(document).on("swipeleft", "#dayView", function() {
        $.mobile.changePage("#dayView2", { transition: "slide" });
        $.mobile.changePage("#dayView", { transition: "none" });
    });
    $(document).on("swiperight", "#dayView", function() {
        $.mobile.changePage("#dayView2", { transition: "slide", reverse: true });
        $.mobile.changePage("#dayView", { transition: "none" });
    }); */
}
