const execSh = require("exec-sh");
const http = require("http");

/*
    Use this to ping the server.
*/
const app = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hi :)\n");
});

// Aparat RTMP stream info 
const RTMP = "rtmp://rtmp.cdn.asset.aparat.com:443/event";
const KEY = process.env.KEY;
const URL = process.env.URL;

// FFMPEG command - forwards hsl file to Aparat's RTMP server - optimized for free server ( -c copy )
const CMD = `ffmpeg -re -i ${URL} -c copy -bsf:a aac_adtstoasc -preset:v ultrafast -f flv ${RTMP}/${KEY}`;

// Run the command
execSh([CMD], true, (err) => {
    console.log(err);
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
