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
  bespoke.horizontal.from 'article'

window.tryItNow = ->
  md = $('#explanation')[0].innerHTML
  $('#dropzone').remove()
  mdToPresentation md

$('#tryItNow').on 'click', tryItNow