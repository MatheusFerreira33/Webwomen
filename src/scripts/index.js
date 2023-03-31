const container = document.querySelector(".container");
const containerAllCards = document.createElement("div");
const containerVagasSelec = document.createElement("div");
const titulo = document.createElement("h2");
const texto = document.createElement("p");
const img = document.createElement("img");

containerAllCards.className = "containerAllCards"

containerVagasSelec.className = "containerVagasSelec"
titulo.innerText = "Vagas selecionadas";
containerVagasSelec.append(titulo);

function verificarLocalStore(){
    if(localStorage.length == 0){
        texto.className = "texto";
        img.className = "imagemTexto";
        texto.innerText = " Você ainda não aplicou para nenhuma vaga";
        img.src = "./src/assets/img/no-items.svg";
        img.alt = "texto";
        containerVagasSelec.append(texto,img);
    }else if(localStorage.length >= 1){
        texto.remove();
        img.remove();
    }
}
verificarLocalStore();

container.append(containerAllCards, containerVagasSelec);

function renderVagas(array) {

    array.map(Element => {
        const containerCard = document.createElement("div");
        const title = document.createElement("h2");
        const ul = document.createElement("ul");
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        const descrition = document.createElement("p");
        const modalities = document.createElement("span");
        const botao = document.createElement("button");

        containerCard.className = "containerCard";
        title.innerText = Element.title;
        li1.innerText = Element.enterprise;
        li2.innerText = Element.location;
        descrition.innerText = Element.descrition;

        modalities.append(Element.modalities[0], " ", Element.modalities[1]);

        botao.innerText = "Candidatar";
        botao.setAttribute("id", Element.id);

        botao.addEventListener("click", (event) => {
            
            let valorId = event.target.id;

            if (botao.innerText == "Candidatar") {
                
                botao.innerText = "Remover Candidatura";
               
            
            } else if (botao.innerText == "Remover Candidatura") {
                botao.innerText = "Candidatar";
                Array.from(containerVagasSelec.children).filter(Element=>{
                    if(Element.className == "containerCardSelec"){
                        if(Array.from(Element.children)[1].getAttribute("id") == valorId){
                            Element.remove();
                            
                        }
                    }
                });
                localStorage.removeItem(valorId.toString());
                verificarLocalStore();
                return 0;
            }
            
            const object = JSON.stringify(renderVagasSelecionada(valorId));
            localStorage.setItem(valorId.toString(),object);
            verificarLocalStore();
        })

        ul.append(li1, li2);

        containerCard.append(title, ul, descrition, modalities, botao);
        containerAllCards.append(containerCard);
        renderDadosLocalStore(Element.id);
    })
}

function renderDadosLocalStore(id){
    let js = JSON.parse(localStorage.getItem(id.toString()));
    
    if(js != null){
        js.find(Element=>{
            renderVagasSelecionada(Element.id);
            
            
        })
    }else{
        return 0;
    }
    Array.from(containerAllCards.children).filter(Element=>{
        
        
        let idBotao = Array.from(Element.children)[4].getAttribute("id");
        if(localStorage.getItem(idBotao) != null){
            let botao = Array.from(Element.children)[4]
            botao.innerHTML = "Remover Candidatura";
        }
    })

}

function renderVagasSelecionada(id) {
    
    let array = [];
    jobsData.filter(Element => {
        
        if (Element.id == id) {
            

            const containerCardSelec = document.createElement("ul");
            const li1 = document.createElement("li");
            const title = document.createElement("h5");
            const botaoRemover = document.createElement("button");
            const modalities = document.createElement("span");
  
            containerCardSelec.className = "containerCardSelec";
            title.innerText = Element.title;

            li1.appendChild(title);
  
            botaoRemover.className = "fa-solid fa-trash-can";
            botaoRemover.setAttribute("id", Element.id);

            modalities.append(Element.modalities[0], " ", Element.modalities[1]);
  
            botaoRemover.addEventListener("click", (event) => {
                Array.from(containerAllCards.children).filter(Element=>{
                   if(Array.from(Element.children)[4].getAttribute("id") == id){
                        let button = Array.from(Element.children)[4];
                        if(button.innerHTML == "Remover Candidatura"){
                            button.innerHTML = "Candidatar";
                        }
                   }
                
                });
                let idRemover = event.target.id;
                localStorage.removeItem(idRemover.toString());
                verificarLocalStore();
                containerCardSelec.remove();
            })
            
            containerCardSelec.append(li1, botaoRemover,modalities);
            containerVagasSelec.append(containerCardSelec);
            array = [{...Element}];
            
        }
    });
   return array;

}
renderVagas(jobsData);