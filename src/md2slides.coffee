check = require 'check-types'

parse = (md) ->
  check.verifyString md, 'expected markdown text'

  mdParts = md.split '\n\r\n\r\n\r'
  htmlParts = mdParts.map (mdPart) ->
    trimmed = mdPart.trim()
    markdown.toHTML trimmed

module.exports = parse
