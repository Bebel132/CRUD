let nome;
let nascimento;
let id = Math.floor(Math.random() * 10000);
let tabela = document.querySelector("#tbody");

let dados;

if(localStorage.length == 0 || localStorage.dados == "[]"){
    dados = [];
} else {
    dados = JSON.parse(localStorage.getItem('dados'));
}

function editar(i){
    i.addEventListener('click', () => {
        const obj = {
            nome: i.parentNode.parentElement.children[1].textContent,
            nascimento: i.parentNode.parentElement.children[2].textContent
        }
        const decisao = prompt("Você quer editar o nome ou data de nascimento? (N/D)");
        let edicao;
        if(decisao == 'N' || decisao == 'n'){
            edicao = prompt("Pelo o quê?");
            dados.forEach(e => {
                if(e.nome == obj.nome && e.nascimento == obj.nascimento){
                    e.nome = edicao;
                    localStorage.setItem('dados', JSON.stringify(dados));
                }
            })
            i.parentNode.parentElement.children[1].textContent = edicao;
        } else if(decisao == 'D' || decisao == 'd'){
            edicao = prompt("Pelo o quê?");
            dados.forEach(e => {
                if(e.nome == obj.nome && e.nascimento == obj.nascimento){
                    e.nascimento = edicao;
                    localStorage.setItem('dados', JSON.stringify(dados));
                }
            })
            i.parentNode.parentElement.children[2].textContent = edicao;
        }
    })
}

function deletar(i){
    i.addEventListener('click', () => {
        let id = i.parentNode.parentElement.children[0].textContent;
        dados.splice(dados.findIndex(e => {
            return e.id == id;
        }), 1)
        preencherTabela();
        localStorage.setItem('dados', JSON.stringify(dados));
    })
}

let btnsEdit = document.querySelectorAll(".btnEdit");
let btnsDel = document.querySelectorAll(".btnDel");

function preencherTabela(){
    if(dados != null){
        while(tabela.lastElementChild){
            tabela.removeChild(tabela.lastElementChild);
        }
        dados.forEach(e => {
            let linha = document.createElement("tr");
            let celula1 = document.createElement("td");
            let celula2 = document.createElement("td");
            let celula3 = document.createElement("td");
            let celula4 = document.createElement("td");
            let btnEdit = document.createElement("button");
            let btnDel = document.createElement("button");
            btnEdit.className = "btnEdit";
            celula4.className = "botao"
            btnDel.className = "btnDel";

            btnDel.appendChild(document.createTextNode("deletar"));
            btnEdit.appendChild(document.createTextNode("editar"));

            celula1.appendChild(document.createTextNode(e.id))
            celula2.appendChild(document.createTextNode(e.nome));
            celula3.appendChild(document.createTextNode(e.nascimento));
            celula4.appendChild(btnEdit)
            celula4.appendChild(btnDel)

            linha.appendChild(celula1);
            linha.appendChild(celula2);
            linha.appendChild(celula3);
            linha.appendChild(celula4);
            tabela.appendChild(linha);

            
        })
        btnsEdit = document.querySelectorAll(".btnEdit");
        btnsDel = document.querySelectorAll(".btnDel");
        btnsEdit.forEach(editar)
        btnsDel.forEach(deletar)
    }
}

document.querySelector("#enviar").onclick = e => {
    e.preventDefault();
    nome = document.querySelector("#nome").value.trim();
    nascimento = document.querySelector("#nascimento").value.trim();
    if(nome != '' && nascimento != ''){
        const dado = {
            id: id,
            nome: nome,
            nascimento: nascimento
        };
        dados.push(dado);
        if(localStorage.length == 0 || localStorage.dados == "[]"){
            localStorage.setItem('dados', JSON.stringify(dados));
        } else {
            const dadosLocais = JSON.parse(localStorage.getItem('dados'));
            dadosLocais.forEach(i => {
                if(i.nome == dado.nome && i.nascimento == dado.nascimento){
                    alert("Já existe alguém com estas mesmas informações");
                    dados.pop();
                } else {
                    localStorage.setItem('dados', JSON.stringify(dados));
                }
            });
        }
        document.querySelector("#nome").value = "";
        document.querySelector("#nascimento").value = "";
        preencherTabela();
        id = Math.floor(Math.random() * 10000);
    }
}

preencherTabela();