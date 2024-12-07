const reserved: {[key: string]: string[]} = {
  'reds': ['function', 'var', 'let', 'enum', 'const', 'signal', 'class', 'class_name', 'extends', 'func', 'in', 'on', 'true', 'false', 'await', 'or', 'self', 'export'],
  'pinks': ['match', 'pass', 'for', 'if', 'else', 'elif', 'continue', 'break', 'return'],
  'greens': ['void', 'int', 'integer', 'bigint', 'string', 'bool', 'boolean', 'vector2', 'vector3', 'Dictionary', 'Array', 'log'],
  'mustards': ['@onready', '@export', '@export_category', '@export_color_no_alpha', '@export_dir', '@export_enum', '@export_exp_easing', '@export_file', '@export_flags', '@export_group', '@export_range', '@export_subgroup', '@icon', '@onready', '@rpc', '@static_unload', '@tool', '@warning_ignore', 'console'],
  'purples': ['load', 'range', 'str', 'preload', 'floor', 'print', ''],
  'blues': ['!', '!=', '!==', '=', '==', '===', '&&', '||', '|', ':', '.', ',', '(', ')', '[', ']', '{', '}', '->', '=>', '()', ';', '+', '++', '--', '-', '+', '>', '<', '<=', '>=', '*', '/', '%' ]
}

export const applyHighlighting = (text: string, rule: (word: string, prevWord: string | null, nextWord: string | null) => string): string => {
  const words = text.split(/(\s+)/);
  return words.map((word, index) => {
    const prevWord = index > 0 ? words[index - 1] : null;
    const nextWord = index < words.length - 1 ? words[index + 1] : null;
    const color = rule(word, prevWord, nextWord);
    return color ? `<span class="${color}">${word}</span>` : word;
  }).join('');
};

let simples:number = 0
let composta:number = 0
let negation:number = 0
let savedWord:string = ''

function limitChekcer() {
  if (simples >= 2) {
    simples = 0
  }
  if (composta >= 2) {
    composta = 0
  }
  if (negation >= 1) {
    negation = 0
  }
}

export function simpleStringChecker(word:string): string {
  for (let x = 0; x < word.length; x++) {
    if (word[x] === "'" && (x === 0 || x === word.length - 1)) {
      simples++
    }
  }

  if (simples <= 2 && simples >= 1) {
    limitChekcer()
    return 'yellow'
  } else if (simples > 2) {
    limitChekcer()
    return ''
  }

  limitChekcer()
  return ''
}

export function compoundStringChecker(word:string): string {
  for (let x = 0; x < word.length; x++) {
    if (word[x] === '"'  && (x === 0 || x === word.length - 1)) {
      composta++
    }
  }

  if (composta >= 1 && composta <= 2) {
    limitChekcer()
    return 'yellow'
  } else if (composta > 2) {
    limitChekcer()
    return ''
  }

  limitChekcer()
  return ''
}

export function negationChecker(word:string): string {
  for (let x = 0; x < word.length; x++) {
    if (word[x] === '!' && x === 0) {
      console.log(word)
      negation++
    }
  }

  if (negation > 0) {
    limitChekcer()
    return 'blue'
  }

  limitChekcer()
  return ''
}

export function numericChecker(word:string): string {
  if (!isNaN(parseFloat(word))) {
    return 'green'
  }

  return ''
}

export function isUrlString(word:string): string {
  for (let x = 0; x < word.length; x++) {
    if (word[x] === '$' && x === 0) {
      return 'darkgreen'
    }
  }

  return ''
}

export function isCallableString(word:string): string {
  for (let x = 0; x < word.length; x++) {
    if (word[x] === '.') {
      return 'lightblue'
    }
  }

  return ''
}

export function isDeclaration(word:string, prevWord: string | null): string {
  if (!prevWord) {
    return ''
  }

  if (reserved.reds.includes(prevWord)) {
    if (word === ' ') {
      savedWord = prevWord
    } else {
      return 'lightblue'
    }

  } else if (prevWord === ' ') {
    if (reserved.reds.includes(savedWord) &&  word !== ' ') {
      savedWord = ''
      return 'lightblue'
    }
  }

  return ''
}

export const keywordRules = (word: string): string => {
  for (const [color, words] of Object.entries(reserved)) {
    if (words.includes(word)) return color;
  }

  return '';
};

