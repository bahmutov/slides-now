drop = angular.module 'markdown.drop', []

console.log 'drop module'

drop.directive 'dropzone', ->
  restrict: 'A'
  scope: {}
  link: (scope, element, attrs) ->
      console.log 'linking dropzone'

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
          console.log 'dropped file', file
          reader = new FileReader()
          reader.onload = (evt) ->
            # console.log 'file contents\n' + evt.target.result
            createSlides evt.target.result
          reader.readAsText file
        else
          console.error 'Only Markdown documents should be droppped'
        return false
      , false

      createSlides = (md) ->
        console.log 'creating slides'
        element.remove()
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

        # console.log 'converted markdown to\n' + $article.innerHTML
        bespoke.horizontal.from 'article'