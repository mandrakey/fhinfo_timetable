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

/* *****************************************************************************
 * pLogin
 * ****************************************************************************/

function loginForm_cmdLogin_click() {
    var matnr = $("#loginForm_matnr")[0].value;
    if (/^[0-9]{6}$/.test(matnr) != true) {
        alert("Die eingegebene Matrikelnummer enthält ungültige Zeichen oder "
            + "ist länger als 6 Ziffern.");
        return;
    }
    
    // Set _MATNR, load timetable
    _MATNR = parseInt(matnr);
    
    // Switch to calendar view
    $.mobile.changePage("#dayView", { transition: "slide" });
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
}

/* *****************************************************************************
 * pDayView
 * ****************************************************************************/

function pDayView_displayTimetable(day)
{
    if (typeof(day) != "object" || typeof(day.name) == "undefined" || 
            typeof(day.short) == "undefined")
        day = _CURRENT_DAY;
    
    // Clear timetable
    var element = $("#pDayView_timetable-data");
    element[0].innerHTML = "";
    
    // Check for available entries
    if (typeof(_TIMETABLE.entries()[day.short]) == "undefined") {
        console.log("No entries for " + day.short);
        return;
    }
    
    // Display entries in timetable
    var i = 0;
    console.log(_TIMETABLE.entries());
    var e = _TIMETABLE.entries()[day.short];
    
    for (; i < e.length; i++) {
        var startDate = e[i].startDate();
        var endDate = e[i].endDate();
        var top = (startDate.getHours() - 8)*60 + startDate.getMinutes();
        var height = ((endDate.getHours() - 8)*60 + endDate.getMinutes()) - top;
        
        var startDateString = 
            (((""+startDate.getHours()).length == 1) ? "0" : "") + startDate.getHours()
            + ":"
            + (((""+startDate.getMinutes()).length == 1) ? "0" : "") + startDate.getMinutes();
        var endDateString = 
            (((""+endDate.getHours()).length == 1) ? "0" : "") + endDate.getHours()
            + ":"
            + (((""+endDate.getMinutes()).length == 1) ? "0" : "") + endDate.getMinutes();
        
        var entry = '<div class="timetable-entry" style="top: ' + top + 'px; height: ' + height + 'px;">\n'
            + '\t<p>' + e[i].name() + '<br>\n'
            + '\t' + startDateString + ' - ' + endDateString + '<br>\n'
            + '\t' + e[i].location() + '\n'
            + '</p></div>';
        element.append(entry);
    }
}

/* *****************************************************************************
 * pSelectDay
 * ****************************************************************************/

function pSelectDay_daySelect(elem)
{
    day = _WEEKDAYS[parseInt($(elem).attr("rel"))];
    pDayView_displayTimetable(day);
    $("#pSelectDay").dialog("close");
}
