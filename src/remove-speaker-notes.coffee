{verify} = require 'check-types'
S = require 'string'

removeSpeakerNotes = (md) ->
  verify.unemptyString md, 'missing text'
  lines = S(md).lines()
  notes = false
  lines = lines.filter (line) ->
    if !notes && line == '```notes'
      notes = true
      return
    if notes
      if line == '```'
        notes = false
      return
    true

  lines.join '\n'

module.exports = removeSpeakerNotes

