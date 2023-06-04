import '../Styles/CardCrypto.css'
import { datesCryptos } from '../Helpers/FetchApiCrypto';
import { useState } from 'react';
import CryptoChart from './Graph';
import lens from '../Media/LensImg.png'

const CardCrypto = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const fetchData = async () => {
        try {
            const data = await datesCryptos();
            setCryptoData(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (cryptoData.length === 0) {
        fetchData();
        return null;
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredCryptoData = cryptoData.filter((crypto) =>
        crypto.name.toLowerCase().startsWith(searchValue) ||
        crypto.symbol.toLowerCase().startsWith(searchValue)
    );

    const formatNumber = (number) => {
        return number.toLocaleString('es', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        }).replace(/\./g, ',');
    };

    const mapCrypto = () => {
        return filteredCryptoData.map((crypto) => (
            <div key={crypto.name} className='crypto'>
                <img src={crypto.image} alt={crypto.name}></img>
                <div className='nameSymbol'>
                    <h4 style={{ fontSize: '12px' }}>{crypto.name}</h4>
                    <p style={{ fontSize: '12px', color: '#898989' }}>{crypto.symbol}</p>
                </div>
                <p style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '10px' }}>{formatNumber(crypto.current_price)}</p>
            </div>
        ));
    };

    return (
        <div className="containerCards">
            <div className="containerGraph">
                <div className='titleGraph'>
                    <h1>Sales Activity</h1>
                    <p>
                        Here you can compare sales channel to determine the most effective<br />
                        channels and develop a sales satrategy based on this data.
                    </p>
                </div>
                <div><CryptoChart /></div>
            </div>
            <div className="containerPanel">
                <div className="containerTitle">
                    <p style={{ fontSize: '130%' }}>Control panel</p>
                    <div className='search'>
                    <input placeholder="Enter your search request..." value={searchValue} onChange={handleSearchChange} />
                    <img src={lens}/>
                    </div>
                    <div className='titleCrypto'>
                        <h1 style={{ fontSize: '80%' }}>B2B DISTRIBUTION</h1>
                        <p style={{ fontSize: '70%' }}>Sales Deals</p>
                    </div>
                </div>
                <div>
                    <hr className="horizontalLine" />
                </div>
                <div className="containerCryptos">
                    {mapCrypto()}
                </div>
            </div>
        </div>
    );
};

export default CardCrypto;