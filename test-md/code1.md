normal text

    code1
    code2

## second slide

long code, but not too many lines

```
very long code line with lots of characters here

function init(opts) {
  opts = opts || {};

  return {
    promiseToChange: promiseToChange.bind(null, opts);
  };
}

module.exports = init;
```

## 3rd slide

```
window.mdToPresentation = (md, filename, element) ->
  if !element? then element = $('div#dropzone')

  if filename
    name = filename
    lastSlashAt = filename.lastIndexOf '/'
    if lastSlashAt != -1
      name = filename.substr lastSlashAt
    $('footer').text name

  # allow to restart the presentation
  $('article.bespoke-parent').unbind()
  $('article').remove()
  $article = element.append '<article>'

  # custom UI options from Markdown text
  options = optionsParser.getSlidesNowOptions md
  # console.log 'got options', options
  if options.theme?
    $('body').removeClass('classic')
      .addClass(options.theme)

  $('body').addClass('slides-now')

  if options.footer? then $('footer').text options.footer
  if options['font-family']? then $('body').css('font-family', options['font-family'])
  if options['font-size']? then $('body').css('font-size', options['font-size'])

  md = optionsParser.removeOptionsLines md
  # console.log "removed options lines\n" + md

  htmlParts = md2slides md
```

[slides-now-theme]: "coverflow"