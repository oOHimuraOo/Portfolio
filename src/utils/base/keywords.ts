const reserved: { [key: string]: string[] } = {
  reds: [
    'function',
    'var',
    'let',
    'enum',
    'const',
    'signal',
    'class',
    'class_name',
    'extends',
    'func',
    'in',
    'on',
    'true',
    'false',
    'await',
    'or',
    'self',
    'override',
    'base',
    'godot',
    'Godot',
    'system',
    'System',
    'from',
    'import',
  ],
  pinks: ['match', 'pass', 'for', 'if', 'else', 'elif', 'continue', 'break', 'return', 'return;'],
  greens: [
    'void',
    'int',
    'integer',
    'bigint',
    'string',
    'bool',
    'boolean',
    'vector2',
    'vector3',
    'Dictionary',
    'Array',
    'log',
  ],
  mustards: [
    'onready',
    'export',
    'export_category',
    'export_color_no_alpha',
    'export_dir',
    'export_enum',
    'export_exp_easing',
    'export_file',
    'export_flags',
    'export_group',
    'export_range',
    'export_subgroup',
    'icon',
    'onready',
    'rpc',
    'static_unload',
    'tool',
    'warning_ignore',
    'console',
    'Export',
    'partial',
    'using',
    '@',
    'def',
  ],
  purples: [
    'load',
    'range',
    'str',
    'preload',
    'floor',
    'print',
    'public',
    'private',
    'protected',
    '',
  ],
  blues: [
    '!',
    '!=',
    '!==',
    '=',
    '==',
    '===',
    '&&',
    '||',
    '|',
    ':',
    '.',
    ',',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '->',
    '=>',
    '()',
    ';',
    '+',
    '++',
    '--',
    '-',
    '+',
    '>',
    '<',
    '<=',
    '>=',
    '*',
    '/',
    '%',
  ],
}

type Rule = {
  regex: RegExp
  className: string
}

