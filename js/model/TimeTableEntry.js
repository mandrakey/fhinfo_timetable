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
 * Construct a new TimeTableEntry representing timetable entries.
 * @param vevent Original ICS VEVENT data to use in creation
 * @return A new TimeTableEntry instance
 * @todo Maybe mDateTimeRx is not necessary: JavaScript Date seems to handle 
 * date values exactly like input internally...
 */
function TimeTableEntry(vevent)
{
    if (!vevent instanceof VEvent)
        throw "TimeTableEntry: Need instance of VEvent for construction";
    
    // RX's
    /** Regular expression used to extract Date and Time values seperatly. */
    var mDateTimeRx = /^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})$/;
    
    /** Name of the table entry event. */
    var mName = vevent.getSummary();
    
    /** Location of the event. */
    var mLocation = vevent.getLocation();
    
    /** Data about how often and when this event recurs. */
    var mRRule = vevent.getRRule();
    
    // Parse date values from VEvent
    var startDate = mDateTimeRx.exec(vevent.getDtStart());
    
    /** Date the event begins. */
    var mStartDate = new Date();
    mStartDate.setFullYear(startDate[1], startDate[2], startDate[3]);
    mStartDate.setHours(startDate[4], startDate[5], startDate[6]);
    var mStartDateString = 
        (((""+mStartDate.getHours()).length == 1) ? "0" : "") + mStartDate.getHours()
        + ":"
        + (((""+mStartDate.getMinutes()).length == 1) ? "0" : "") + mStartDate.getMinutes();
    
    var endDate = mDateTimeRx.exec(vevent.getDtEnd());
    
    /** Date the event ends. */
    var mEndDate = new Date();
    mEndDate.setFullYear(endDate[1], endDate[2], endDate[3]);
    mEndDate.setHours(endDate[4], endDate[5], endDate[6]);
    var mEndDateString =
        (((""+mEndDate.getHours()).length == 1) ? "0" : "") + mEndDate.getHours()
        + ":"
        + (((""+mEndDate.getMinutes()).length == 1) ? "0" : "") + mEndDate.getMinutes();
    
    
    // Get day value
    /** Short english name of the day the event is taking place. */
    var mDay = mRRule.ByDay;
    
    // Calculate top, width and height
    /** How far from the top is this event being rendered? */
    var mTop = (mStartDate.getHours() - 8)*60 + mStartDate.getMinutes();
    
    /** Width of the event entry. */
    var mWidth = 100;
    
    /** Height of the event entry. */
    var mHeight = ((mEndDate.getHours() - 8)*60 + mEndDate.getMinutes()) - mTop;
    
    /** Calculated bottom position where the rendered element ends. */
    var mBottom = mTop + mHeight;
    
    /** Is it rendered left or right, if necessary? */
    var mHPosition = 0;
    
    //==========================================================================
    // GETTER / SETTER
    
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
    
    this.startDateString = function()
    {
        return mStartDateString;
    }
    
    this.endDate = function()
    {
        return mEndDate;
    }
    
    this.endDateString = function()
    {
        return mEndDateString;
    }
    
    this.day = function()
    {
        return mDay;
    }
    
    this.top = function()
    {
        return mTop;
    }
    
    this.width = function()
    {
        return mWidth;
    }
    
    this.height = function()
    {
        return mHeight;
    }
    
    this.bottom = function()
    {
        return mBottom;
    }
    
    this.hPosition = function()
    {
        return mHPosition;
    }
    
    //==========================================================================
    // Methods
    
    /**
     * Check wether this TimeTableEntry overlaps with another one.
     * @param other TimeTableEntry to compare this with
     * @return Wether or not the entries overlap regarding their start and 
     * end positions
     */
    this.overlaps = function(other)
    {
        return (mBottom < other.top() || mTop > other.bottom()) ? false : true;
    }
    
    /**
     * Determine wether this TimeTableEntry and the other are the same.
     * @param other
     * @return True if they are identical, False if not
     */
    this.equals = function(other)
    {
        return (mName != other.name() || mLocation != other.location()
                || mStartDate.toJSON() != other.startDate().toJSON()
                || mEndDate.toJSON() != other.endDate().toJSON())
            ? false : true;
    }
    
    /**
     * Make this TimeTableEntry render half the size.
     * Used if overlapping with another entry so both can be displayed 
     * aside one another.
     * @param position Where this entry will be rendered. 0 means left, 1 right.
     */
    this.shrink = function(position)
    {
        if (mWidth == 100) {
            mWidth = 48;
            mHPosition = position;
        }
    }
    
    /**
     * Create timetable-entry div for diaplay.
     * @return timetable-entry HTML code
     * @todo Find a way to refactor the width and position calculation... looks 
     * just ugly.
     */
    this.toHtml = function()
    {
        var left = -1;
        var right = -1;
        if (mWidth < 100) {
            if (mHPosition == 0)
                left = 0;
            else
                right = 1;
        } else {
            left = 0;
            right = 1;
        }
        
        return '<div class="timetable-entry" '
            + 'style="top: ' + mTop + 'px; height: ' + mHeight + 'px; '
            + ((mWidth < 100) ? 'width: ' + mWidth + '%; ' : '')
            + ((left > -1) ? 'left: ' + left + '%; ' : '') 
            + ((right > -1) ? 'right: ' + right + '%; ' : '') + '">\n'
            + '\t<p>' + mName + '<br>\n'
            + '\t' + mStartDateString + ' - ' + mEndDateString + '<br>\n'
            + '\t' + mLocation + '\n'
            + '</p></div>';
    }
    
    /**
     * Return a string representation of this object.
     * @return String representation
     */
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
