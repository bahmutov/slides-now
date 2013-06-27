p = window.progressFullWidth

p.bar = null
p.timerBar = null

bespoke.plugins.progressBar = (deck) ->
  if p.bar? then p.bar.remove()

  p.bar = p
    height: 5
    color: '#222222'
  deck.on 'activate', (e) ->
    if deck.slides.length
      progress = e.index / (deck.slides.length - 1)* 100
      if progress < 0 then progress = 0
      if progress > 100 then progress = 100
      p.bar.progress progress

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
