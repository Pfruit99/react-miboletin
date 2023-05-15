import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadBoletin = (id, boletinData) => {
    const [boletin, setBoletin] = useState(null);
    const [userAvailable, setUserAvailable] = useState([]);
    const [loading, setLoading] = useState(false);


    return {
        boletin,
        userAvailable,
        loading,
    }
}

export default useLoadBoletin;
