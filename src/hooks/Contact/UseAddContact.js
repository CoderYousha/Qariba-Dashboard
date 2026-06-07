import { useState } from "react";

export function useAddContact (){
    const [facebook, setFacebook] = useState(null);
    const [tiktok, setTiktok] = useState(null);
    const [instagram, setInstagram] = useState(null);
    const [youtube, setYoutube] = useState(null);
    const [email, setEmail] = useState(null);
    const [whatsapp, setWhatsapp] = useState(null);

    return {
        facebook, setFacebook, tiktok, setTiktok, instagram, setInstagram, youtube, setYoutube,
        email, setEmail, whatsapp, setWhatsapp,
    };
}