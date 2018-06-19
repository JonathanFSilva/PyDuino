import sys
from pprint import pprint

from lexer import PyduinoLexer
from parser import PyduinoParser


class Compilador(object):

    def __init__(self):
        self.lexer = PyduinoLexer()
        self.lexer.build()

        self.parser = PyduinoParser()
        self.parser.build(start='pre_programa')
        # self.parser.build()

    def run_lexer(self, code):
        out = []

        aux = self.lexer.test(code)
        for a in aux:
            out.append(a)

        return out

    def run_parser(self, code):
        count_lines = 0
        for line in code.split('\n'):
            count_lines += 1

        out = self.parser.test(code, count_lines)

        if self.parser.errors:
            return self.parser.errors

        return None
