const sanitizeHtml = require('sanitize-html');

function sanitizePostHtml(contentHtml) {
    return sanitizeHtml(contentHtml, {
        allowedTags: [
            'p',
            'h2',
            'ol',
            'ul',
            'li',
            'strong',
            'em',
            'figure',
            'img',
            'figcaption',
            'a',
            'span',
            'br',
            'blockquote',
        ],
        allowedAttributes: {
            a: ['href', 'target', 'rel'],
            img: ['src', 'alt', 'loading', 'decoding'],
            ol: ['class'],
            ul: ['class'],
            p: ['class', 'aria-label'],
            figure: ['class'],
            span: ['aria-hidden'],
        },
        allowedClasses: {
            ol: ['introList', 'introSublist'],
            ul: ['introList', 'introSublist'],
            p: ['theoryOfChange'],
            figure: ['articleFigure'],
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowProtocolRelative: false,
        transformTags: {
            a: (tagName, attributes) => ({
                tagName,
                attribs: {
                    ...attributes,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            }),
        },
        exclusiveFilter: frame => (
            frame.tag === 'img'
            && !frame.attribs.src?.startsWith('/assets/')
        ),
    });
}

module.exports = sanitizePostHtml;
