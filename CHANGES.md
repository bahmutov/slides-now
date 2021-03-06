
## 0.1.0 / 2014-03-06

 * added full slide background images
 * using separate slides-now-core.js

## 0.0.18 / 2014-02-24

 * using slides-now-core

## 0.0.17 / 2014-02-22

 * main page is generated using jade, fixes #23
 * using stylus instead of CSS
 * good style for narrow screens, fixes #21
 * fixed triple dashes

## 0.0.15 / 2014-02-17

* added *full* theme for borderless slides
* better fullscreen style
* better small screen style

## 0.0.14 / 2014-02-09

* added speaker notest, use *```notes* blocks
* Refactoring, moving to Github
* separate slides using ---, fixes #113

## 0.0.11

* Intelligent code block resizing

```
if (code block is too wide) {
    update fonts and line heights to fit
    // uses flowType.js
}
```
* Source code lightbox using [code-box](https://github.com/bahmutov/code-box)
* Previous versions hosted under *slides-now/number*


## 0.0.10

* Error popup if dropping file with extension other than .md or .txt
* Available as a [stand alone tool](http://npmjs.org/slides-now-node)
* Available as a [Chrome extension](https://chrome.google.com/webstore/detail/slides-now/hcohekeghgkdeimnjfmpdlgccfamggac)

## 0.0.9

* Added page title
* Larger call to action **Try it Now**
* Load external Markdown from url with *url=* parameter
	* If cross domain allow it

## 0.0.8

* better markdown parsing using [marked](https://github.com/chjj/marked)
* all urls from the presentation open in new tab
* If a slide has less than 150 characters of text, it will be
automatically centered
* Images are displayed centered on the slide, see next slide



HTML5 logo ![html5 display](http://www.w3.org/html/logo/img/html5-display.png "html5 display")
