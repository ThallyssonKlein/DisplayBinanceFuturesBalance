export default function Asset(props){
    return <div className="assetViewport">
            <h3 className="text">{props.asset}</h3>
            <h3 className="text">Balance: {props.balance}</h3>
            <h3 className="text">Available Balance: {props.availableBalance}</h3>
        </div>
}