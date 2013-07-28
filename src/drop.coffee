presentationElement = $('div#dropzone')

cleanIntroText = ->
  $('div#MainTitle').remove()
  $('div.markdown-dropzone').remove()

window.tryItNow = ->
  md = $('#explanation')[0].innerHTML
  cleanIntroText()
  mdToPresentation md, null, presentationElement

$('#tryItNow').on 'click', tryItNow

createSlides = (md, filename) ->
  cleanIntroText()
  window.mdToPresentation md, filename, presentationElement

###
Start presentation if there is url parameter to Markdown
###
urlParser = $.url()
url = urlParser.param('url') || urlParser.param('md')
if url
  $.get url, (md) ->
    cleanIntroText()
    window.mdToPresentation md, null, presentationElement

###
Create drop zone using AngularJs
###
drop = angular.module 'markdown.drop', []

drop.directive 'dropzone', ->
  restrict: 'A'
  scope: {}
  replace: false
  link: (scope, element, attrs) ->
    startDrag = (event) ->
      element.addClass 'dragging'
      if event.preventDefault
        event.preventDefault()
      event.dataTransfer.effectAllowed = 'copy'
      return false

    stopDrag = (event) ->
      element.removeClass 'dragging'
      if event.preventDefault
        event.preventDefault()
      return false

    # for dragover and dragenter (IE) we stop the browser from handling the
    # event and specify copy as the allowable effect
    element.bind 'dragenter', startDrag, false
    element.bind 'dragover', startDrag, false
    element.bind 'dragleave', stopDrag, false

    # on drop events we stop browser and read the dropped file via the FileReader
    # the resulting droped file is bound to the image property of the scope of this directive
    element.bind 'drop', (event) ->
      stopDrag(event)
      if event.preventDefault
        event.preventDefault()
      file = event.dataTransfer.files[0]
      isMarkdownFilename = /\.md$/
      if isMarkdownFilename.test file.name
        reader = new FileReader()
        reader.onload = (evt) ->
          createSlides evt.target.result, file.name
        reader.readAsText file
      else
        console.error 'Only Markdown documents should be droppped'
      return false
    , false

