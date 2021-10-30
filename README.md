# youtube-to-aparat-middleware
Stream youtube videos/streams to Aparat

# Usage: 

this script is used to forward youtube streams to Aparat's RTMP server (or any RTMP server)

You can host this script on Rep.it, Heroku or Glitch.

[DEMO](https://www.aparat.com/ChillClub/live)


## Env
you need an ENV file with following values
```bash
KEY=<your aparat stream key>
URL=<hls index file (index.m3u8)> or an empty string
YOUTUBE=<youtube stream url>
```
