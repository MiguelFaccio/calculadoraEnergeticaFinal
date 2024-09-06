function showAddForm() {
    document.getElementById("dispositivoForm").classList.remove("d-none");
    document.getElementById("formTitle").textContent = "Cadastrar novo Dispositivo";
    document.getElementById("dispositivoId").value = '';
    document.getElementById("nome").value = '';
    document.getElementById("consumo").value = '';
    document.getElementById("uso_diario").value = '';
    document.getElementById("tipo").value = '';
    document.getElementById("dependencia").value = '';
    document.getElementById("unidade_consumidora").value = '';
}

// Função para carregar opções de Tipo, Dependência e Unidade Consumidora
function loadOptions() {
    fetch('/api/tipos')
        .then(response => response.json())
        .then(data => {
            const tipoSelect = document.getElementById('tipo');
            tipoSelect.innerHTML = '';
            data.forEach(tipo => {
                tipoSelect.innerHTML += `<option value="${tipo.id}">${tipo.nome}</option>`;
            });
        });

    fetch('/api/dependencias')
        .then(response => response.json())
        .then(data => {
            const dependenciaSelect = document.getElementById('dependencia');
            dependenciaSelect.innerHTML = '';
            data.forEach(dependencia => {
                dependenciaSelect.innerHTML += `<option value="${dependencia.id}">${dependencia.nome}</option>`;
            });
        });

    fetch('/api/unidades_consumidoras')
        .then(response => response.json())
        .then(data => {
            const unidadeConsumidoraSelect = document.getElementById('unidade_consumidora');
            unidadeConsumidoraSelect.innerHTML = '';
            data.forEach(unidade => {
                unidadeConsumidoraSelect.innerHTML += `<option value="${unidade.id}">${unidade.nome}</option>`;
            });
        });
}

// Função para listar dispositivos existentes
function loadDispositivos() {
    fetch('/api/dispositivos')
        .then(response => response.json())
        .then(data => {
            const dispositivosList = document.getElementById('dispositivosList');
            dispositivosList.innerHTML = '';

            data.forEach(dispositivo => {
                const div = document.createElement('div');
                div.classList.add('border', 'p-2', 'mb-2');
                div.innerHTML = `
                    <strong>${dispositivo.nome}</strong> - Consumo: ${dispositivo.consumo} kWh, Uso Diário: ${dispositivo.uso_diario}h
                    <button class="btn btn-sm btn-warning ms-3" onclick="editDispositivo(${dispositivo.id})">Editar</button>
                    <button class="btn btn-sm btn-danger ms-2" onclick="deleteDispositivo(${dispositivo.id})">Excluir</button>
                `;
                dispositivosList.appendChild(div);
            });
        });
}

// Função para editar um dispositivo
function editDispositivo(id) {
    fetch(`/api/dispositivos/${id}`)
        .then(response => response.json())
        .then(dispositivo => {
            document.getElementById("dispositivoForm").classList.remove("d-none");
            document.getElementById("formTitle").textContent = "Editar Dispositivo";
            document.getElementById("dispositivoId").value = dispositivo.id;
            document.getElementById("nome").value = dispositivo.nome;
            document.getElementById("consumo").value = dispositivo.consumo;
            document.getElementById("uso_diario").value = dispositivo.uso_diario;
            document.getElementById("tipo").value = dispositivo.tipo_id;
            document.getElementById("dependencia").value = dispositivo.dependencia_id;
            document.getElementById("unidade_consumidora").value = dispositivo.unidade_consumidora_id;
        });
}

// Função para deletar um dispositivo
function deleteDispositivo(id) {
    if (confirm("Deseja realmente excluir este dispositivo?")) {
        fetch(`/api/dispositivos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Dispositivo excluído com sucesso!');
                loadDispositivos();
            } else {
                alert('Erro ao excluir o dispositivo');
            }
        });
    }
}

// Função para salvar o dispositivo (adicionar ou editar)
document.getElementById("dispositivoFormElement").addEventListener("submit", function (event) {
    event.preventDefault();

    const dispositivoId = document.getElementById("dispositivoId").value;
    const nome = document.getElementById("nome").value;
    const consumo = document.getElementById("consumo").value;
    const uso_diario = document.getElementById("uso_diario").value;
    const tipo = document.getElementById("tipo").value;
    const dependencia = document.getElementById("dependencia").value;
    const unidade_consumidora = document.getElementById("unidade_consumidora").value;

    const method = dispositivoId ? 'PUT' : 'POST';
    const url = dispositivoId ? `/api/dispositivos/${dispositivoId}` : '/api/dispositivos';

    const data = {
        nome: nome,
        consumo: parseFloat(consumo),
        uso_diario: parseFloat(uso_diario),
        tipo: parseInt(tipo),
        dependencia: parseInt(dependencia),
        unidade_consumidora: parseInt(unidade_consumidora)
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Dispositivo salvo com sucesso!');
            loadDispositivos();
            document.getElementById("dispositivoForm").classList.add("d-none");
        } else {
            alert('Erro ao salvar o dispositivo');
        }
    });
});

// Carregar opções e lista ao iniciar
window.onload = function () {
    loadOptions();
    loadDispositivos();
};