export const fetchCryptoSearch = async (searchValue, cryptoData) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchValue}`);
        const searchData = await response.json();
        const coins = searchData?.coins || [];
        const formattedCoins = coins.map((coin) => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.large,
        }));

        const filteredCryptoData = cryptoData.filter((crypto) => {
            const foundCrypto = formattedCoins.find((formattedCrypto) => formattedCrypto.id === crypto.id);
            if (foundCrypto) {
                const { price } = foundCrypto;
                return { ...crypto, price };
            }
        });

        return filteredCryptoData;

    } catch (error) {
        console.error(error);
        throw error;
    }
};