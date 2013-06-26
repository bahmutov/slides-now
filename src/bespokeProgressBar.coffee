bar = null
timerBar = null

bespoke.plugins.progressBar = (deck) ->
  if bar? then bar.remove()
  bar = progressFullWidth
    height: 5
    color: '#222222'
  timerBar = null
  deck.on 'activate', (e) ->
    if deck.slides.length
      progress = (e.index + 1) / deck.slides.length * 100
      bar.progress progress

bespoke.plugins.progressBar.timer = (durationSeconds) ->
  if timerBar? then timerBar.remove()
  timerBar = progressFullWidth
    height: 5
    color: '#888888'
    timer: durationSeconds