const rules: Rule[] = [
  {
    regex:
      /\b(function|func|from|const|enum|signal|class|class_name|extends|await|system|System|import|onready|export|export_category|export_color_no_alpha|export_dir|export_enum|export_exp_easing|export_file|export_flags|export_group|export_range|export_subgroup|rpc|static_unload|tool|interface|namespace)\b/g,
    className: 'reds',
  },
  { regex: /\b(var|let|or|and|in|on|self|base|null|undefined)\b/g, className: 'mustards' },
  {
    regex: /\b(match|pass|for|if|else|elif|continue|break|return|try|catch|finally|throw)\b/g,
    className: 'pinks',
  },
  {
    regex:
      /\b(void|int|integer|bigint|string|bool|boolean|vector2|vector3|Dictionary|Array|log|float|double)\b/g,
    className: 'greens',
  },
  {
    regex:
      /\b(load|range|str|preload|floor|print|public|private|protected|static|final|abs|max|min)\b/g,
    className: 'purples',
  },
  //{ regex: /\".*?"|'.*?'/g, className: 'yellow' },
  { regex: /\b\d+(\.\d+)?\b/g, className: 'blue' },
  { regex: /\/\/.*|\/\*[\s\S]*?\*\//g, className: 'grays' },
]

// export function highlight(text:string): string {
//   let highlighted:string = text
//   let spanCounter:number = 0

//   rules.forEach((rule) => {
//     for (let x = 0; x < highlighted.length; x++) {
//       if (highlighted.slice(x, x + 5) === "<span") {
//         console.log("a")
//         spanCounter++
//         x += 4
//       }
//       if (highlighted.slice(x, x + 7) === "</span>") {
//         console.log("b")
//         spanCounter++
//         x += 6
//       }

//     }
//     console.log(spanCounter)
//     if (spanCounter > 0) {
//       highlighted = highlighted.replace(rule.regex, (match) => {
//         return match
//       })
//     } else {
//       highlighted = highlighted.replace(rule.regex, (match) => {
//         return `<span class="${rule.className}">${match}</span>`
//       })
//     }

//     if (spanCounter >= 2) {
//       spanCounter = 0
//     }
//   }
// )

//   return highlighted
// }

// export function highlight(text: string): string {
//   let highlighted = ''
//   let spanCounter = 0
//   let buffer = ''

//   const processBuffer = () => {
//     rules.forEach((rule) => {
//       buffer = buffer.replace(rule.regex, (match) => {
//         return `<span class="${rule.className}">${match}</span>`
//       })
//     })
//     highlighted += buffer
//     console.log(buffer)
//     buffer = ''
//   }

//   for (let i = 0; i < text.length; i++) {
//     const char = text[i]
//     if (text.slice(i, i + 5) === '<span') {
//       spanCounter++
//       processBuffer()
//       highlighted += '<span'
//       i += 4
//     } else if (text.slice(i, i + 7) === '</span>') {
//       spanCounter++
//       highlighted += '</span>'
//       i += 6
//     } else if (spanCounter > 0) {
//       highlighted += char
//     } else {
//       buffer += char
//     }
//     console.log(spanCounter)
//   }
//   if (buffer) {
//     processBuffer()
//   }

//   return highlighted
// }

export function highlight(text: string): string {
  let highlighted = text
  rules.forEach((rule) => {
    highlighted = highlighted.replace(rule.regex, (match) => {
      console.log(match)
      if (match.startsWith('<span') && match.endsWith('</span>')) {
        return match
      }
      return `<span class="${rule.className}">${match}</span>`
    })
  })
  return highlighted
}

// export function highlightTextForRule(
//   html: string,
//   rule: (word: string, prevWord: string | null, nextWord: string | null) => string,
// ): string {
//   const parser = new DOMParser()
//   const doc = parser.parseFromString(html, 'text/html')

//   function processNode(node: Node) {
//     if (node.nodeType === Node.TEXT_NODE) {
//       if (
//         node.parentElement &&
//         node.parentElement.tagName.toLowerCase() === 'span' &&
//         node.parentElement.getAttribute('class')
//       ) {
//         return
//       }

//       const originalText = node.nodeValue || ''
//       const highlighted = applyHighlighting(originalText, rule)

//       const fragment = document.createRange().createContextualFragment(highlighted)
//       node.replaceWith(fragment)
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       if (node.nodeName.toLowerCase() === 'span' && node.getAttribute('class')) {
//         return
//       }
//       node.childNodes.forEach((child) => processNode(child))
//     }
//   }

//   processNode(doc.body)
//   return doc.body.innerHTML
// }

// export const applyHighlighting = (
//   text: string,
//   rule: (word: string, prevWord: string | null, nextWord: string | null) => string,
// ): string => {
//   const tokens = text.match(/(\s+|[A-Za-zÀ-ÖØ-öø-ÿ0-9_]+|[^\sA-Za-zÀ-ÖØ-öø-ÿ0-9_])/g) || []

//   return tokens
//     .map((token, index) => {
//       if (/^\s+$/.test(token)) {
//         return token
//       }

//       const prevToken = index > 0 ? tokens[index - 1] : null
//       const nextToken = index < tokens.length - 1 ? tokens[index + 1] : null
//       const color = rule(token, prevToken, nextToken)
//       return color ? `<span class="${color}">${token}</span>` : token
//     })
//     .join('')
// }

// let simples: number = 0
// let composta: number = 0
// let negation: number = 0
// let savedWord: string = ''
// let emComposta: boolean = false

// function limitChekcer() {
//   if (simples >= 2) {
//     simples = 0
//   }
//   if (composta > 2) {
//     composta = 0
//   }
//   if (negation >= 1) {
//     negation = 0
//   }
// }

// export function simpleStringChecker(
//   word: string,
//   prev: string | null,
//   next: string | null,
// ): string {
//   if (word.trim() === "'") {
//     const anterior = prev ? prev.trim() : ''
//     const proximo = next ? next.trim() : ''

//     if (/[A-Za-z]$/.test(anterior) && /^[A-Za-z]/.test(proximo)) {
//       return ''
//     } else {
//       return 'yellow'
//     }
//   }

//   const trimmed = word.trim()
//   if (trimmed.startsWith("'") || trimmed.endsWith("'")) {
//     return 'yellow'
//   } else {
//     return ''
//   }
// }

// export function compoundStringChecker(
//   word: string,
//   prev: string | null,
//   next: string | null,
// ): string {
//   const trimmed = word.trim()
//   const anterior = prev?.trim()
//   const proximo = next?.trim()

//   if (trimmed === '"') {
//     emComposta = !emComposta
//     return 'yellow'
//   }

//   if (emComposta) {
//     return 'yellow'
//   }

//   return ''
// }

// export function negationChecker(word: string): string {
//   for (let x = 0; x < word.length; x++) {
//     if (word[x] === '!' && x === 0) {
//       negation++
//     }
//   }

//   if (negation > 0) {
//     limitChekcer()
//     return 'blue'
//   }

//   limitChekcer()
//   return ''
// }

// export function numericChecker(word: string): string {
//   if (!isNaN(parseFloat(word))) {
//     return 'green'
//   }

//   return ''
// }

// export function isUrlString(word: string): string {
//   for (let x = 0; x < word.length; x++) {
//     if (word[x] === '$' && x === 0) {
//       return 'darkgreen'
//     }
//   }

//   return ''
// }

// export function isCallableString(word: string): string {
//   for (let x = 0; x < word.length; x++) {
//     if (word[x] === '.') {
//       return 'lightblue'
//     }
//   }

//   return ''
// }

// export function isDeclaration(word: string, prevWord: string | null): string {
//   if (!prevWord) {
//     return ''
//   }

//   if (reserved.reds.includes(prevWord)) {
//     if (word === ' ') {
//       savedWord = prevWord
//     } else {
//       return 'lightblue'
//     }
//   } else if (prevWord === ' ') {
//     if (reserved.reds.includes(savedWord) && word !== ' ') {
//       savedWord = ''
//       return 'lightblue'
//     }
//   }

//   return ''
// }

// export const keywordRules = (word: string): string => {
//   for (const [color, words] of Object.entries(reserved)) {
//     if (words.includes(word)) return color
//   }

//   return ''
// }
