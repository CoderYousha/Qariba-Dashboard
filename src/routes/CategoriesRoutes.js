import Categories from "../pages/Categories/Categories";
import SubCategories from "../pages/Categories/SubCategories";

function CategoriesRoutes (){
    return [
        {
            path: '/categories',
            element: <Categories />
        },
        {
            path: '/categories/:id/sub-categories',
            element: <SubCategories />
        },
    ];
}

export default CategoriesRoutes;