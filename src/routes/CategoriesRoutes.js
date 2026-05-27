import Categories from "../pages/Categories/Categories";

function CategoriesRoutes (){
    return [
        {
            path: '/categories',
            element: <Categories />
        },
    ];
}

export default CategoriesRoutes;