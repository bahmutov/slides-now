# allows to control slides using Page Up / Down keys
bespoke.plugins.keyShortcuts = (deck) ->
  document.addEventListener 'keydown', (e) ->
    key = e.which
    if key == 33 then deck.prev() # page down
    if key == 34 then deck.next() # page up
    if key == 36 then bespoke.slide(0) # home key
    if key == 35 then bespoke.slide(deck.slides.length - 1) # end key