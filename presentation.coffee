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

isSlideStart = (line)->
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

  $article = $('body').append '<article>'
  html = markdown.toHTML md
  lines = html.split '\n'


  currentSlide = null
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