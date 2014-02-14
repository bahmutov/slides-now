slidesNowOption = /^\[slides-now-([\w-]+)\]\:\s*\"([\w\W\ ]+)\"$/

isSlideOptionLine = (line) -> slidesNowOption.test(line)

getSlidesNowOptions = (md) ->
  options = {}
  foundNonOptionLine = false

  lines = md.split('\n').reverse()
  lines.forEach (line) ->
    line = line.trim()
    if line == '' then return
    if foundNonOptionLine then return

    if isSlideOptionLine(line)
      matches = slidesNowOption.exec line
      if matches.length != 3
        throw new Error 'Could not match line ' + line
      options[matches[1]] = matches[2]
    else
      foundNonOptionLine = true
  options

removeOptionsLines = (md) ->
  lines = md.split('\n').reverse()
  foundNonOptionLine = false
  filtered = lines.filter (line) ->
    line = line.trim()
    if foundNonOptionLine then return true

    # do not keep empty lines at the end of the file
    if !line then return false
    if !isSlideOptionLine(line)
      foundNonOptionLine = true
      true

  filtered.reverse().join('\n')

module.exports =
  getSlidesNowOptions: getSlidesNowOptions
  removeOptionsLines: removeOptionsLines
  isSlideOptionLine: isSlideOptionLine
