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

USING_SOURCE_PATH = "./js/";

_MATNR = localStorage.getItem("matnr");
_CURRENT_DAY = localStorage.getItem("currentDay");

_TIMETABLE = sessionStorage.getItem("timetable");

using("model/TimeTable");

//==============================================================================
// ENTRY POINT

$(document).ready(function() {
    setTimeout(main, 200);
});

function main()
{
    //t = new TimeTable(863325);
    //t.loadIcs();
    
    $(document).on("swipeleft", "#dayView", function() {
        $.mobile.changePage("#dayView2", { transition: "slide" });
        $.mobile.changePage("#dayView", { transition: "none" });
    });
    $(document).on("swiperight", "#dayView", function() {
        $.mobile.changePage("#dayView2", { transition: "slide", reverse: true });
        $.mobile.changePage("#dayView", { transition: "none" });
    });
}
