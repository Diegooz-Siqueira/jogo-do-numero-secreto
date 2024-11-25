//1. Inicialização
let listaDeNumeroSorteado = [];
let numeroLimite = 10;
let numerSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

//2. Funções Principais
function exibirMensagemInicial (){
    exibirTextoNaTela('h1', 'Jogo do Número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numerSecreto) {
        exibirTextoNaTela ('h1', 'ACERTOU!');
        let palavraTentativa = tentativas >1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o nº secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numerSecreto){
            exibirTextoNaTela ('p', 'O número secreto é menor' );
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numerSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

//3. Funções Auxiliares

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteado = [];
    }

    if(listaDeNumeroSorteado.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}