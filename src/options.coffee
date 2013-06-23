slidesNowOption = /^\[slides-now-([\w-]+)\]\:\s*\"([\w\W]+)\"$/

isSlideOptionLine = (line) -> slidesNowOption.test(line)

getSlidesNowOptions = (md) ->
  options = {}
  lines = md.split '\n'
  lines.forEach (line) ->
    line = line.trim()
    if isSlideOptionLine(line)
      matches = slidesNowOption.exec line
      if matches.length != 3
        throw new Error 'Could not match line ' + line
      options[matches[1]] = matches[2]
  options

removeOptionsLines = (md) ->
  lines = md.split('\n').reverse()
  foundNonOptionLine = false
  filtered = lines.filter (line) ->
    line = line.trim()
    if foundNonOptionLine || !isSlideOptionLine(line)
      foundNonOptionLine = true
      true

  filtered.reverse().join('\n')

module.exports =
  getSlidesNowOptions: getSlidesNowOptions
  removeOptionsLines: removeOptionsLines
  isSlideOptionLine: isSlideOptionLine