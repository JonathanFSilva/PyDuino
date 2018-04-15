import sys

from Lexemas import Lexemas

class AnalisadorLexico(object):

    def __init__(self):
        self.lexer = Lexemas()
        self.lexer.build()

    def run(self, filename):
        out = []

        with open(filename, 'r') as codigo:
            for linha in codigo.readlines():
                # if linha != "\n":
                aux = self.lexer.test(linha)
                for a in aux:
                    out.append(str(a))

            codigo.close()

        return out

# if __name__ == '__main__':
#     analisador = AnalisadorLexico()
#     out = analisador.run('codigo.jv')
#     print(out)
