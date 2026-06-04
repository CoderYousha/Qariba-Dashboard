import Orders from "../pages/Orders/Orders";

function OrdersRoutes () {
    return [
        {
            path: "/orders",
            element: <Orders />
        }
    ];
}

export default OrdersRoutes;