import { WebSocket } from 'nextjs-websocket';
import { useState } from 'react';

export default function Home(){
    const [message, setMessage] = useState("");
    
    const handleData = data => {
        setMessage(data);
    }

    //TODO - install git flow
    return <div>
            {message}
            <WebSocket url='wss://dex.binance.org/api/ws/bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v'
                       onMessage={data => handleData(data, 1)}/>
    </div>
}