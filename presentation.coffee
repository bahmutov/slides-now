# allows to control slides using Page Up / Down keys
bespoke.plugins.pageUpDown = (deck) ->
  document.addEventListener 'keydown', (e) ->
    key = e.which
    if key == 33 then deck.prev()
    if key == 34 then deck.next()

bespoke.plugins.slideCounter = (deck) ->
  deck.on 'activate', (e) ->
    message = (e.index + 1) + ' / ' + deck.slides.length
    $('aside#counter').text message

isSlideStart = (line) ->
  isLevel1Header = /^<h1>/
  isLevel2Header = /^<h2>/
  return isLevel1Header.test(line) or isLevel2Header.test(line)

getSlidesNowOptions = (md) ->
  options = {}
  lines = md.split '\n'
  slidesNowOption = /^\[slides-now-(\w+)\]\:\s\"(\w+)\"$/
  lines.forEach (line) ->
    if slidesNowOption.test line
      matches = slidesNowOption.exec line
      if matches.length != 3
        throw new Error 'Could not match line ' + line
      options[matches[1]] = matches[2]
  options

window.mdToPresentation = (md, filename) ->
  if filename
    name = filename
    lastSlashAt = filename.lastIndexOf '/'
    if lastSlashAt != -1
      name = filename.substr lastSlashAt
    $('footer').text name

  $article = $('body').append '<article>'

  options = getSlidesNowOptions md
  console.log 'got options', options
  if options.theme? then $('body').removeClass().addClass(options.theme)

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
  bespoke.horizontal.from 'article',
    vertical: true
    pageUpDown: true
    slideCounter: true

window.tryItNow = ->
  md = $('#explanation')[0].innerHTML
  $('div.markdown-dropzone').remove()
  mdToPresentation md

$('#tryItNow').on 'click', tryItNow