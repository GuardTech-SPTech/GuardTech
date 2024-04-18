// Um array é uma estrutura de dados que armazena uma coleção de elementos.
// Os elementos podem ser de diferentes tipos, como números, strings, objetos, etc.
//Ele é basicamente uma variavel, no entanto armazena mais de um dado

//quando criamos uma variavel, colocamos um nome e então atribuimos um valor a ela 

let variavel = 1;



// Um array funciona praticamente da mesma forma, no entando utilizamos conchetes [], para dizer
//que aquilo é um array
let meuArray = ['a', 'b', 'c', 'd', 'e'];
               //0,   1    2    3    4 -> Cada elemento em um array tem uma posição, chamada de índice, que começa em 0.

// Podemos acessar elementos específicos do array utilizando seus índices(sua posição):
let primeiroElemento = meuArray[0]; // 'a'
let segundoElemento = meuArray[1];  // 'b'
let terceiroElemento = meuArray[2]; // 'c'

// Também podemos modificar elementos do array atribuindo um novo valor ao seu índice:
meuArray[3] = 'f'; // Agora o array se torna ['a', 'b', 'c', 'f', 'e']

// Strings são semelhantes a arrays de caracteres em muitas linguagens de programação,
// onde cada caractere ocupa uma posição (índice) no array.

let minhaString = 'Olá, mundo!';
let primeiroCaractere = minhaString[0]; // 'O'
let sextoCaractere = minhaString[5];    // 'm'

// Podemos também acessar o comprimento de uma string, que representa o número de caracteres:
let tamanhoDaString = minhaString.length; // Retorna 11, pois há 11 caracteres na string

// No entanto, as strings são imutáveis, o que significa que não podemos modificar caracteres individuais diretamente:

// minhaString[0] = 'o'; -> Isso resultaria em um erro, pois não podemos atribuir um valor a um caractere específico
