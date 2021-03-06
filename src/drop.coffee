if !angular? then throw new Error('Missing AngularJs')
if !Alertify? then throw new Error('Missing alertify library')
if !window.mdToPresentation? then throw new Error('Missing mdToPresentation function!')

cleanIntroText = ->
  $('div#MainTitle').remove()
  $('div.markdown-dropzone').remove()
  $('body').removeClass('slides-now-drop')

createSlides = (md, filename) ->
  cleanIntroText()
  presentationElement = $('#dropzone')
  window.mdToPresentation
    md: md
    filename: filename
    element: presentationElement
    center: false

checkFilename = (filename) ->
  isMarkdownFilename = /\.md|\.md\.txt|\.txt$/i
  if !isMarkdownFilename.test filename
    Alertify.log.error('Cannot drop ' + filename + ', only Markdown documents (.md) can be droppped', 10000)
    false
  else
    true

###
Start presentation if there is url parameter to Markdown
###
urlParser = $.url()
url = urlParser.param('url') || urlParser.param('md')
if url
  $.get url, createSlides

###
Create drop zone using AngularJs
###
drop = angular.module 'markdown-drop', []

drop.directive 'dropzone', ->
  restrict: 'A'
  replace: false
  controller: ($scope) ->
    $scope.tryItNow = ->
      md = $('#explanation')[0].innerHTML
      createSlides md

  link: (scope, element, attrs) ->
    startDrag = (event) ->
      element.addClass 'dragging'
      if event.preventDefault
        event.preventDefault()
      event.originalEvent.dataTransfer.effectAllowed = 'copy'
      return false

    stopDrag = (event) ->
      element.removeClass 'dragging'
      if event.preventDefault
        event.preventDefault()
      return false

    onDrop = (event) ->
      stopDrag(event)
      if event.preventDefault
        event.preventDefault()
      file = event.originalEvent.dataTransfer.files[0]
      if checkFilename(file.name)
        reader = new FileReader()
        reader.onload = (evt) ->
          createSlides evt.target.result, file.name
        reader.readAsText file
      #else
      #  console.error 'Only Markdown documents should be droppped'
      false

    # for dragover and dragenter (IE) we stop the browser from handling the
    # event and specify copy as the allowable effect
    element.on 'dragenter', startDrag
    element.on 'dragover', startDrag
    element.on 'dragleave', stopDrag

    # on drop events we stop browser and read the dropped file via the FileReader
    # the resulting droped file is bound to the image property of the scope of this directive
    element.on 'drop', onDrop

