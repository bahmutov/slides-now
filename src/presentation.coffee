optionsParser = require './options.coffee'

require './bespokeCounterPlugin.coffee'
require './bespokeShortcutPlugin.coffee'
require './bespokeProgressBar.coffee'

isSlideStart = (line) ->
  isLevel1Header = /^<h1>/
  isLevel2Header = /^<h2>/
  return isLevel1Header.test(line) or isLevel2Header.test(line)

currentDeck = null

window.mdToPresentation = (md, filename) ->
  if filename
    name = filename
    lastSlashAt = filename.lastIndexOf '/'
    if lastSlashAt != -1
      name = filename.substr lastSlashAt
    $('footer').text name

  # allow to restart the presentation
  $('article.bespoke-parent').unbind();
  $('article').remove()
  $article = $('div#dropzone').append '<article>'

  # custom UI options from Markdown text
  options = optionsParser.getSlidesNowOptions md
  # console.log 'got options', options
  if options.theme? then $('body').removeClass().addClass(options.theme)
  if options.footer? then $('footer').text options.footer
  if options['font-family']? then $('body').css('font-family', options['font-family']);
  if options['font-size']? then $('body').css('font-size', options['font-size']);

  md = optionsParser.removeOptionsLines md
  # console.log "removed options lines\n" + md

  mdParts = md.split '\n\r\n\r\n\r'
  htmlParts = mdParts.map (mdPart) ->
    trimmed = mdPart.trim()
    markdown.toHTML trimmed

  htmlParts.forEach (html) ->
    currentSlide = null

    lines = html.split '\n'
    lines.forEach (line) ->
      if isSlideStart(line)
        if currentSlide
          # finish current slide
          $('article').append '<section>\n' + currentSlide + '\n</section>\n'
          currentSlide = null
      if currentSlide
        currentSlide += '\n' + line
      else
        currentSlide = line

    if currentSlide
      $('article').append '<section>\n' + currentSlide + '\n</section>\n'

  # console.log 'converted markdown to\n' + $article.innerHTML
  if options.timer?
    # console.log 'have options timer', options.timer, 'seconds'
    bespoke.plugins.progressBar.timer(options.timer)
  else
    bespoke.plugins.progressBar.removeTimer()

  currentDeck = bespoke.horizontal.from 'article',
    hash: true
    vertical: true
    keyShortcuts: true
    progressBar: true
    # slideCounter: true


window.tryItNow = ->
  md = $('#explanation')[0].innerHTML
  $('div.markdown-dropzone').remove()
  mdToPresentation md

$('#tryItNow').on 'click', tryItNow