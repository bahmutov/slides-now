optionsParser = require './options.coffee'

require './bespokeCounterPlugin.coffee'
require './bespokeShortcutPlugin.coffee'
require './bespokeProgressBar.coffee'
require './bespokeThemePlugin.coffee'

md2slides = require './md2slides.coffee'
{verify} = require 'check-types'

# Assumes the page has been cleaned from previous markup
window.mdToPresentation = (md, filename, element) ->
  verify.unemptyString md, 'expected markdown string'
  if !element? then element = $('div#dropzone')
  verify.positiveNumber element.length, 'invalid element to append to ' + element.selector

  if filename
    verify.unemptyString filename, 'expected filename, got ' + filename
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
    verify.unemptyString options.theme, 'expected string theme name ' + options.theme
    $('body').removeClass('classic')
      .addClass(options.theme)

  $('body').addClass('slides-now')

  if options.footer? then $('footer').text options.footer
  if options['font-family']? then $('body').css('font-family', options['font-family'])
  if options['font-size']? then $('body').css('font-size', options['font-size'])

  md = optionsParser.removeOptionsLines md
  # console.log "removed options lines\n" + md

  wrapSection = (text) ->
    $slide = $('<section>\n' + text + '\n</section>\n')
    return $slide

  $article = $('article')
  addSlide = (text) ->
    if !text? then return
    if text.length < 100
      if !/<img\ /.test(text)
        $span = $('<span class="centered">\n' + text + '\n</span>')
        # $span.addClass('centerHorizontal')
        $span.addClass('fullHorizontal')
        $span.addClass('centerVertical')
        $slide = $('<section>')
        $slide.append $span
      else
        $slide = wrapSection text
    else
      $slide = wrapSection text
    $('article').append $slide

  htmlParts = md2slides md
  htmlParts.forEach addSlide

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


  # resize code samples intelligently
  $('pre').flowtype
    minFont: 6
    maxFont: 40
    minimum: 250
    maximum: 1200
    # fontRatio: 55
    # lineRatio: 1.45

  recenterCodeBlocks()
  CodeBox 'pre'
