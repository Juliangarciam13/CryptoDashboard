import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CryptoChart = () => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
                );
                const data = await response.json();

                const formattedData = {
                    labels: data.prices.map((entry) => new Date(entry[0]).toLocaleDateString()),
                    datasets: [
                        {
                            label: "Precio de Bitcoin (USD)",
                            data: data.prices.map((entry) => entry[1]),
                            backgroundColor: "blue",
                            borderColor: "blue",
                        },
                    ],
                };

                setChartData(formattedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCryptoData();
    }, []);

    useEffect(() => {
        if (chartData) {
            const ctx = chartRef.current.getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div>
            {chartData ? (
                <canvas ref={chartRef}></canvas>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default CryptoChart;