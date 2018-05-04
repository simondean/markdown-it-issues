const MarkdownIt = require('markdown-it');
const MarkdownItAttrs = require('markdown-it-attrs');
const HighlightJs = require('highlightjs/highlight.pack.js');

var md = MarkdownIt({
        linkify: true, html: true,
        highlight: function (str, lang) {
            if (HighlightJs.getLanguage(lang)) {
                try {
                    return '<pre class="highlight lang-' + lang + '"><code>' +
                        HighlightJs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) { }
            }

            return '<pre class="highlight"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    .use(MarkdownItAttrs);

var html = md.render('# Example\n' + 
'\n' + 
'```javascript {.some-class}\n' +
'function helloWorld() {\n' +
'  return \'Hello, World!\';\n' +
'}\n' +
'```\n' + 
'\n');

console.log(html);
