const { exec, spawn } = require("child_process");
const kill = require("tree-kill");
const execSh = require("exec-sh");
const http = require("http");
exec("chmod +777 ./assets/youtube-dl");

const app = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hi :)\n");
});

const RTMP = "rtmp://rtmp.cdn.asset.aparat.com:443/event";
const KEY = process.env.KEY;
const URL = process.env.URL;
const YOUTUBEURL = process.env.YOUTUBE;

const getNewUrl = (cb) => {
    exec("./youtube-dl -g https://www.youtube.com/watch?v=21qNxnCS8WU", (error, stdout, stderr) => {
        cb(stdout.trim());
    });
};

const run = (streamUrl) => {
    const CMD = `ffmpeg -re -i ${streamUrl} -c:v copy -c:a copy -bsf:a aac_adtstoasc -preset:v ultrafast -f flv ${RTMP}/${KEY}`;
    const process = execSh([CMD], true, (err, stdout, stderr) => {
        console.log("==============================================");
        console.log("reconnecting.........");
        console.log("==============================================");
        kill(process.pid);
        getNewUrl(run);
        console.log("==============================================");
        console.log(stderr);
        console.log("==============================================");
    });
};

run(URL);

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
