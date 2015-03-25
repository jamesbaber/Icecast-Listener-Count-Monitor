
/*
	Node.js Icecast listener count monitor.
	Built by James Baber for Backwell School Radio.
	Requirements:
		najax: https://github.com/najaxjs/najax
		fs: Included with Node.js
*/

// Get required libraries for the script
najax = require("najax");
fs = require("fs");

// Introductory text
console.log("Monitoring the listener count for the schoolradio icecast server");

// Time constants
var waitTime = 10; // Seconds between logs
var interval = 1000 * waitTime;
console.log("Seconds between logs: " + waitTime);

// Save location
var saveLoc = "listenerLog.csv";


function getDateTime() {
	// Get the date and time into a nice format for our csv
	var date = new Date();
	
	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	
	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	
	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;
	
	var year = date.getFullYear();
	
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	
	return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

function parseData(strToParse, strStart, strFinish)
{
	// Find listener count in string from ajax call to icecast web interface
	var str = strToParse.match(strStart + "(.*?)" + strFinish);
	if (str != null) {
		return(str[1]);
	}
}

function writeLog(data) {
	// Write string to file and handle errors
	fs.appendFile(saveLoc, data, function(err) {
		if(err) {
			console.log("File writing failed! Please make sure that the file isn't open on another machine.");
		}
	});
}

function logData(data) {
	// Create the output string
	var time = getDateTime();
	var output = "\r\n" + time + "," + data

	// Log it with the date
	writeLog(output);
}

setInterval(function() {
	// Perform an ajax call to the icecast web interface
	najax("http://localhost", function(html) {
		html = someText = html.replace(/(\r\n|\n|\r)/gm,"");
		var listeners = parseData(html, '<td>Current Listeners:</td><td class="streamdata">', "</td></tr>");
		logData(listeners);
	});
}, interval);
