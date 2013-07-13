parse = require '../md2slides.coffee'

gt.module 'md2slides'

gt.test 'basics', ->
    gt.arity parse, 1, 'expect single input'

withCode = '''
normal text

    code1
    code2
'''

gt.test 'offset', ->
    parts = parse withCode
    gt.array parts
    gt.equal parts.length, 1
    html = parts.toString()
    # console.log html
    # console.log 'length', html.length
    gt.string html, 'got html back'
    lines = html.split '\n'
    gt.equal lines.length, 3
    gt.ok /<p>normal text<\/p>/.test lines[0]
    gt.ok /<pre><code>code1/.test lines[1]
    gt.ok /code2<\/code><\/pre>/.test lines[2]

gt.test 'offset with tabs', ->
    withTabs = withCode.replace '    ', '\t'
    parts = parse withTabs
    gt.array parts
    gt.equal parts.length, 1
    html = parts.toString()
    # console.log html
    # console.log 'length', html.length
