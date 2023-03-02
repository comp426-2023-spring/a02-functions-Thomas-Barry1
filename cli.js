#!/usr/bin/env node
import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";
import process from 'process';
const timezone = moment.tz.guess()
var input = minimist(process.argv.slice(2))
if (input.h){
    let message = 'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE' +
    '-h            Show this help message and exit.' + 
    '-n, -s        Latitude: N positive; S negative.' +
    '-e, -w        Longitude: E positive; W negative.' +
    '-z            Time zone: uses tz.guess() from moment-timezone by default.' +
    '-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.' +
    '-j            Echo pretty JSON from open-meteo API and exit.';
    console.log(message);
    process.exit(0);
}
