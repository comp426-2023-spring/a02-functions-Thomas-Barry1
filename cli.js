#!/usr/bin/env node
import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";
import process from 'process';
const timezone = moment.tz.guess()
var input = minimist(process.argv.slice(2))
