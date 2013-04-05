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

function VEvent()
{
    var mDtStamp = "";
    var mUid = "";
    var mSummary = "";
    var mLocation = "";
    var mDtStart = "";
    var mDtEnd = "";
    var mSequence = "";
    var mTransp = "";
    var mRRule = {
        Freq: "",
        Until: "",
        ByDay: ""
    };
    var mExdate = [];
    
    // Parser RX
    mDtStampRx = /^DTSTAMP:([0-9]{8}T[0-9]{6}Z)$/;
    mUidRx = /^UID:([0-9]{8}T[0-9]{6}Z.+@fhinfo\.fh-kl\.de)$/;
    mSummaryRx = /^SUMMARY:(.+)$/;
    mLocationRx = /^LOCATION:(.+)$/;
    mDtStartRx = /^DTSTART:([0-9]{8}T[0-9]{6})$/;
    mDtEndRx = /^DTEND:([0-9]{8}T[0-9]{6})$/;
    mSequenceRx = /^SEQUENCE:([0-9]+)$/;
    mTranspRx = /^TRANSP:(.+)$/;
    mRRuleRx = /^RRULE:FREQ=([^;]+);UNTIL=([0-9]{8});BYDAY=([A-Z]{2})$/;
    mExdateRx = /^EXDATE:(.+)/;
    
    this.getDtStamp = function()
    {
        return mDtStamp;
    }
    
    this.getUid = function()
    {
        return mUid;
    }
    
    this.getSummary = function()
    {
        return mSummary;
    }
    
    this.getLocation = function()
    {
        return mLocation;
    }
    
    this.getDtStart = function()
    {
        return mDtStart;
    }
    
    this.getDtEnd = function()
    {
        return mDtEnd;
    }
    
    this.getSequence = function()
    {
        return mSequence;
    }
    
    this.getTransp = function()
    {
        return mTransp;
    }
    
    this.getRRule = function()
    {
        return mRRule;
    }
    
    this.getExdate = function()
    {
        return mExdate;
    }
    
    this.parse = function(text)
    {
        if (!typeof(text) == "array")
            throw "VCalendar.init: Cannot init VCalendar with empty dataset";
        
        var curLine = 1;
        
        //----
        // Parse the document
        
        while ((input = text[curLine++]) != "END:VEVENT") {
            
            if (mDtStampRx.test(input))
                mDtStamp = mDtStampRx.exec(input)[1];
            else if (mUidRx.test(input))
                mUid = mUidRx.exec(input)[1];
            else if (mSummaryRx.test(input))
                mSummary = mSummaryRx.exec(input)[1];
            else if (mLocationRx.test(input))
                mLocation = mLocationRx.exec(input)[1];
            else if (mDtStartRx.test(input))
                mDtStart = mDtStartRx.exec(input)[1];
            else if (mDtEndRx.test(input))
                mDtEnd = mDtEndRx.exec(input)[1];
            else if (mSequenceRx.test(input))
                mSequence = mSequenceRx.exec(input)[1];
            else if (mTranspRx.test(input))
                mTransp = mTranspRx.exec(input)[1];
            else if (mRRuleRx.test(input)) {
                var tmp = mRRuleRx.exec(input);
                mRRule.Freq = tmp[1];
                mRRule.Until = tmp[2];
                mRRule.ByDay = tmp[3];
            } else if (mExdateRx.test(input)) {
                var txt = mExdateRx.exec(input)[1];
                
                while ((einput = text[curLine++]) != "END:VEVENT")
                    txt += einput;
                
                mExdate = txt;
                curLine--;
            }
            
        }
    }
    
    this.toString = function()
    {
        var res = "dtstamp: " + mDtStamp + "\n"
            + "uid: " + mUid + "\n"
            + "summary: " + mSummary + "\n"
            + "location: " + mLocation + "\n"
            + "dtstart: " + mDtStart + "\n"
            + "dtend: " + mDtEnd + "\n"
            + "sequence: " + mSequence + "\n"
            + "transp: " + mTransp + "\n"
            + "rrule: [freq: " + mRRule.Freq + ", until: " + mRRule.Until
            + ", byday: " + mRRule.ByDay + "]\n"
            + "exdate: " + mExdate + "\n";
        return res;
    }
}
