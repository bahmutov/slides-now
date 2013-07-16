optionsParser = require './options.coffee'

require './bespokeCounterPlugin.coffee'
require './bespokeShortcutPlugin.coffee'
require './bespokeProgressBar.coffee'
require './bespokeThemePlugin.coffee'

md2slides = require './md2slides.coffee'

isSlideStart = (line) ->
  isLevel1Header = /^<h1>/
  isLevel2Header = /^<h2>/
  return isLevel1Header.test(line) or isLevel2Header.test(line)

window.mdToPresentation = (md, filename) ->
  if filename
    name = filename
    lastSlashAt = filename.lastIndexOf '/'
    if lastSlashAt != -1
      name = filename.substr lastSlashAt
    $('footer').text name

  # allow to restart the presentation
  $('article.bespoke-parent').unbind()
  $('article').remove()
  $article = $('div#dropzone').append '<article>'

  # custom UI options from Markdown text
  options = optionsParser.getSlidesNowOptions md
  # console.log 'got options', options
  if options.theme? then $('body').removeClass().addClass(options.theme)
  if options.footer? then $('footer').text options.footer
  if options['font-family']? then $('body').css('font-family', options['font-family'])
  if options['font-size']? then $('body').css('font-size', options['font-size'])

  md = optionsParser.removeOptionsLines md
  # console.log "removed options lines\n" + md

  htmlParts = md2slides md

  $article = $('article')
  addSlide = (text) ->
    if !text? then return
    if text.length < 100 && !/<img\ /.test(text)
      $span = $('<span>\n' + text + '\n</span>')
      $span.addClass('centerHorizontal')
      $span.addClass('centerVertical')
      $slide = $('<section>')
      $slide.append $span
    else
      $slide = $('<section>\n' + text + '\n</section>\n')
    $('article').append $slide

  htmlParts.forEach (html) ->
    currentSlide = null

    lines = html.split '\n'
    lines.forEach (line) ->
      if isSlideStart(line)
        if currentSlide
          addSlide(currentSlide)
          currentSlide = null
      if currentSlide
        currentSlide += '\n' + line
      else
        currentSlide = line

    if currentSlide
      addSlide(currentSlide)

  # console.log 'converted markdown to\n' + $article.innerHTML
  try
    if options.timer?
      # timer duration in minutes, convert to seconds
      bespoke.plugins.progressBar.timer(options.timer * 60)
    else
      bespoke.plugins.progressBar.removeTimer()
  catch e
    # do nothing

  recenter()

  recenterImages()

  bespoke.horizontal.from 'article',
    hash: true
    vertical: true
    keyShortcuts: true
    progressBar: true
    themes: true
    # slideCounter: true


window.tryItNow = ->
  md = $('#explanation')[0].innerHTML
  $('div.markdown-dropzone').remove()
  mdToPresentation md

$('#tryItNow').on 'click', tryItNow