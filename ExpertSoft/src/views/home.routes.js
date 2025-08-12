export function homeView(){
    return `
    <h2> Pagina principal </h2>
    <button id='subirInfo'>Clic aquí para subir su archivo de información</button>
    `
}

export function homeSetup(){
    document.getElementById('subirInfo').addEventListener('click', (e) => {
        e.preventDefault();
        alert('PENDIENTE HACER FUNCION')
    })
}