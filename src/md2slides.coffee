check = require 'check-types'
markdown = require 'marked'

parse = (md) ->
  check.verifyString md, 'expected markdown text'

  mdParts = md.split '\n\r\n\r\n\r'
  htmlParts = mdParts.map (mdPart) ->
    trimmed = mdPart.trim()
    html = markdown trimmed
    html.trim()

module.exports = parse
