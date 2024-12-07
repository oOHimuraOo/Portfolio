export const codeSnippet: string = `
class_name CARTA_BASE
extends CARTA_REFERENCIAS

signal hover_iniciado ( carta : CARTA_BASE )
signal hover_terminado ( carta : CARTA_BASE )
signal carta_clicada( carta : CARTA_BASE )

@export var carta_info: CARTA_INFO

var linha_atual : int = 0
var carta_no_deck : bool = false

var cor_de_tier:Dictionary = {
	"TIER_0" : Color ( "#e7edea" ) ,
	"TIER_1" : Color ( "#ffc52c" ) ,
	"TIER_2" : Color ( "#fb0c06" ) ,
	"TIER_3" : Color ( "#030d4f" )
}

var cor_de_raridade:Dictionary = {
	"MUITO_COMUM" : Color ( "#dac8b3" ) ,
	"COMUM" : Color( "#919a8b" ) ,
	"INCOMUM" : Color ( "#bab8b5" ) ,
	"RARO" : Color ( "#e7b555" ) ,
	"MUITO_RARO" : Color ( "#b00300" )
}

var copia_grafica : CARTA_BASE
var em_hover : bool = false

func carregar_informacoes_da_carta ( index : int , colecao : String ) -> void :
	name = DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Nome" ]

	criar_recurso()

	var textura_caminho = "res://Assets/Carta/Imagem/Cartas/" + DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Imagem" ]
	carta_info.imagem = load(textura_caminho)

	carta_info.index = index
	carta_info.colecao = colecao

	carta_info.nome = DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Nome" ]
	for tipo in  DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Tipo" ] :
		carta_info.tipo.append ( tipo )
	carta_info.tier = cor_de_tier [ DATA.CardInfo [ colecao ] [ str( index ) ] [ "Tier" ] ]
	carta_info.custo = DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Valor" ]
	carta_info.forca = DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Ataque" ]
	carta_info.defesa = DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Defesa" ]
	carta_info.raridade = cor_de_raridade [ DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Raridade" ] ]

	if DATA.CardInfo [ colecao ] [ str ( index ) ].has ( "Palavra-Chave" ) :
		carta_info.palavras_chave.append_array( DATA.CardInfo [ colecao ] [ str ( index ) ] [ "Palavra-Chave" ])

	if DATA.CardInfo [ colecao ] [ str ( index ) ] .has ( "Efeito" ) :
		carta_info.efeito = DATA.CardInfo [ colecao ] [ str( index ) ] [ "Efeito" ]

	update_visual()
	ativar_palavras_chave()

  "esse arquivo é uma amostra!
  Caso queira ver mais sobre o codigo Acesse o arquivo no github!"
`
