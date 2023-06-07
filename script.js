const textArea = document.querySelector('.textArea');
const encriptar = document.querySelector('.btn-encriptar');
const desencriptar = document.querySelector('.btn-desencriptar');
const ningunMensaje = document.querySelector('.muñeco-msj');
const viewBoxMsjEncriptado = document.querySelector('.viewBoxMsjEncriptado');
const msjEncriptado = document.querySelector('#msjEncriptado');
const boxText = document.querySelector('.box-text'); 
const copy = document.querySelector('.btn-copy');

const codex = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}

function preRegExp(diccionario){
    const preRegex = Object.keys(diccionario).reduce((accum, next) => accum + "|" + next);
    return new RegExp(preRegex, 'g')
}

function encriptarText(text, diccionario){
    return text.replace(preRegExp(diccionario), (match) => diccionario[match]);
}

encriptar.addEventListener('click', () => { 
    const textEncriptado = encriptarText(textArea.value, codex);
    const textCheck = textArea.value.trim();

    if(textCheck === "" ){
        if (!viewBoxMsjEncriptado.classList.contains('inactive')) {
            viewBoxMsjEncriptado.classList.toggle('inactive')
            ningunMensaje.classList.toggle('inactive');
            boxText.classList.toggle('inactive');
            copy.classList.toggle('inactive');
        }
    }

    if(textCheck != "" ){
        if (viewBoxMsjEncriptado.classList.contains('inactive')) {
            viewBoxMsjEncriptado.classList.toggle('inactive')
            ningunMensaje.classList.toggle('inactive');
            boxText.classList.toggle('inactive');
            copy.classList.toggle('inactive');
        }
        msjEncriptado.innerHTML = textEncriptado;
    }

}
);

function values(keys){
    const regex = Object.values(keys).reduce((accum, next) => accum + "|" + next);
    return new RegExp(regex, 'g')
}

function desencriptarText(text, keys){
    return text.replace(values(keys), (match) => Object.keys(keys).find(key => codex[key] === match));
}

desencriptar.addEventListener('click', () => {
    const text = textArea.value;
    const textCheck = msjEncriptado.textContent;
    const textDesencriptado = desencriptarText(text, codex);
    const textEncriptado = encriptarText(text, codex);

    if(textCheck === textEncriptado){
        msjEncriptado.innerHTML = textDesencriptado;
    } else if(textCheck == "" || textCheck != textEncriptado){

        if (viewBoxMsjEncriptado.classList.contains('inactive')) {
            viewBoxMsjEncriptado.classList.toggle('inactive')
            ningunMensaje.classList.toggle('inactive');
            boxText.classList.toggle('inactive');
            copy.classList.toggle('inactive');
        }
        
        msjEncriptado.innerHTML = textDesencriptado;
    }

});

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(msjEncriptado.innerHTML);
}
);