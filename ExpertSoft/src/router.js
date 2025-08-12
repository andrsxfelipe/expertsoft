import { homeView, homeSetup } from './views/home.routes.js'
import { clientView, clientSetup } from './views/clientes.routes.js';
import { billView } from './views/facturas.routes.js';
import { transactionsView } from './views/transacciones.routes.js';
import { addClientView, addClientSetup } from './views/addClient.routes.js'

export function router () {
    const route = location.hash.slice(1);
    const app = document.getElementById('app');
    switch(route){
        case 'home':
            app.innerHTML=homeView();
            homeSetup();
            break;
        case 'clients':
            app.innerHTML = clientView();
            clientSetup();
            break;
        case 'bills':
            billView();
            break;
        case 'transactions':
            transactionsView();
            break;
        case 'addClient':
            app.innerHTML=addClientView();
            addClientSetup();
        break;

        default:
            app.innerHTML = `<h2>Bienvenido TL</h2>`
    }
}