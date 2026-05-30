import { useState } from "react";

export function useAddContact (){
    const [facebook, setFacebook] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    return {
        facebook, setFacebook, tiktok, setTiktok, instagram, setInstagram, youtube, setYoutube
    };
}