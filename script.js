let seuVoto = document.querySelector('.d1-1 span')
let cargo = document.querySelector('.d1-2 span')
let descrip = document.querySelector('.d1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d1-right')
let numeros = document.querySelector('.d1-3')


let etapaAtual = 0 
let numero = ''
let white = false


function comecarEtapa(){
    let etapa= etapas[etapaAtual]

    let numeroHtml =''
    numero = ''
    white = false
    
    for (let i =0; i<etapa.numeros;i++){
        if(i === 0 ){
            numeroHtml+= '<div class="numero pisca"></div>'

        }else{
            numeroHtml+= '<div class="numero"></div>'

        }
    }

    
    seuVoto.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descrip.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}
function atualizaInterface(){
    let etapa= etapas[etapaAtual]

    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true
        }else{
            return false 
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVoto.style.display = 'block'
        descrip.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}<br> Vice: ${candidato.vice} `
        aviso.style.display = 'block'

        let fotoshtml = '' 
        for(let i in candidato.fotos){
            if(candidato.fotos[i].url.small){
                fotoshtml+=`<div class="d1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }else{
                fotoshtml+=`<div class="d1-image"> <img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
            
        }
        lateral.innerHTML = fotoshtml


    }else{
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        descrip.innerHTML ='<div class="aviso-grande pisca">VOTO NULO</div>'
    }
    
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    let audio2 = document.querySelector('#bip')
    audio2.play()
    if(elNumero !== null){
        elNumero.innerHTML = n
        numero = `${numero}${n}`
        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
        
    }
}

function branco(){
    numero = ''
    white = true
    seuVoto.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descrip.innerHTML ='<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML =''
}
function corrigir(){
    comecarEtapa()
}
function confirmar(){
    let etapa= etapas[etapaAtual]
    let votoConfirmado  = false
    let audio = document.querySelector('#confirmar')
    audio.play()
    if(white==true){
        votoConfirmado =true
        
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true
        
    }
    if (votoConfirmado) {
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM </div>'
        }
    }
}


comecarEtapa()