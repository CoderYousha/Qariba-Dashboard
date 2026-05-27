import Users from "../pages/Users/Users";

function UsersRoutes (){
    return [
        {
            path: '/users',
            element: <Users />
        },
    ];
}

export default UsersRoutes;