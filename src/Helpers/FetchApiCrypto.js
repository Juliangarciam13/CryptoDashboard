export const datesCryptos = async () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    try {
        const databaseCrypto = await fetch(apiUrl,
            { method: 'GET'});
        const databaseCryptoJson = await databaseCrypto.json();

        return databaseCryptoJson;
    } catch (error) {
        console.error(error)
    }
}

datesCryptos();