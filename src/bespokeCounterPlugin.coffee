bespoke.plugins.slideCounter = (deck) ->
  deck.on 'activate', (e) ->
    message = (e.index + 1) + ' / ' + deck.slides.length
    $('aside#counter').text message