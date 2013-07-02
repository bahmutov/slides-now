p = window.progressFullWidth

p.bar = null
p.timerBar = null
activeDeck = null
isPaused = false

bespoke.plugins.progressBar = (deck) ->
  # console.log 'progressBar plugin, deck with', deck.slides.length, 'slides'
  if p.bar? then p.bar.remove()

  activeDeck = deck
  numberSlides = deck.slides.length
  p.bar = p
    height: 5
    color: '#AAAAAA'
  deck.on 'activate', (e) ->
    if activeDeck == deck && numberSlides
      # console.log 'activate slide', e.index
      progress = e.index / (numberSlides - 1)* 100
      if progress < 0 then progress = 0
      if progress > 100 then progress = 100
      p.bar.progress progress

    document.addEventListener 'keydown', (e) ->
      if activeDeck == deck && numberSlides
        key = e.which
        if key == 80 and p.timerBar?
          if isPaused
            p.timerBar.resume()
            isPaused = false
          else
            p.timerBar.pause()
            isPaused = true

bespoke.plugins.progressBar.removeTimer = () ->
  if p.timerBar? then p.timerBar.remove()

bespoke.plugins.progressBar.timer = (durationSeconds) ->
  if p.timerBar? then p.timerBar.remove()
  if !durationSeconds then return

  p.timerBar = p
    height: 5
    color: '#888888'
    timer: durationSeconds
    bottom: true
