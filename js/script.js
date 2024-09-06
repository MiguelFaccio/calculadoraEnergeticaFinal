document.addEventListener("DOMContentLoaded", function () {
    fetchUnidadesConsumidoras();
    carregarTiposConsumidores(); // Carrega os tipos de consumidores

    // document.getElementById('unidadeConsumidoraFormElement').addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     criarUnidadeConsumidora();
    // });
});

function fetchUnidadesConsumidoras() {
    fetch('http://localhost:8000/unidades-consumidoras')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('unidadesConsumidorasList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.unidades_consumidoras.forEach(unidadeConsumidora => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"><strong>${unidadeConsumidora.nome}</strong></div>
                            <div class="col"><button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${unidadeConsumidora.id}, '${unidadeConsumidora.nome}', ${unidadeConsumidora.tipo_consumidor_id})">Editar</button></div>
                            <div class="col"><button class="btn btn-danger btn-sm float-end" onclick="deleteUnidadeConsumidora(${unidadeConsumidora.id})">Deletar</button></div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        });
}

function carregarTiposConsumidores() {
    fetch('http://localhost:8000/tipos-consumidores')
        .then(response => response.json())
        .then(data => {
            const tiposConsumidorSelect = document.getElementById('tipoConsumidor');
            tiposConsumidorSelect.innerHTML = ''; // Limpar opções existentes
            data.tipos_consumidores.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.id; // ID como valor
                option.textContent = tipo.nome; // Nome como texto
                tiposConsumidorSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar tipos de consumidores:', error));
}

function showAddForm() {
    document.getElementById('unidadeConsumidoraForm').classList.remove('d-none');
    document.getElementById('unidadeConsumidoraId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('tipoConsumidor').value = ''; // Limpar o tipo de consumidor
    document.getElementById('formTitle').innerText = 'Adicionar Unidade Consumidora';

}

function showEditForm(id, nome, tipoConsumidorId) {
    document.getElementById('unidadeConsumidoraForm').classList.remove('d-none');
    document.getElementById('unidadeConsumidoraId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('tipoConsumidor').value = tipoConsumidorId; // Preencher o tipo de consumidor
    document.getElementById('formTitle').innerText = 'Editar Unidade Consumidora';


}

function criarUnidadeConsumidora() {
    const nome = document.getElementById('nome').value;
    const tipoConsumidorId = parseInt(document.getElementById('tipoConsumidor').value, 10); // Converte para inteiro

    console.log('nome ' + nome + ' tipo ' + typeof(nome));
    console.log('tipo consumidor ' + tipoConsumidorId + ' tipo ' + typeof(tipoConsumidorId)); // Deve mostrar 'number'

    fetch('http://localhost:8000/unidades-consumidoras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, tipo_id: tipoConsumidorId }) // Enviar o tipo de consumidor
    })
        .then(response => response.json())
        .then(() => {
            fetchUnidadesConsumidoras();
            document.getElementById('unidadeConsumidoraForm').classList.add('d-none');
        });
}

function atualizarUnidadeConsumidora(id) {
    
    const nome = document.getElementById('nome').value;
    const tipoConsumidorId = parseInt(document.getElementById('tipoConsumidor').value, 10); // Converte para inteiro

    console.log('nome ' + nome + ' tipo ' + typeof(nome));
    console.log('tipo consumidor ' + tipoConsumidorId + ' tipo ' + typeof(tipoConsumidorId)); // Deve mostrar 'number'
    console.log('id ' + id + ' tipo ' + typeof(id));

    fetch(`http://localhost:8000/unidades-consumidoras/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, tipo_id: tipoConsumidorId }) // Enviar o tipo de consumidor
    })
        .then(response => response.json())
        .then(() => {
            fetchUnidadesConsumidoras();
            document.getElementById('unidadeConsumidoraForm').classList.add('d-none');
        });
}


function deleteUnidadeConsumidora(id) {
    fetch(`http://localhost:8000/unidades-consumidoras/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchUnidadesConsumidoras());
}
