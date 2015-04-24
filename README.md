# Icecast Listener Count Monitor
Simple Icecast listener count monitor written in node.js.
Created by James Baber <contact@jamesbaber.co.uk>

##FAQ

### Installation
`git clone https://github.com/jamesbaber/icecast-listener-monitor.git`

On linux make start.sh executable with
`chmod +x start.sh`

Then configure the server.js script.
Look for the variables at the beginning commented with `// Change me`

### Running
To start the script simply execute start.sh or run script.js in node youself.
On Linux `./start.sh`
In Windows `start.bat`

### How it works
The script creates a CSV (Comma Seperated Values File) and logs to it in this format:
`FormatHere`
