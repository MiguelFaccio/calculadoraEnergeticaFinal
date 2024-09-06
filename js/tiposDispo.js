// Função para carregar a lista de Tipos de Dispositivos
function loadTiposDispositivos() {
    fetch('/tipos_dispositivos')  // URL da API para listar tipos de dispositivos
        .then(response => response.json())
        .then(data => {
            let list = document.getElementById("tiposDispositivosList");
            list.innerHTML = "";
            data.forEach(tipo => {
                list.innerHTML += `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>${tipo.nome}</span>
                        <div>
                            <button class="btn btn-outline-warning btn-sm" onclick="editTipo(${tipo.id})">Editar</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteTipo(${tipo.id})">Excluir</button>
                        </div>
                    </div>`;
            });
        });
}

// Função para mostrar o formulário de adição/edição
function showAddForm() {
    document.getElementById("tipoDispositivoForm").classList.remove("d-none");
    document.getElementById("formTitle").textContent = "Cadastrar novo Tipo de Dispositivo";
    document.getElementById("tipoDispositivoId").value = "";
    document.getElementById("nome").value = "";
}

// Função para editar um tipo de dispositivo
function editTipo(id) {
    fetch(`/tipos_dispositivos/${id}`)
        .then(response => response.json())
        .then(tipo => {
            document.getElementById("tipoDispositivoForm").classList.remove("d-none");
            document.getElementById("formTitle").textContent = "Editar Tipo de Dispositivo";
            document.getElementById("tipoDispositivoId").value = tipo.id;
            document.getElementById("nome").value = tipo.nome;
        });
}

// Função para excluir um tipo de dispositivo
function deleteTipo(id) {
    fetch(`/tipos_dispositivos/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Tipo de Dispositivo excluído com sucesso!');
            loadTiposDispositivos();
        });
}

// Função para salvar o tipo de dispositivo
document.getElementById("tipoDispositivoFormElement").addEventListener("submit", function(event) {
    event.preventDefault();
    let id = document.getElementById("tipoDispositivoId").value;
    let nome = document.getElementById("nome").value;

    let method = id ? 'PUT' : 'POST';
    let url = id ? `/tipos_dispositivos/${id}` : '/tipos_dispositivos';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    })
    .then(response => {
        if (response.ok) {
            alert('Tipo de Dispositivo salvo com sucesso!');
            loadTiposDispositivos();
            document.getElementById("tipoDispositivoForm").classList.add("d-none");
        } else {
            alert('Erro ao salvar o Tipo de Dispositivo');
        }
    });
});

// Carregar a lista ao iniciar
window.onload = function() {
    loadTiposDispositivos();
};
