parse = require '../md2slides.coffee'

gt.module 'md2slides'

gt.test 'basics', ->
    gt.arity parse, 1, 'expect single input'

withCode = '''
normal text

    code1
    code2
'''

twoSlides = '''
first slide

## second slide
'''

tripleDash = '''
first slide
---
second slide
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

gt.test 'triple blank windows', ->
	md = '''line\n\r\n\r\n\rline 2'''
	slides = parse md
	gt.equal slides.length, 2, 'two slides'

gt.test 'triple blank unix', ->
	md = '''line\n\n\nline 2'''
	slides = parse md
	gt.equal slides.length, 2, 'two slides'

gt.test 'separate by ##', ->
    slides = parse twoSlides
    gt.equal slides.length, 2, 'two slides'
    gt.ok /first slide/.test(slides[0]), 'first slide content', slides[0]
    gt.ok /second slide/.test(slides[1]), 'second slide content', slides[1]

gt.test 'separate by ---', ->
    slides = parse tripleDash
    console.log slides
    gt.equal slides.length, 2, 'two slides'
    gt.ok /first slide/.test(slides[0]), 'first slide content', slides[0]
    gt.ok /second slide/.test(slides[1]), 'second slide content', slides[1]
