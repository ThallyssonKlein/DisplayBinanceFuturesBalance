// import { WebSocket } from 'nextjs-websocket';
import { useState, useEffect } from 'react';
import { create } from 'apisauce';
const crypto = require('crypto');
import Grid from '@material-ui/core/Grid';
import Asset from '../components/Asset';

export default function Home(){
    const [array, setArray] = useState([]);
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

    const API = create({
        baseURL: 'https://fapi.binance.com',
        headers: {"X-MBX-APIKEY" : API_KEY }
    })

    const buildSign = timestamp => {
        return crypto.createHmac('sha256', API_SECRET).update('timestamp=' + timestamp).digest('hex');
    };

    const request = async _ => {
        const timestamp = new Date().getTime();
        const signature = buildSign(timestamp);
        const response = await API.get('/fapi/v2/balance?timestamp=' + timestamp + '&signature=' + signature);
        setArray(response.data);
    }
    
    useEffect(_ => {
        request();
        setInterval(_ => {
            request();
        }, 60000);
    }, []);

    return <div className="viewport">
             {array.length > 0 && <Grid container
                   direction="row"
                   justify="center"
                   alignItems="center">
                         {array.map(asset => (
                            <Asset asset={asset.asset} balance={asset.balance} availableBalance={asset.availableBalance}/>
                        ))}
            </Grid>}           
    </div>
}