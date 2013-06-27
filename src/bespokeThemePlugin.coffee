# allows to cycle through themes using key presses
themes = ['classic', 'cube', 'coverflow', 'bw', 'concave', 'carousel']

findCurrentTheme = ->
    $body = $('body')
    currentThemeIndex = -1
    themes.forEach (theme, index)->
        if $body.hasClass(theme) then currentThemeIndex = index
    return currentThemeIndex

bespoke.plugins.themes = (deck) ->
  document.addEventListener 'keydown', (e) ->
    key = e.which
    if key == 84
        themeIndex = findCurrentTheme()
        nextThemeIndex = (themeIndex + 1) % themes.length
        nextTheme = themes[nextThemeIndex]
        $('body').removeClass().addClass(nextTheme)
