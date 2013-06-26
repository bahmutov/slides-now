bespoke.plugins.progressBar = (deck) ->
  progressFullWidth.remove()
  bar = progressFullWidth
    height: 5
    color: '#222222'
  deck.on 'activate', (e) ->
    if deck.slides.length
      progress = (e.index + 1) / deck.slides.length
      bar.progress progress*100
