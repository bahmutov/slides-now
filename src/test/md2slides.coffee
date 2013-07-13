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
	console.log html
	gt.string html, 'got html back'
	lines = html.split '\n'
	gt.equal lines.length, 4
	gt.ok /<p>normal text<\/p>/.test lines[0]
	gt.ok /<pre><code>code1/.test lines[2]
	gt.ok /code2<\/code><\/pre>/.test lines[3]
