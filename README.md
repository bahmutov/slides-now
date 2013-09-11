# Slides Now!

[![endorse](https://api.coderwall.com/bahmutov/endorsecount.png)](https://coderwall.com/bahmutov)

Instant stand alone slide show from a markdown document.

1. No server necessary
2. Stylish presentation
3. Just drag and drop a [Markdown](http://goo.gl/6yTb) document
4. Switch themes on the fly, click **t**

## Playback

* Happens entirely inside the browser, nothing is uploaded to a server
* Works great as a stand alone page
* You can use this README.md as example
* Parsed using [marked](https://github.com/chjj/marked)
* Slides will be shown using [bespoke.js](https://github.com/markdalgleish/bespoke.js)

## Slide show UI

You can specify custom *slides-now* options using
markdown reference syntax. Here are a few available options:

```
[slides-now-theme]: "classic"
   cube|coverflow|concave|carousel|bw
[slides-now-footer]: "My talk"
[slides-now-font-family]: "Arial"
[slides-now-font-size]: "26pt"
// presentation should last 2 minutes
[slides-now-timer]: "2"
```

The options should be at the end of the document.

## Dev notes

Installation:

    bower install
    npm install

Open *dist/index.html* in a browser, use local file, not http server due
to caching (or use new port every time).

## Timer bar

Add a timer bar crawling along the bottom to
limit the presentation time.

* [slides-now-timer]: "30"
* pause / resume the timer using **p** key

## Inspiration

Several open source projects inspired me to create **slides-now**.
Check them out!

* [bespoke.js](https://github.com/markdalgleish/bespoke.js)
* [remark](https://github.com/gnab/remark)
* [reveal.js](http://lab.hakim.se/reveal-js/)
* [code-box](https://github.com/bahmutov/code-box)

### Gleb Bahmutov [@bahmutov](https://twitter.com/bahmutov)

Feel free to contact me if there are any issues.

[slides-now-theme]: "bw"
[slides-now-footer]: "Slides now README.md"
[slides-now-font-family]: "Arial"
[slides-now-font-size]: "22pt"
[slides-now-timer]: "10"