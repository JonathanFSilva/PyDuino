import ply.lex as lex


class Lexemas(object):

    # Lista de tokens
    tokens = [
        # inicio e fim de parenteses
        'INIPAR',
        'FIMPAR',
        # inicio e fim do programa
        'INIPROG',
        'FIMPROG',
        # inicio e fim de um bloco de codigo
        'INIBLOCO',
        'FIMBLOCO',
        # fim de linha
        'FIMLINHA',
        # bloco de comentarios
        'COMENTARIO',
        # palavras reservadas
        'RESERVADAS',
        # estrutura condicional se senao
        'SE',
        'SENAO',
        # funcoes da linguagem
        'DELAY',
        'FUNCOES',
        # operadores aritmeticos
        'OPERADOR',
        # comparadores
        'COMPARADOR',
        # estrutura de repeticao
        'REPETICAO',
        # definicao de um pino
        'PINO',
        # tipo de variavel
        'TIPO',
        # # nome da variavel
        'VARIAVEL',
        # numeros
        'NUMERO',
        # ponto
        'PONTO',
    ]

    # Todos os Regex
    t_INIPAR = r'\('
    t_FIMPAR = r'\)'

    t_INIPROG = r'inicio'
    t_FIMPROG = r'fim'

    t_INIBLOCO = r'\['
    t_FIMBLOCO = r'\]'

    t_COMENTARIO = r'\*[\w\W]*\*'

    t_RESERVADAS = r'verdadeiro|falso'

    t_SE = r'\?'
    t_SENAO = r'\:'

    t_DELAY = r'aguarde([\d]+)'
    t_FUNCOES = r'[a-zA-Z]+\([\w]*\)'

    t_OPERADOR = r'\+|\-|\=|\!|\&|\|'

    t_COMPARADOR = r'\!\=|\=\=|\<\=|\<|\>\=|\>'

    t_REPETICAO = r'loop'

    t_PINO = r'\$\d{1,2}'

    t_TIPO = r'numero|booleano'

    t_VARIAVEL = r'\_[a-zA-Z]+'

    t_NUMERO = r'[\d]+'

    t_PONTO = '\.'

    # A string containing ignored characters (spaces and tabs)
    t_ignore  = ' \t'

    # Erro
    def t_error(self, t):
        # print("Illegal character '%s' at row %d col %d" % (t.value[0], t.lineno, t.lexpos))
        t.lexer.skip(1)
        return("Caractere inválido '%s' em: linha %d coluna %d" % (t.value[0], t.lineno, t.lexpos))

    def t_FIMLINHA(self, t):
        r'[\n]+'
        t.lexer.lineno += len(t.value)
        return t

    def build(self, **kwargs):
        self.lexer = lex.lex(module=self, **kwargs)

    def test(self, data):
        self.lexer.input(data)
        token = []
        while True:
            tok = self.lexer.token()
            if not tok:
                break
            token.append(tok)

        return token
