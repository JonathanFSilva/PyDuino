# Compilador

#### Um projeto de um compilador em implementado na linguagem Python para a disciplina Compiladores.

##### Nome da dupla: Jonathan Felipe da Silva e Vitória Mendes da Silva.

##### Nome da Linguagem: Pyduino

##### Linguagem de desenvolvimento: Python

A linguagem descrita será criada com o intuito de programar um Arduino. Ela terá funções básicas já definidas pela linguagem, tais como liga(), desliga(), entre outras. Os pinos do Arduino serão caracterizados pelo uso do cifrão ($).
A linguagem permitirá:
* Comentários, marcados pelo uso de asterisco(\*) no início e no fim;
* Declaração de variáveis em qualquer lugar do código, dos tipos numérico e booleano;
* Uso de estrutura condicional (if, else);
* Uso de estrutura de repetição (while);
* Uso de operadores aritméticos e relacionais.



### Tabela de Tokens  

| Token        | Lexema                                     | Regex                       				 |
| ------------ | ------------------------------------------ | ------------------------------------------ |
| t_VARIAVEL   | _a, _ab, _aSb      					   	| `\_[a-zA-Z]+`    	          				 |
| t_TIPO       | numero,booleano                            | `numero`\|`booleano`        				 |
| t_INIPAR     | (                                          | `\(`    			           				 |
| t_FIMPAR	   | )				                          	| `\)`				          				 |
| t_FUNCOES	   | valor, liga, desliga, entrada, saida       | `valor`\|`liga`\|`desliga`\|`entrada`\|`saida` |
| t_DELAY	   | aguarde(10) 								| `aguarde([\d]+)`	          				 |
| t_PINO	   | $1,$2,$3 								  	| `\$\d{1,2}`				  				 |
| t_RESERVADAS | verdadeiro,falso 						    | `verdadeiro`\|`falso`		  				 |
| t_REPETICAO  | loop 						    			| `loop`					  				 |
| t_INIPROG	   | inicio 								    | `inicio`					  				 |
| t_FIMPROG	   | fim			 						    | `fim`						  				 |
| t_INIBLOCO   | [				 						    | `\[`						  				 |
| t_FIMBLOCO   | ]				 						    | `\]`						  				 |
| t_SE		   | ?				 						    | `\?`						  				 |
| t_SENAO 	   | : 										    | `\:`						  				 |
| t_COMENTARIO | \* comentario *							| `\*[^*]*\*`		 		  				 |
| t_FIMLINHA   | ;											| `\;`						  				 |
| t_ATRIBUIDOR | =											| `\=`										 |
| t_OPERADOR   | +, -, &, \|								| `\+`\|`\-`\|`\&`\|`\|`  		 			 |
| t_COMPARADOR | !=,<,<=,==,>,>=							| `\!\=`\|`\=\=`\|`\<\=`\|`\<`\|`\>\=`\|`\>` |
| t_NEGACAO	   | !											| `\!`										 |
| t_NUMERO 	   | 1,10,100									| `[\d]+` 									 |
| t_PONTO 	   | .											| `\.` 										 |

#### Exemplo de código:
```
* comentario *

inicio  
	$1.entrada(); * Define o pino 1 como entrada *
	$2.saida(); * Define o pino 2 como saida *

	numero _cont = 0;
	loop ( _cont <= 10 ) [
		_cont = _cont + 1;
	]

	* condicional *

	booleano _estado = $1.valor();
	? ( _estado ) [
		$2.liga();
	] : [
		$2.desliga();
	]

	aguarde(1); * espera por 1 segundo *
fim
```



## Dependencias

#### Compilador

* Python3.6

  <https://www.python.org/downloads/>

* PLY (Python Lex-Yacc)

  `$ pip install ply`

* FLASK

  `$ pip install flask`

### IDE

* Nodejs

  <https://nodejs.org/en/>

* Para instalar as dependencias da  ide basta rodar o comando abaixo dentro da pasta do projeto:

  `npm install`

### Execução

Vá até a pasta do projeto e rode o comando `npm start` . Para acessar basta abrir a url <http://localhost:3000> .
