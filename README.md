# koa-contrib-pathstartswith

a koa middleware that call an user defined middleware when ctx.path starts with a prefix string, when string matched or path segments matched

This is a replacement for `koa-mount`.

## How it works

There are two middlewares.

- `stringStartsWith` matched if `ctx.path` has a given `prefix string`, just simple string compare.
- `segmentsStartWith` matched if path segments (path & prefix string splited by '/') match.

## Usage

Install via npm or yarn.

```sh
# for npm
npm i --save koa-contrib-pathstartswith
# for yarn
yarn add koa-contrib-pathstartswith
```

Use as a Koa middleware in your app.

```js
// import it
const {
    stringStartsWith,
    segmentsStartWith
} = require('koa-contrib-pathstartswith')

// use stringStartsWith, prefix `/ipad`.
// urls below
//        /ipad/
//        /ipad-pro/
//        /ipad-10.2/
//        /ipad-10.2/why-ipad/
//        /ipad-10.2/specs/
//        /ipad-mini/
//        /ipad-compare/
//        /ipad-keyboards/
//        /ipados/
//        /ipad/why-ipad/
//        /ipad/business/
// will be matched.
// below
//       /education/ipad/
//       /buy_ipad/ipad_10_2/
// will not matched.
app.use(stringStartsWith('/ipad', myMiddleware1))

// use stringStartsWith, prefix `/ipad/`.
// urls below
//        /ipad/
//        /ipad/why-ipad/
//        /ipad/business/
// will be matched.
// and below
//        /ipad-pro/
//        /ipad-10.2/
//        /ipad-10.2/why-ipad/
//        /ipad-10.2/specs/
//        /ipad-mini/
//        /ipad-compare/
//        /ipad-keyboards/
//        /ipados/
//        /education/ipad/
//        /buy_ipad/ipad_10_2/
// will not matched.
app.use(stringStartsWith('/ipad/', myMiddleware2))

// use segmentsStartWith, prefix '/ipad' or '/ipad/'.
// urls below
//        /ipad/
//        /ipad/why-ipad/
//        /ipad/business/
// will be matched.
// and below
//        /ipad-pro/
//        /ipad-10.2/
//        /ipad-10.2/why-ipad/
//        /ipad-10.2/specs/
//        /ipad-mini/
//        /ipad-compare/
//        /ipad-keyboards/
//        /ipados/
//        /education/ipad/
//        /buy_ipad/ipad_10_2/
// will not matched.
app.use(segmentsStartWith('/ipad', myMiddleware3))
// or
app.use(segmentsStartWith('/ipad/', myMiddleware3))

// when matched, the middleware applied to it will be called.
```

## Compare to `koa-mount`

- These middlewares do not rewrite `ctx.path`, make things clearer.
- And do not mount Koa application.
- Simple and easy to use.

## LICENSE

[The MIT License](LICENSE).
