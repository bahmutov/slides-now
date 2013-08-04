# allows to cycle through themes using key presses
# todo: namespace the theme names internally
themes = ['classic', 'cube', 'coverflow', 'bw', 'concave', 'carousel']

findCurrentTheme = ->
  $body = $('body')
  currentThemeIndex = -1
  themes.forEach (theme, index)->
    if $body.hasClass(theme) then currentThemeIndex = index
  return currentThemeIndex

changeTheme = (e) ->
  key = e.which
  if key == 84
    themeIndex = findCurrentTheme()
    # todo check if index is valid
    themeClass = themes[themeIndex]
    
    nextThemeIndex = (themeIndex + 1) % themes.length
    nextTheme = themes[nextThemeIndex]

    $('body').removeClass(themeClass).addClass(nextTheme)

bespoke.plugins.themes = (deck) ->
  document.removeEventListener 'keydown', changeTheme
  document.addEventListener 'keydown', changeTheme
