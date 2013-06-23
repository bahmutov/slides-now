# allows to control slides using Page Up / Down keys
bespoke.plugins.pageUpDown = (deck) ->
  document.addEventListener 'keydown', (e) ->
    key = e.which
    if key == 33 then deck.prev()
    if key == 34 then deck.next()