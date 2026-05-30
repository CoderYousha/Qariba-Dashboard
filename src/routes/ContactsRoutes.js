import Contacts from "../pages/Contacts/Contacts";

function ContactsRoutes (){
    return [
        {
            path: "/contacts",
            element: <Contacts />,
        }
    ];
}

export default ContactsRoutes;