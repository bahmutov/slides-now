# allows to control slides using Page Up / Down keys
bespoke.plugins.pageUpDown = (deck) ->
  document.addEventListener 'keydown', (e) ->
    key = e.which
    if key == 33 then deck.prev()
    if key == 34 then deck.next()

window.mdToPresentation = (md) ->
  $article = $('body').append '<article>'
  html = markdown.toHTML md
  lines = html.split '\n'

  currentSlide = null
  lines.forEach (line) ->
    if /^<h2>/.test line
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

window.tryItNow = ->
  md = $('#explanation')[0].innerHTML
  $('#dropzone').remove()
  mdToPresentation md

$('#tryItNow').on 'click', tryItNow