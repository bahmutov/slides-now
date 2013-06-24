# allows to control slides using Page Up / Down keys
bespoke.plugins.pageUpDown = (deck) ->
  document.addEventListener 'keydown', (e) ->
    key = e.which
    if key == 36 then bespoke.slide(0) # home key
    if key == 35 then bespoke.slide(deck.slides.length - 1) # end key