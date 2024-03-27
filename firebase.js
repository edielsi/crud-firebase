//https://proj-mgl-default-rtdb.firebaseio.com/
//GET = PEGAR UM DADO
//POST = GRAVAR UMA INFORMAÇÃO
//PUT = ATUALIZAR
//DELETE = APAGAR

var url_base = "https://proj-mgl-default-rtdb.firebaseio.com/aluno.json";
var url = "";

function gravar() {

    let nome = document.getElementById('nome')
    let fone = document.getElementById('fone')
    let email = document.getElementById('email')
    let id = document.getElementById('id')

    var config = {
        method: 'POST',
        body: JSON.stringify({
            nome: nome.value,
            telefone: fone.value,
            email: email.value
        })
    }


    if (id.value == "") {
        console.log('id vazio, novo cadastro')
        url = url_base;
    } else {
        console.log('id:', id.value)
        //atualização
        url = `https://proj-mgl-default-rtdb.firebaseio.com/aluno/${id.value}.json`;
        console.log(url)
        config.method = 'PUT'
    }

    fetch(url, config)
        .catch(erro => console.log(erro))

    setTimeout(() => {
        listar();

    }, 500);

    document.getElementById('frm_teste').reset()

}

var btn_salvar = document.getElementById('btn_salvar');
btn_salvar.addEventListener('click', (e) => {
    e.preventDefault();
    gravar();

})

var lista = document.getElementById('lista');
var listagem = "";
function listar() {
    lista.innerHTML = "";
    //pegar os dados do firebase
    fetch(url_base)
        .then(resposta => resposta.json())
        .then(dados => {
            //só vai chegar aqui, se ele conseguir pegar os dados
            console.log(dados)
            for (const key in dados) {

                listagem = dados;
                lista.innerHTML += `
                    <tr>
                            <th>${key}</th>
                            <td>${dados[key].nome}</td>
                            <td>${dados[key].telefone}</td>
                            <td>@${dados[key].email}</td>
                            <td>
                               <button class="btn btn-sm btn-warning" onclick="editar('${key}')">
                                <i class="bi bi-pencil-square"></i>
                               </button>
                               <button class="btn btn-sm btn-danger" onclick="apagar('${key}')">
                               <i class="bi bi-trash3-fill"></i>
                               </button>
                            </td>
                        </tr>
                        `

            }
        })
        .catch(erro => console.log(erro))
}

function editar(id) {
    var url_edicao = `https://proj-mgl-default-rtdb.firebaseio.com/aluno/${id}.json`;
    fetch(url_edicao)
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            nome.value = dados.nome
            fone.value = dados.telefone
            email.value = dados.email
            document.getElementById('id').value = id
        })
}

function apagar(id) {
    let resposta = confirm('Deseja apagar o registro ' + id);

    if (resposta) {

        var url_del = `https://proj-mgl-default-rtdb.firebaseio.com/aluno/${id}.json`;
        fetch(url_del, {
            method: 'DELETE'
        })
        setTimeout(() => {
            listar();

        }, 500);
    }
}

//chamando
listar();