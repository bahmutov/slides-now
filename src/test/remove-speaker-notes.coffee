gt.module 'remove speaker notes'

remove = require '../remove-speaker-notes'

text1 = """
start

```notes
and these are speaker notes
```

text after
"""

gt.test 'remove notes 1', ->
  removed = remove text1
  console.log removed
  gt.string removed, 'returns string'
  gt.ok /start/g.test(removed), 'keeps first line'
  gt.ok /text\ after/g.test(removed), 'keeps last line'
  gt.ok !/speaker\ notes/.test(removed), 'removed speaker notes'
