gt.module 'options parser'

parser = require '../options'
isOption = parser.isSlideOptionLine
parse = parser.getSlidesNowOptions

gt.test 'basics', ->
    gt.func isOption

gt.test 'positive options', ->
    gt.ok isOption '[slides-now-theme]: "classic"'
    gt.ok isOption '[slides-now-footer]: "My talk"'
    gt.ok isOption '[slides-now-footer]: "presentation"'
    gt.ok isOption '[slides-now-font-family]: "Arial"'
    gt.ok isOption '[slides-now-font-family]: "Arial Narrow"'
    gt.ok isOption '[slides-now-font-size]: "26pt"'

gt.test 'footer or title', ->
    gt.ok isOption '[slides-now-footer]: "My talk"'
    gt.ok isOption '[slides-now-footer]: "@bahmutov"'
    gt.ok isOption '[slides-now-footer]: "presentation by @bahmutov"'
    gt.ok isOption '[slides-now-title]: "presentation by @bahmutov"'

gt.module 'parse footer'

gt.test 'get correct footer', ->
  opts = parse '[slides-now-footer]: "My talk"'
  gt.equal opts.footer, 'My talk', 'correct title'

  opts = parse '[slides-now-footer]: "My talk @bahmutov"'
  gt.equal opts.footer, 'My talk @bahmutov', 'twitter handle'

gt.module 'removing options lines'
remove = parser.removeOptionsLines

md = """
first
[slides-now-theme]: "classic"
[slides-now-footer]: "fake title"
second

[slides-now-title]: "My-talk by @bahmutov"

"""

gt.test 'removing options lines at the end only', ->
    gt.func remove
    cleaned = remove md
    console.log cleaned
    gt.ok /\[slides-now-theme\]:\ \"classic\"/.test cleaned, 'kept first option'
    gt.ok !/slides-now-title/.test(cleaned), 'removed second option'

gt.module 'parsing options'

gt.test 'grab only options at the end', ->
    opts = parse md
    gt.object opts, 'got an options object'
    gt.equal opts.title, 'My-talk by @bahmutov', 'correct footer'
    gt.undefined opts.theme, 'theme should not be parsed, not at the end'
