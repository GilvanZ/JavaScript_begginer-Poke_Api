//Realizando a busca para consumir todos os nomes dos pokemons com call back de erro, para colocar em uma lista
function api_pokemon(name){
    fetch('https://pokeapi.co/api/v2/pokemon/'+name.toString().toLowerCase())
    .then(Response =>{
        if(!Response.ok){
            throw new Error('Erro HTTP! Status:',Response.status)
        }
        return Response.json()
    })
    .then(data => {
        img = document.getElementById("poke_img")
        img.src = data.sprites.front_default
        console.log(data);
        
    })
    .catch(error =>{
        console.error("Error", error);
    })
}

pokename_list=[]
for(let i=1; i<=1017; i++){
    if (!i){
        break;
    }
    fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString())
        .then(Response =>{
            if (!Response.ok){
                i=false  
            }
            return Response.json()
        })
        .then(data=>{
            pokename_list.push(data.name)
        })    
}
//função para ser chamada no htmlk para pegar o valor de um elemento id
function getValueById(id){
    value_li = document.getElementById(id).innerHTML;
    search_input.value = id
    ol.innerHTML = ""
    return value_li
}



//Pegando o conteudo do input para usarmos no auto complete
search_input=document.getElementById("poke_name")
search_input.addEventListener("keyup",(e)=>{
    //adicionar uma lista com o conteudo do input
    search_content = [] 
    search_content.push(e.target.value)
    //verificar se o conteudo do input está incluso na pokelist
    //precisa percorrer a lista inteira pokename para verificar se cada item contem o que esta sendo escrito no input
    auto_complete = []
    for(let i of pokename_list){
        if (i.includes(search_content)){
            auto_complete.push(i)
        }
    }
    //Adiciona o item na list de auto complete
    if(e.target.value.length >= 3){
        //precisa limpar a ol toda vez que o evendo for chamado para não ficar valores duplicados na tela
        ol = document.getElementById("auto_complete")
        ol.innerHTML = ""
        for(i of auto_complete){
           value_li = ol.innerHTML += `<ul id="${i}"onclick="getValueById('${i}')">${i}</ul>`
        }
    }else{
        ol.innerHTML = ""
    }
})

//funcão para enviar no input os valores buscados na api
function send_value(){
    api_pokemon(value_li)
}




    