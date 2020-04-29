const {
    stringStartsWith,
    segmentsStartWith
} = require('./')

test('pkg import should ok', () => {
    expect(stringStartsWith).toBeDefined()
    expect(segmentsStartWith).toBeDefined()
})

test('pkg should be a fn', () => {
    expect(typeof stringStartsWith).toEqual('function')
    expect(typeof segmentsStartWith).toEqual('function')
})

test('call stringStartsWith should return a middleware fn', () => {
    const middleware = stringStartsWith('/', () => { })
    expect(middleware).toBeDefined()
    expect(typeof middleware).toEqual('function')
})

test('call segmentsStartWith should return a middleware fn', () => {
    const middleware = segmentsStartWith('/', () => { })
    expect(middleware).toBeDefined()
    expect(typeof middleware).toEqual('function')
})

test('call stringStartsWith should return a middleware fn', () => {
    const middleware = stringStartsWith('/', () => { })
    expect(middleware).toBeDefined()
    expect(typeof middleware).toEqual('function')
})

test('segmentsStartWith returned middleware should has a name', () => {
    const middleware = segmentsStartWith('/', () => { })
    expect(middleware.name).toBeDefined()
    expect(typeof middleware.name).toEqual('string')
    expect(middleware.name.length).toBeGreaterThan(0)
})

test('call by a empty path shoud not throw', () => {
    expect(() => stringStartsWith('', () => { })).not.toThrow()
    expect(() => segmentsStartWith('', () => { })).not.toThrow()
})

test('call by a non-string path shoud throw', () => {
    expect(() => stringStartsWith(undefined, () => { })).toThrow()
    expect(() => stringStartsWith(1, () => { })).toThrow()
    expect(() => stringStartsWith(NaN, () => { })).toThrow()
    expect(() => stringStartsWith(null, () => { })).toThrow()
    expect(() => stringStartsWith({}, () => { })).toThrow()
    expect(() => stringStartsWith([], () => { })).toThrow()
    expect(() => stringStartsWith(() => { }, () => { })).toThrow()

    expect(() => segmentsStartWith(undefined, () => { })).toThrow()
    expect(() => segmentsStartWith(1, () => { })).toThrow()
    expect(() => segmentsStartWith(NaN, () => { })).toThrow()
    expect(() => segmentsStartWith(null, () => { })).toThrow()
    expect(() => segmentsStartWith({}, () => { })).toThrow()
    expect(() => segmentsStartWith([], () => { })).toThrow()
    expect(() => segmentsStartWith(() => { }, () => { })).toThrow()
})

test('call by a non-fn middelware shoud throw', () => {
    expect(() => stringStartsWith('', 1)).toThrow()
    expect(() => stringStartsWith('', 1.0)).toThrow()
    expect(() => stringStartsWith('', NaN)).toThrow()
    expect(() => stringStartsWith('', Infinity)).toThrow()
    expect(() => stringStartsWith('', null)).toThrow()
    expect(() => stringStartsWith('', {})).toThrow()
    expect(() => stringStartsWith('', [])).toThrow()
    expect(() => stringStartsWith('', '1')).toThrow()
    expect(() => stringStartsWith('', '/image')).toThrow()
    expect(() => stringStartsWith('', undefined)).toThrow()

    expect(() => segmentsStartWith('', 1)).toThrow()
    expect(() => segmentsStartWith('', 1.0)).toThrow()
    expect(() => segmentsStartWith('', NaN)).toThrow()
    expect(() => segmentsStartWith('', Infinity)).toThrow()
    expect(() => segmentsStartWith('', null)).toThrow()
    expect(() => segmentsStartWith('', {})).toThrow()
    expect(() => segmentsStartWith('', [])).toThrow()
    expect(() => segmentsStartWith('', '1')).toThrow()
    expect(() => segmentsStartWith('', '/image')).toThrow()
    expect(() => segmentsStartWith('', undefined)).toThrow()
})

test('stringStartsWith: path prefix uses relative pathes', async () => {

    const ctx = {
        path: '/api/v1/cat'
    }

    // ctx.path = '/api/v1/cat'
    const prefixes = [
        // prefix path: matched
        { '/': true },
        { '/api': true },
        { '/api/': true },
        { '/api/v1': true },
        { '/api/v1/cat': true },
        { '/api/v1/cat/': false },
        { '/api/v1/cat//': false },
        { '/api/v1/cat/jafee': false },
        { '/api/v2': false },
        { '/api/v2/cat': false },
        { '/api/v11': false },
        { '/page': false },
        { '/capi': false },
        { '/apint': false },
        { '/api/cat/../': false },
        { '/api/../../': false },
        { '/api/../../../../cat/../api': false },
        { 'http://a:b@h/api': false },
        { '/a:g': false },
        { '@': false }
    ]
    const fns = prefixes.map((obj, i) => {
        const [k, v] = Object.entries(obj)[0]
        return async () => {
            const prefix = k
            const shouldMathed = v
            
            const upstream = jest.fn().mockImplementation(() => {
            })
            const downstream = jest.fn().mockImplementation(() => {
            })

            const middleware = stringStartsWith(prefix, downstream)
            await middleware(ctx, upstream)

            console.table([{
                "type": "stringStartsWith",
                "index in prefixes": i,
                "obj in prefixes": obj,
                "prefix": prefix,
                "ctx.path": ctx.path,
                "should matched": shouldMathed
            }])

            shouldMathed ? expect(downstream).toBeCalled() : expect(downstream).not.toBeCalled()
            expect(upstream).toBeCalled()
        }
    })
     fns.map(async f => await f())
})

test('segmentsStartWith: path prefix uses relative pathes', async () => {

    const ctx = {
        path: '/api/v1/cat'
    }

    // ctx.path = '/api/v1/cat'
    const prefixes = [
        // prefix path: matched
        { '/': true },
        { '/api': true },
        { '/api/': true },
        { '/api/v1': true },
        { '/api/v1/cat': true },
        { '/api/v1/cat/': true },
        { '/api/v1/cat//': false },
        { '/api/v1/cat/jafee': false },
        { '/api/v2': false },
        { '/api/v2/cat': false },
        { '/api/v11': false },
        { '/page': false },
        { '/capi': false },
        { '/apint': false },
        { '/api/cat/../': true },
        { '/api/../../': true },
        { '/api/../../../../cat/../api': true },
        { 'http://a:b@h/api': true },
        { '/a:g': false },
        { '@': false }
    ]
    const fns = prefixes.map((obj, i) => {
        const [k, v] = Object.entries(obj)[0]
        return async () => {
            const prefix = k
            const shouldMathed = v
            
            const upstream = jest.fn(() => {})
            const downstream = jest.fn()

            const middleware = segmentsStartWith(prefix, downstream)
            await middleware(ctx, upstream)

            console.table([{
                "type": "segmentsStartWith",
                "index in prefixes": i,
                "obj in prefixes": obj,
                "prefix": prefix,
                "ctx.path": ctx.path,
                "should matched": shouldMathed
            }])

            shouldMathed ? expect(downstream).toBeCalled() : expect(downstream).not.toBeCalled()
            expect(upstream).toBeCalled()
        }
    })
    fns.map(async f => await f())
})
