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

/**
 * Contains handlers/functions for GUI interaction.
 * @file gui.js
 */

/* *****************************************************************************
 * pLogin
 * ****************************************************************************/
 
/**
 * Handle click on login button on login form.
 */
function loginForm_cmdLogin_click() {
    var matnr = $("#loginForm_matnr")[0].value;
    if (/^[0-9]{6}$/.test(matnr) != true) {
        alert("Die eingegebene Matrikelnummer enthält ungültige Zeichen oder "
            + "ist länger als 6 Ziffern.");
        return;
    }
    
    // Set _MATNR, load timetable
    _MATNR = parseInt(matnr);
    localStorage.matnr = _MATNR;
    
    // Switch to calendar view
    $.mobile.changePage("#pDayView", { transition: "slide" });
    $.mobile.loading("show", { 
        text: "Veranstaltungen werden geladen", 
        textVisible: true
    });
    
    // Load timetable
    t = new TimeTable(_MATNR);
    t.loadIcs();
    _TIMETABLE = t;
    pDayView_displayTimetable();
    $.mobile.loading('hide');
    
    console.log(t.entryCount());
    if (t.entryCount() == 0) {
        setTimeout('$("#pDayView_emptyNote").popup("open", { positionTo: "window" });',
            500);
    }
}

/* *****************************************************************************
 * pDayView
 * ****************************************************************************/

/**
 * Display all timetable entries for a given day.
 * @param day Day to load entries for (index for _WEEKDAYS).
 */
function pDayView_displayTimetable(day)
{
    if (typeof(day) != "number")
        day = _CURRENT_DAY;
    else
        _CURRENT_DAY = day;
    
    // Get day object
    day = _WEEKDAYS[day];
    
    // Clear timetable
    var element = $("#pDayView_timetable-data");
    element[0].innerHTML = "";
    
    //Replace text on day button
    $('#pDayView_cmdSelectDay')[0].innerHTML = day.name;
    
    // Check for available entries
    if (typeof(_TIMETABLE.entries()[day.short]) == "undefined")
        return;
    
    // Display entries in timetable
    var i = 0;
    var e = _TIMETABLE.entries()[day.short];
    var displayEntries = [];
    var scrollTarget = 9999;
    
    for (; i < e.length; i++) {
        //Determine overlapping entries and scroll target
        var j = 0;
        for (; j < e.length; j++) {
            if (!e[i].equals(e[j]) && e[i].overlaps(e[j])) {
                e[i].shrink(0);
                e[j].shrink(1);
            }
        }
        
        if (scrollTarget > e[i].top())
            scrollTarget = e[i].top();
    }
    
    i = 0;
    for (; i < e.length; i++)
        element.append(e[i].toHtml());
    
    setTimeout("$.mobile.silentScroll(" + scrollTarget + ");", 500);
}

/* *****************************************************************************
 * pSelectDay
 * ****************************************************************************/

/**
 * Handles click on a day in the select day dialog.
 * @param elem Dom element clicked (button, attribute "rel" contains day id)
 */
function pSelectDay_daySelect(elem)
{
    day = parseInt($(elem).attr("rel"));
    pDayView_displayTimetable(day);
    $("#pSelectDay").dialog("close");
}
