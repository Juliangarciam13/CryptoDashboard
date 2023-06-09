import '../Styles/Crypto.css'

const CryptoContainer = ({ cryptoData, formatNumber, onClick }) => {
    const mapCrypto = () => {

        return cryptoData?.map((crypto) => (
            <div key={crypto.id} onClick={() => onClick(crypto)} className="crypto">
                <img src={crypto.image} alt={crypto.name}></img>
                <div className="nameSymbol">
                    <h4>{crypto.name}</h4>
                    <p>{crypto.symbol}</p>
                </div>
                <p>
                    $ {formatNumber(crypto.current_price)}
                </p>
            </div>
        ));
    };

    return <div>{mapCrypto()}</div>;
};


export default CryptoContainer;