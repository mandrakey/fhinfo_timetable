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

function VCalendar()
{
    var mProdId = "";
    var mVersion = "";
    var mCalScale = "";
    var mMethod = "";
    
    var mVEvents = [];
    
    // Parser RX
    var mProdIdRx = /^PRODID:(.+)$/;
    var mVersionRx = /^VERSION:([0-9\.]+)$/;
    var mCalScaleRx = /^CALSCALE:(.+)$/;
    var mMethodRx = /^METHOD:(.+)$/;
    var mVEventRx = /^BEGIN:VEVENT$/;
    
    this.getProdId = function()
    {
        return mProdId;
    }
    
    this.getVersion = function()
    {
        return mVersion;
    }
    
    this.getCalScale = function()
    {
        return mCalScale;
    }
    
    this.getMethod = function()
    {
        return mMethod;
    }
    
    this.getVEvents = function()
    {
        return mVEvents;
    }
    
    /**
     * Parses given ICS file content.
     * @param icsData Textual data from an ICS file
     * @throw string
     */
    this.parse = function(icsData)
    {
        if (!typeof(icsData) == "string")
            throw "VCalendar.init: Cannot init VCalendar with empty dataset";
        
        var curLine = 0;
        var text = icsData.split(/\n|\r\n|\r/);
        
        // Check for valid document start: BEGIN:VCALENDAR
        if (text[curLine++] != "BEGIN:VCALENDAR")
            throw "VCalendar.init: This does not seem to be a valid ics file";
        
        //----
        // Parse the document
        
        while ((input = text[curLine++]) != "END:VCALENDAR") {
            
            if (mProdIdRx.test(input))
                mProdId = mProdIdRx.exec(input)[1];
            else if (mVersionRx.test(input))
                mVersion = mVersionRx.exec(input)[1];
            else if (mCalScaleRx.test(input))
                mCalScale = mCalScaleRx.exec(input)[1];
            else if(mMethodRx.test(input))
                mMethod = mMethodRx.exec(input)[1];
            else if (mVEventRx.test(input)) {
                var txt = ["BEGIN:VEVENT"];
                while ((einput = text[curLine++]) != "END:VEVENT")
                    txt.push(einput);
                txt.push("END:VEVENT");
                
                var v = new VEvent();
                v.parse(txt);
                mVEvents.push(v);
            }
        }
        
    }
    
    this.toString = function()
    {
        var res = "prodid: " + mProdId + "\n"
            + "version: " + mVersion + "\n"
            + "calscale: " + mCalScale + "\n"
            + "method: " + mMethod + "\n"
            + "vevents:\n====\n";
        
        var i = 0;
        for (; i < mVEvents.length; i++) {
            res += mVEvents[i].toString()
                + "\n----\n";
        }
        
        res += "====";
        
        return res;
    }
}
