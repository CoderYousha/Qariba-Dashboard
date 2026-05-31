import Clients from "../pages/Clients/Clients";

function ClientsRoutes (){
    return [
        {
            path: '/clients',
            element: <Clients />
        },
    ];
}

export default ClientsRoutes;