import json
from pprint import pprint

from flask import Flask, Response, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from compilador import Compilador

@app.route('/compile', methods=['POST'])
def compile():
    compilador = Compilador()

    data = json.loads(request.data.decode('utf-8'))

    lex = []
    lexer_out = compilador.run_lexer(data['code'])
    for lexer in lexer_out:
        lex.append(lexer.__dict__)

    parse = []
    parser_out = compilador.run_parser(data['code'])
    if parser_out:
        for parser in parser_out:
            parse.append(parser.__dict__)


    res = {
        "lexer": lex,
        "parser": parse
    }

    return Response(json.dumps(res))
