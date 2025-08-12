export function addClientView(){
    return `
    <h2>Agregar Cliente</h2>
    <form id="new-costumer-form">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required>

        <label for="identification">Identificacion:</label>
        <input type="Number" id="identification" name="identification" required>
        
        <label for="address">Direccion:</label>
        <input type="text" id="address" name="address" required>
        
        <label for="phone">Telefono:</label>
        <input type="text" id="phone" name="phone" required>

        <label for="email">Correo:</label>
        <input type="email" id="email" name="email" required>

        <button type="submit">Create Costumer</button>
    </form>
    <div id="form-message"></div>
    `;
}

export function addClientSetup(){
    document.getElementById('new-costumer-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const identification = document.getElementById('identification').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        const body = { name, identification, address, phone, email };

        console.log(JSON.stringify(body))

        try {
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Error al subir el cliente');
            }
            const result = await response.json();
            document.getElementById('form-message').textContent = 'Costumer created successfully!';
            document.getElementById('new-costumer-form').reset();
            
        } catch (error) {
            console.log('Error creando el usuario: ', error);
            document.getElementById('form-message').textContent = 'Error creando el usuario. Intenta de nuevo.';
        }
    });
}