const { exec, spawn } = require("child_process");
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

const getNewUrl = (cb) => {
    exec("./youtube-dl -g https://www.youtube.com/watch?v=21qNxnCS8WU", (error, stdout, stderr) => {
        cb(stdout);
    });
};

const run = (streamUrl) => {
    const CMD = `ffmpeg -re -i ${streamUrl} -c copy -bsf:a aac_adtstoasc -preset:v ultrafast -f flv ${RTMP}/${KEY}`;
    const activeProcess = execSh([CMD], true, (err, stdout, stderr) => {
        if (err) {
            activeProcess.kill();
            getNewUrl(run);
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
    });
};

run(URL);

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
