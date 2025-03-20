export function highlight(text: string): string {
  const placeholders: string[] = []
  const placeholderPrefix = '_HIM'
  const placeholderSufix = '_URA'

  const store = (match: string, className: string): string => {
    const id = placeholders.length
    const placeholder = `${placeholderPrefix}${id}${placeholderSufix}`
    placeholders.push(`<span class="${className}">${match}</span>`)
    return placeholder
  }

  const processingOrder: Array<[RegExp, string]> = [
    [/(?<!\\)("(?:\\"|.)*?"|'(?:\\'|.)*?')/gs, 'strings'],
    [/(\/\/.*?$|\/\*[\s\S]*?\*\/|##?.*|<!--.*-->)/gm, 'comentarios'],
    [/(\/[^\/\n\\]*(?:\\.[^\/\n\\]*)*\/[gimsuy]*)/g, 'literais'],
    [/\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|0x[\da-fA-F]+\b/g, 'numeros'],
    [/(!=|!==|===?|&&|\|\||->|=>|\+\+|--|<=|>=|[+\-*/%=<>!&|?:;.,{}()[\]])/g, 'simbolos'],
    [/\b(func|var|let|function|enum|const|signal|class|class_name|extends|in|true|false|align|alt|height|width|src|href|src|on|await|or|self|override|base|system|System|from|import|def)\b/g, 'declaracoes'],
    [/\b(var|let|const|or|and|in|on|self|base|null|undefined)\b/g, 'modificadores'],
    [/\b(match|pass|for|if|else|elif|continue|break|return|switch|case)\b/g, 'flow'],
    [/\b(void|int|interger|bigint|string|String|bool|boolean|Vector2|Vector3|Dictionary|Array|log|div|img|a)\b/g, 'tipo'],
    [/\b(onready|export|export_category|export_color_no_alpha|export_dir|export_enum|export_exp_easing|export_file|export_flags|export_group|export_range|export_subgroup|icon|rpc|static_unload|tool|warning_ignore|console|Export|partial|Partial|using)\b/g, "organizadores"],
    [/\b(load|range|str|preload|floor|print|public|private|protected)\b/g, 'acesso'],
    [/\b([a-zA-Z_]\w*)\b/g, 'identificador'],
  ]

  processingOrder.forEach(([regex, className]) => {
    text = text.replace(regex, (match) => {
      if (match.includes(placeholderPrefix)) return match
      return store(match, className)
    })
  })

  placeholders.forEach((replacement, index) => {
    const pattern = new RegExp(`${placeholderPrefix}${index}${placeholderSufix}`, 'g')
    text = text.replace(pattern, () => replacement)
  })

  return text
}
