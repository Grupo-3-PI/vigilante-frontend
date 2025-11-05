input = document.querySelectorAll('.required')
spanErro = document.querySelectorAll('.erro')
validacaoEmail = /\S+@\S+\.\S+/

//Função de erro, caso o campo esteja incorreto
function erro(indice){
    input[indice].style.border = '2px solid #e63636'
    spanErro[indice].style.display = 'block'
}

//Função de erro, caso o campo esteja incorreto
function acerto(indice){
    input[indice].style.border = '0px'
    spanErro[indice].style.display = 'none'
}

function validarNome(){
    if(input[0].value.length < 3){
        erro(0)
    }
    else{
        acerto(0)
    }
}

function validarEmail(){
    if(validacaoEmail.test(input[1].value)){
        acerto(1)
    }
    else{
        erro(1)
    }
}

function validarSenha(){
    if(input[2].value.length < 8){
        erro(2)
    }
    else{
        acerto(2)
    }
}

function validarConfSenha(){
    if(input[3].value != input[2].value){
        erro(3)
    }
    else{
        acerto(3)
    }
}