# Slides Now!

Instant stand alone slide show from a markdown document.

1. No server necessary
2. Stylish presentation
3. Just drag and drop a Markdown document

## Playback

* Happens entirely inside the browser, nothing is uploaded to a server
* Works great as a stand alone page
* You can use this README.md as example
* Parsed using [markdown-js](https://github.com/evilstreak/markdown-js)
* Slides will be shown using [bespoke.js](https://github.com/markdalgleish/bespoke.js)

## Slide show UI

You can specify custom *slides-now* options using
markdown reference syntax. Here are a few available options:

```
[slides-now-theme]: "classic"
   cube|coverflow|concave|carousel
[slides-now-footer]: "My talk"
[slides-now-font-family]: "Arial"
[slides-now-font-size]: "26pt"
// presentation should last 2 minutes
[slides-now-timer]: "2"
```

The options should be at the end of the document.

## Inspiration

Several open source projects inspired me to create **slides-now**.
Check them out!

* [bespoke.js](https://github.com/markdalgleish/bespoke.js)
* [remark](https://github.com/gnab/remark)
* [reveal.js](http://lab.hakim.se/reveal-js/)

### Gleb Bahmutov [@bahmutov](https://twitter.com/bahmutov)

Feel free to contact me if there are any issues.

[slides-now-theme]: "bw"
[slides-now-footer]: "Slides now README.md"
[slides-now-font-family]: "Arial"
[slides-now-font-size]: "22pt"
[slides-now-timer]: "10"