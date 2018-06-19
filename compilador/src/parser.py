from pprint import pprint
import ply.yacc as yacc

from lexer import PyduinoLexer


class Data(object):

    def __init__(self, type, value, lineno, lexpos):
        self.type = type
        self.value = value
        self.lineno = lineno
        self.lexpos = lexpos


class PyduinoParser(object):

    tokens = PyduinoLexer.tokens

    precedence = (
        ('left', 'OPERADOR'),
        ('right', 'NEGACAO'),
        ('left', 'ATRIBUIDOR'),
    )

    def __init__(self):
        self.names = { }
        self.errors = []

    def p_pre_programa(self, p):
        '''pre_programa : INIPROG programa_lista FIMPROG
        '''
        p[0] = p[1:]

    def p_programa(self, p):
        '''programa : expressao FIMLINHA
                    | atribuicao FIMLINHA
                    | declaracao FIMLINHA
                    | pino_funcoes FIMLINHA
                    | aguarde FIMLINHA
                    | condicional
                    | repeticao
        '''
        p[0] = p[1:]

    def p_programa_lista(self, p):
        '''programa_lista : programa programa_lista
                          | programa
        '''
        p[0] = p[1:]

    def p_expressao(self, p):
        '''expressao : expressao OPERADOR expressao
                     | expressao COMPARADOR expressao
                     | NEGACAO expressao
                     | INIPAR expressao FIMPAR
                     | NUMERO
                     | VARIAVEL
                     | RESERVADAS
        '''
        p[0] = p[1:]

    def p_atribuicao(self, p):
        '''atribuicao : VARIAVEL ATRIBUIDOR expressao
                      | VARIAVEL ATRIBUIDOR pino_funcoes
        '''
        p[0] = p[1:]

    def p_declaracao(self, p):
        '''declaracao : TIPO VARIAVEL
                      | TIPO atribuicao
        '''
        p[0] = p[1:]

    def p_pino_funcoes(self, p):
        '''pino_funcoes : PINO PONTO FUNCOES INIPAR FIMPAR'''
        p[0] = p[1:]

    def p_condicional(self, p):
        '''condicional : SE INIPAR expressao FIMPAR INIBLOCO programa_lista FIMBLOCO
                       | SE INIPAR expressao FIMPAR INIBLOCO programa_lista FIMBLOCO SENAO INIBLOCO programa_lista FIMBLOCO
        '''
        p[0] = p[1:]

    def p_repeticao(self, p):
        '''repeticao : REPETICAO INIPAR expressao FIMPAR INIBLOCO programa_lista FIMBLOCO'''
        p[0] = p[1:]

    def p_aguarde(self, p):
        '''aguarde : DELAY'''
        p[0] = p[1:]

    def p_error(self, p):
        if p:
            last_cr = p.lexer.lexdata.rfind('\n', 0, p.lexer.lexpos)
            column = p.lexer.lexpos - last_cr - 1

            data = Data('Error', p.value, (p.lineno-self.count) +1, column)
            self.errors.append(data)
        else:
            data = Data('Error', 'EOF', -1, -1)
            self.errors.append(data)

    def build(self, **kwargs):
        self.parser = yacc.yacc(module=self, **kwargs)

    def test(self, data, qtd_lines=0):

        self.count = qtd_lines

        out = self.parser.parse(data)
        pprint(out)
        return out
