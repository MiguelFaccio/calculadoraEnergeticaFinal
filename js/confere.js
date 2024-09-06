
const urls = {
    residencias: 'http://localhost:8000/unidades-consumidoras',
    dispositivos: 'http://localhost:8000/dispositivos',
    bandeiras: 'http://localhost:8000/bandeiras',
};

async function checkRouteStatus(url, elementId) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            document.getElementById(elementId).innerText = `${url} - OK`;
        } else {
            document.getElementById(elementId).innerText = `${url} - Falhou (${response.statusText})`;
        }

    }catch(error) {
        document.getElementById(elementId).innerText = `${url} - Erro (${error.message})`;
    }

}
window.onload = function(){
    checkRouteStatus(url.residencias, 'residencias-status');
    checkRouteStatus(url.dispositivos, 'dispositivos-status');
    checkRouteStatus(url.bandeiras, 'bandeiras-status');
};

