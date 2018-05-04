const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const highlightJs = require('highlightjs/highlight.pack.js');
const fs = require('fs');

var md = markdownIt({
        linkify: true, html: true,
        highlight: function (str, lang) {
            if (highlightJs.getLanguage(lang)) {
                try {
                    return '<pre class="highlight lang-' + lang + '"><code>' +
                        highlightJs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) { }
            }

            return '<pre class="highlight"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    .use(markdownItAttrs);

var html = md.render('# Example\n' + 
'\n' + 
'```javascript {.some-class}\n' +
'function helloWorld() {\n' +
'  return \'Hello, World!\';\n' +
'}\n' +
'```\n' + 
'\n');

fs.writeFileSync('index.html', html);
