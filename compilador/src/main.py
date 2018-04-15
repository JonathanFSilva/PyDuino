from flask import Flask, request, Response
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

from AnalisadorLexico import AnalisadorLexico

@app.route("/lexico", methods=['POST'])
def analisadorLexico():
    analisador = AnalisadorLexico()

    if request.method == 'POST':

        data = json.loads(request.data.decode('utf-8'))

        with open('.temp.jv', 'w') as file:
            file.writelines(data['code'])

            file.close()

        out = analisador.run('.temp.jv')

        out = "\n".join(out)

        return Response(out)
    else:
        return "error"
#
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=False)
