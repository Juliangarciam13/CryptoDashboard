const CryptoContainer = ({ filteredCryptoData, formatNumber, onClick }) => {
    const mapCrypto = () => {
        return filteredCryptoData.map((crypto) => (
            <div key={crypto.id} onClick={() => onClick(crypto)} className="crypto">
                <img src={crypto.image} alt={crypto.name}></img>
                <div className="nameSymbol">
                    <h4 style={{ fontSize: "12px" }}>{crypto.name}</h4>
                    <p style={{ fontSize: "12px", color: "#898989" }}>{crypto.symbol}</p>
                </div>
                <p style={{ fontSize: "12px", fontWeight: "bold", marginRight: "10px" }}>
                    {formatNumber(crypto.current_price)}
                </p>
            </div>
        ));
    };

    return <div>{mapCrypto()}</div>;
};

export default CryptoContainer;