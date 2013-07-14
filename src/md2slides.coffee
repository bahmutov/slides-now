check = require 'check-types'
markdown = require 'marked'

directLinksToNewTab = (html) ->
  check.verifyString html, 'expected html string'

  html.replace '<a href=', '<a target="_blank" href='

parse = (md) ->
  check.verifyString md, 'expected markdown text'

  mdParts = md.split '\n\r\n\r\n\r'
  htmlParts = mdParts.map (mdPart) ->
    trimmed = mdPart.trim()
    html = markdown trimmed
    html = directLinksToNewTab html
    html.trim()

module.exports = parse
