export function clientView() {
    return `
    <div id="mensaje"></div>
    <button id='addClient'>Agregar cliente</button>
    <table id="clientsTable">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Identificacion</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th></th>
            <th></th>
        </tr>
    </table>
    `;
}

export function clientSetup() {
    document.getElementById('addClient').addEventListener('click', (e) => {
        e.preventDefault();
        location.hash = 'addClient'
    });
    const table = document.getElementById('clientsTable');
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${element.id_cliente}</td>
                    <td>${element.cliente}</td>
                    <td>${element.identificacion}</td>
                    <td>${element.direccion}</td>
                    <td>${element.telefono}</td>
                    <td>${element.correo}</td>
                    <td><button id="editClient">Editar</button></td>
                    <td><button id="deleteClient">Eliminar</button></td>
                `
                table.appendChild(row);
            });
        })
    document.getElementById('clientsTable').addEventListener('click', async function (e) {
        if (e.target.id === 'editClient') {
            e.preventDefault();
            const nombre = e.target.closest('tr').querySelector('td:nth-child(2)');
            nombre.innerHTML = `<input type="text" value="${nombre.textContent}">`;
            const identification = e.target.closest('tr').querySelector('td:nth-child(3)');
            identification.innerHTML = `<input type="text" value="${identification.textContent}">`;
            const direccion = e.target.closest('tr').querySelector('td:nth-child(4)');
            direccion.innerHTML = `<input type="text" value="${direccion.textContent}">`;
            const telefono = e.target.closest('tr').querySelector('td:nth-child(5)');
            telefono.innerHTML = `<input type="text" value="${telefono.textContent}">`;
            const correo = e.target.closest('tr').querySelector('td:nth-child(6)');
            correo.innerHTML = `<input type="text" value="${correo.textContent}">`;
            //
            e.target.textContent = 'Save';
            e.target.id = 'saveeditClient';
            // Edit client
        } else if (e.target.id === 'saveeditClient') {
            const row = e.target.closest('tr');
            const id = row.querySelector('td:nth-child(1)').textContent;
            const nombre = row.querySelector('td:nth-child(2) input').value;
            const identification = row.querySelector('td:nth-child(3) input').value;
            const direccion = row.querySelector('td:nth-child(4) input').value;
            const telefono = row.querySelector('td:nth-child(5) input').value;
            const correo = row.querySelector('td:nth-child(6) input').value;
            let body = { nombre, identification, direccion, telefono, correo };

            try {
                const response = await fetch(`http://localhost:3000/clientes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok) {
                    throw new Error('No se pudo modificar el cliente');
                }
                const result = await response.json();
                row.querySelector('td:nth-child(2)').textContent = nombre;
                row.querySelector('td:nth-child(3)').textContent = identification;
                row.querySelector('td:nth-child(4)').textContent = direccion;
                row.querySelector('td:nth-child(5)').textContent = telefono;
                row.querySelector('td:nth-child(6)').textContent = correo;
            } catch (error) {
                document.getElementById('mensaje').textContent = `Hubo un error actualizando el usuario: ${error}`
            }
        }
        else if (e.target.id === 'deleteClient') {
            e.preventDefault();
            const id = e.target.closest('tr').querySelector('td:nth-child(1)').textContent;
            console.log(id)
            fetch(`http://localhost:3000/clientes/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        alert('Eliminado correctamente.');
                        location.reload();
                    } else {
                        alert('No es posible eliminar un usuario que tiene citas asociadas')
                    }
                })
                .catch(error => {
                    console.error('Error de conexión en el proceso de eliminar: ', error);
                });
        }
    })
}