import Profile from "../pages/Profile/Profile";

function ProfileRoutes (){
    return [
        {
            path: "/profile",
            element: <Profile />
        }
    ];
}

export default ProfileRoutes;