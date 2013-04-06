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

function TimeTableEntry(vevent)
{
    if (!vevent instanceof VEvent)
        throw "TimeTableEntry: Need instance of VEvent for construction";
    
    // RX's
    var mDateTimeRx = /^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})$/;
    
    var mName = vevent.getSummary();
    var mLocation = vevent.getLocation();
    var mRRule = vevent.getRRule();
    
    // Parse date values from VEvent
    var startDate = mDateTimeRx.exec(vevent.getDtStart());
    var mStartDate = new Date();
    mStartDate.setFullYear(startDate[1], startDate[2], startDate[3]);
    mStartDate.setHours(startDate[4], startDate[5], startDate[6]);
    
    var endDate = mDateTimeRx.exec(vevent.getDtEnd());
    var mEndDate = new Date();
    mEndDate.setFullYear(endDate[1], endDate[2], endDate[3]);
    mEndDate.setHours(endDate[4], endDate[5], endDate[6]);
    
    // Get day value
    var mDay = mRRule.ByDay;
    
    this.name = function()
    {
        return mName;
    }
    
    this.location = function()
    {
        return mLocation;
    }
    
    this.rrule = function()
    {
        return mRRule;
    }
    
    this.startDate = function()
    {
        return mStartDate;
    }
    
    this.endDate = function()
    {
        return mEndDate;
    }
    
    this.day = function()
    {
        return mDay;
    }
    
    this.toString = function()
    {
        var res = "TimeTableEntry ["
            + "name: " + mName + ", "
            + "location: " + mLocation + ", "
            + "rrule: [ "
            + "freq: " + mRRule.Freq + ", "
            + "until: " + mRRule.Until + ", "
            + "byday: " + mRRule.ByDay + "], "
            + "start_date: " + mStartDate.toLocaleString() + ", "
            + "end_date: " + mEndDate.toLocaleString() + "]";
        return res;
    }
}
