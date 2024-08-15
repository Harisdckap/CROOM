import React, { useState } from 'react';
import axios from 'axios';

const DecodeTokenQuery = () => {
    const [decodedData, setDecodedData] = useState(null);
    const [token, setToken] = useState('');

    const handleDecode = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/decode`, {
                params: {
                    token: token
                }
            });
            setDecodedData(response.data);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your token"
            />
            <button onClick={handleDecode}>Decode Token</button>
            {decodedData && <pre>{JSON.stringify(decodedData, null, 2)}</pre>}
        </div>
    );
};

export default DecodeTokenQuery;
