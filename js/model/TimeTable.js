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

function TimeTable(matnr)
{
    if (typeof(matnr) != "number")
        throw "TimeTable: matnr must be a number";
    
    /** Contains student's matrikelnummer. */
    var mMatNr = matnr;
    
    /** Contains timetable entries. */
    var mEntries = [];
    
    // Calculate semester value
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    
    /** Contains the current semester. */
    var mSemester = year + ((month < 9 || month > 2) ? "1" : "2");
    mSemester = "20122";
    
    this.matNr = function()
    {
        return mMatNr;
    }
    
    this.entries = function()
    {
        return mEntries;
    }
    
    this.loadIcs = function()
    {
        if (typeof(mMatNr) != "number" || mSemester.trim() == "")
            throw "Cannot load ICS file due to missing data";
       
       $.ajax({
           url: "./php/loadIcs.php",
           data: {
               matnr: mMatNr,
               semester: mSemester
           },
           async: false,
           success: this.loadIcs_success
       });
    }
    
    this.loadIcs_success = function(data)
    {
        var v = new VCalendar();
        v.parse(data);
        
        var i = 0;
        var e = v.getVEvents();
        for (; i < e.length; i++) {
            var day = e[i].getRRule().ByDay;
            if (typeof(mEntries[day]) == "undefined")
                mEntries[day] = [];
            
            var entry = new TimeTableEntry(e[i]);
            mEntries[day].push(entry);
        }
    }
}
