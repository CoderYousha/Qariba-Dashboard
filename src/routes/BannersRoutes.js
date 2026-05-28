import Banners from "../pages/Banners/Banners";

function BannersRoutes (){
    return [
        {
            path: '/banners',
            element: <Banners />
        },
    ];
}

export default BannersRoutes;