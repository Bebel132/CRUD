let nome;
let nascimento;
let id = Math.floor(Math.random() * 10000);
let mostrar = true;
let tabela = document.querySelector("#tbody");

const data = new Date();
const hoje = `${String(data.getMonth() + 1).padStart(2,'0')}-${data.getDate().toString().padStart(2,'0')}`;

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

function mostrarModal(){
    dados.forEach(e => {
        console.log(e.mostrar)
        if(e.nascimento.slice(5) == hoje){
            if(e.mostrar){
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.classList.add('visible');

                const modalContainer = document.createElement('div');
                modalContainer.classList.add('modal-container')

                const close = document.createElement('span');
                close.classList.add('close');
                close.append(document.createTextNode('x'));

                const modalHeader = document.createElement('div');
                modalHeader.classList.add('modal-header');

                const modalHeaderTitle = document.createElement('h1');
                modalHeaderTitle.classList.add('modal_header-title');

                const modalBody = document.createElement('div');
                modalBody.classList.add('modal-body')

                const modalBodyText = document.createElement('p');
                modalBodyText.classList.add('modal_body-text');
                const a = document.createElement('a');
                a.setAttribute('href', "https://www.mensagemaniversario.com.br/" );
                a.setAttribute('target', "_blank");
                a.append(document.createTextNode("mensagens de aniversáriokk"))

                const titulo = document.createTextNode(`Hoje é aniversário do(a) ${e.nome}!`);
                const texto = document.createTextNode('Vai lá dar um feliz aniversário pra ele(a)');
                modalHeaderTitle.append(titulo)
                modalBodyText.append(texto);

                modalHeader.append(modalHeaderTitle)
                modalHeader.append(close);
                modalBody.append(modalBodyText);
                modalBody.append(a)
                modalContainer.append(modalHeader, modalBody)
                modal.append(modalContainer)
                document.body.append(modal)

                close.addEventListener('click', () => {
                    document.body.removeChild(modal);
                    e.mostrar = false;
                    localStorage.setItem('dados', JSON.stringify(dados));
                })
            }    
        }
    });
}

document.querySelector("#enviar").onclick = e => {
    e.preventDefault();
    nome = document.querySelector("#nome").value.trim();
    nascimento = document.querySelector("#nascimento").value.trim();
    if(nome != '' && nascimento != ''){
        const dado = {
            id: id,
            nome: nome,
            nascimento: nascimento,
            mostrar: mostrar
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
        mostrarModal();
        id = Math.floor(Math.random() * 10000);
    }
}

preencherTabela();
mostrarModal();