gt.module 'options parser'

parser = require '../options'
isOption = parser.isSlideOptionLine

gt.test 'basics', ->
    gt.func isOption

gt.test 'positive options', ->
    gt.ok isOption '[slides-now-theme]: "classic"'
    gt.ok isOption '[slides-now-footer]: "My talk"'
    gt.ok isOption '[slides-now-footer]: "presentation"'
    gt.ok isOption '[slides-now-font-family]: "Arial"'
    gt.ok isOption '[slides-now-font-family]: "Arial Narrow"'
    gt.ok isOption '[slides-now-font-size]: "26pt"'

gt.module 'removing options lines'
remove = parser.removeOptionsLines

md = """
first
[slides-now-theme]: "classic"
second

[slides-now-footer]: "My talk"
"""

gt.test 'removing options lines at the end only', ->
    gt.func remove
    cleaned = remove md
    console.log cleaned
    gt.ok /\[slides-now-theme\]:\ \"classic\"/.test cleaned, 'kept first option'
    gt.ok !/slides-now-footer/.test(cleaned), 'removed second option'

gt.module 'parsing options'
parse = parser.getSlidesNowOptions

gt.test 'grab only options at the end', ->
    opts = parse md
    gt.object opts, 'got an options object'
    gt.equal opts.footer, 'My talk', 'correct footer'
    gt.undefined opts.theme, 'theme should not be parsed, not at the end'