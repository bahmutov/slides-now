drop = angular.module 'markdown.drop', []

drop.directive 'dropzone', ->
  restrict: 'A'
  scope: {}
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
        if /\.md$/.test file.name
          reader = new FileReader()
          reader.onload = (evt) ->
            createSlides evt.target.result
          reader.readAsText file
        else
          console.error 'Only Markdown documents should be droppped'
        return false
      , false

      createSlides = (md) ->
        element.remove()
        mdToPresentation md