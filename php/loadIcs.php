<?php

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

if (!isset($_GET["matnr"]) || !is_numeric($_GET["matnr"]))
    die("ERR:Need matnr to continue");
if (!isset($_GET["semester"]) || !is_numeric($_GET["matnr"]))
    die("ERR:Need semester to continue");

$url = "https://fhinfo.fh-kl.de/portalapps/sp/Stundenplan.ics"
            . "?cw_passThrough=marked"
            . "&pid="
            . "&mtknr=".$_GET["matnr"]
            . "&semid=".$_GET["semester"]
            . "&cw_inChannelLink=";

//echo file_get_contents($url);
echo file_get_contents("demofile.ics");
