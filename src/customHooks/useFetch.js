//used for API calls
import { useState, useEffect } from "react"

const useFetch = (url,optionsStr) => {

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [responseStatus, setStatus] = useState(0);
    
    useEffect(() => {

        const fetchData = async () => {

            try {
                const options = JSON.parse(optionsStr);
                const response = await fetch(url, options);
                const content = await response.json();
                setStatus(response.status);
                setData(content);
                setError(null); 
            }
            catch(err) {
                setError(err.message);
                console.log("Error",error);
            }
          };
      
        fetchData();
    
      }, [url, optionsStr ,error]);

    return {data,responseStatus};
    
};

export default useFetch;