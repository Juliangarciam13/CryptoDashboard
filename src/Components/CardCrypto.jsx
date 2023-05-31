import '../Styles/CardCrypto.css'
import { datesCryptos } from '../Helpers/FetchApiCrypto';
import { useState, useEffect } from 'react';

const CardCrypto = () => {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await datesCryptos();
                setCryptoData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="containerCards">
            <div className="containerGraph">
                <div className='titleGraph'>
                    <h1>Sales Activity</h1>
                    <p>Hola</p>
                </div>
                <div>Graph</div>
            </div>
            <div className="containerPanel">
                <div className="containerTitle">
                    <p>Control Panel</p>
                    <input placeholder="Enter your search request" />
                    <div className='titleCrypto'>
                        <p>B2B DISTRIBUTION</p>
                        <p>Sales Deals</p>
                    </div>
                </div>
                <div>
                <hr className="horizontalLine" />
                </div>
                <div className="containerCryptos">
                    {cryptoData?.map((crypto) => (
                        <div key={crypto.name} className='crypto'>
                            <img src={crypto.image} alt={crypto.name}></img>
                            <div className='nameSymbol'>
                                <h4>{crypto.name}</h4>
                                <p>{crypto.symbol}</p>
                            </div>
                            <p>{crypto.current_price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardCrypto;

/**<div className="containerCryptos">
                    {cryptoData?.map((crypto) => (
                        <div key={crypto.name} className='crypto'>
                            <ul className='cryptoList'>
                                <li><img src={crypto.image} alt={crypto.name}></img>
                                    <div className='nameSymbol'>
                                        <h4>{crypto.name}</h4>
                                        <p>{crypto.symbol}</p>
                                    </div>
                                    <p>{crypto.current_price}</p>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div> */