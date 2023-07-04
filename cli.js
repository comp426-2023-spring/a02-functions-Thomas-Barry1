#!/usr/bin/env node
import fetch from "node-fetch";
import moment from "moment-timezone";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

if (argv.h) {
  console.log(
    "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n" +
      "-h            Show this help message and exit." +
      "-n, -s        Latitude: N positive; S negative.\n" +
      "-e, -w        Longitude: E positive; W negative.\n" +
      "-z            Time zone: uses tz.guess() from moment-timezone by default.\n" +
      "-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n" +
      "-j            Echo pretty JSON from open-meteo API and exit."
  );
  process.exit(0);
}

const timezone = moment.tz.guess();
const lat = argv.e || argv.w * -1;
const long = argv.n || argv.s * -1;
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=" +
  lat +
  "&longitude=" +
  long +
  "&daily=precipitation_hours" +
  "&timezone=" +
  timezone +
  "&current_weather=true";

// Make a request
const response = await fetch(url);
// Get the data from the request
const data = await response.json();

if (argv.j) {
  console.log(data);
  process.exit(0);
}

const days = argv.d;
console.log(url);

if (days == 0) {
  console.log("today.");
  console.log(data.daily.precipitation_hours[0]);
} else if (days > 1) {
  console.log("in " + days + " days.");
  console.log(data.daily.precipitation_hours[days]);
} else {
  console.log("tomorrow.");
  console.log(data.daily.precipitation_hours[1]);
}
