# FHInfo timetable
**FHInfo timetable** is, currently, a small and very specific HTML5 app to 
access students timetables at the Fachhochschule Zweibrücken, University of 
Applied Sciences Zweibrücken, Germany.

It loads a student's timetable for the current semester using an external link 
to FHInfo's timetable ICS calendar link. The retrieved ICS file then is parsed 
and simply displayed. The displayed day can be changed via swiping (having 
some trouble with my smartphone here... sometimes does not work) or tapping 
the day button in the header.

## How does it work?
The ui starts an AJAX call to the PHP script in *php/loadIcs.php*, telling 
it the students Matrikelnummer and the current semester. The script then 
tries to access the corresponding ICS file on FHInfo server and passes the 
content to the AJAX caller.

The parsing and display is done by JavaScript only.

To create the UI, we use JQuery-mobile 1.3 on top of JQuery 1.9.1.

## Installation
To install the app on a webserver, you simply need to unpack all files somewhere 
in the document root. The only thing the webserver must provide is a running 
PHP installation.

## Ongoing work
This app was not created for any special project or for any client - just to try 
if it could be done. Therefore the codebase at some points may be not very 
flexible.

If you are interested in further developing this app, you are welcome to fork or 
contact me to work on the original for I am thinking about adapting it for 
other sources (e.g. XML format, other institutions ...) some time.

## License
Copyright (C) 2013 Maurice Bleuel <mbleuel@bleuelmedia.com>

asciidoc.js is free software; you can redistribute it and/or modify it 
under the terms of the GNU General Public License as published by the Free 
Software Foundation, either version 3 of the license, or (at your option) 
any later version.

asciidoc.js is distributed in the hope that it will be useful, but 
WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTIBILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General 
Public License for more details.

You should have received a copy of the GNU General Public License 
along with asciidoc.js. If not, see
[http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).

![GPLv3](http://www.gnu.org/graphics/gplv3-127x51.png)
