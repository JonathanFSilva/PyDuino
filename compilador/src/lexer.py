from pprint import pprint
import ply.lex as lex


class Data(object):

    def __init__(self, type, value, lineno, lexpos):
        self.type = type
        self.value = value
        self.lineno = lineno
        self.lexpos = lexpos


class PyduinoLexer(object):

    column = 0

    tokens = [
        'INIPAR',
        'FIMPAR',
        'INIPROG',
        'FIMPROG',
        'INIBLOCO',
        'FIMBLOCO',
        'FIMLINHA',

        'RESERVADAS',

        'SE',
        'SENAO',

        'DELAY',
        'FUNCOES',

        'NEGACAO',
        'OPERADOR',
        'COMPARADOR',
        'ATRIBUIDOR',

        'REPETICAO',

        'PINO',
        'TIPO',
        'VARIAVEL',
        'NUMERO',
        'PONTO',
    ]

    t_INIPAR = r'\('
    t_FIMPAR = r'\)'
    t_INIPROG = r'inicio'
    t_FIMPROG = r'fim'
    t_INIBLOCO = r'\['
    t_FIMBLOCO = r'\]'
    t_FIMLINHA = r'[\;]+'

    t_RESERVADAS = r'verdadeiro|falso'

    t_SE = r'\?'
    t_SENAO = r'\:'

    t_DELAY = r'aguarde\(\d+\)'
    t_FUNCOES = r'valor|liga|desliga|entrada|saida'

    t_NEGACAO = r'\!'
    t_OPERADOR = r'\+|\-|\&|\|'
    t_COMPARADOR = r'\!\=|\=\=|\<\=|\<|\>\=|\>'
    t_ATRIBUIDOR = r'\='

    t_REPETICAO = r'loop'

    t_PINO = r'\$\d{1,2}'
    t_TIPO = r'numero|booleano'
    t_VARIAVEL = r'\_[a-zA-Z]+'
    t_NUMERO = r'[\d]+'
    t_PONTO = r'\.'

    t_ignore = ' \t'

    def t_COMMENT(self, t):
        r'\*[^*]*\*'
        t.lexer.lineno += t.value.count('\n')
        pass

    def t_newline(self, t):
        r'[\n]+'
        t.lexer.lineno += len(t.value)

    def t_error(self, t):
        t.lexer.skip(1)

        data = Data('INVALIDO', t.value[0], t.lineno, t.lexpos)
        return data

    def find_column(self, input, token):
        line_start = input.rfind('\n', 0, token.lexpos) + 1
        return (token.lexpos - line_start) + 1

    def build(self, **kwargs):
        self.lexer = lex.lex(module=self, **kwargs)

    def test(self, data):
        self.lexer.input(data)
        token = []
        while True:
            tok = self.lexer.token()
            if not tok:
                break

            dt = Data(tok.type, tok.value, tok.lineno, self.find_column(data, tok))
            token.append(dt)

        return token
