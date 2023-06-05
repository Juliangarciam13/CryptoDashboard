import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";


const CryptoChart = ({selectedCrypto}) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                if (selectedCrypto) {
                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}/market_chart?vs_currency=usd&days=30`
                    );
                const data = await response.json();

                const dates = [];
                const prices = [];

                const startDate = new Date(data.prices[0][0]);
                for (let i = 0; i < 30; i++) {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + i);
                    dates.push(date.toLocaleDateString());
                    prices.push(data.prices[i][1]);
                }

                const formattedData = {
                    labels: dates,
                    datasets: [
                        {
                            label: "Precio de Bitcoin (USD)",
                            data: prices,
                            backgroundColor: "rgba(192, 192, 192, 0.8)",
                            borderWidth: 2,
                            hoverBackgroundColor: "#C1EE0A",
                        },
                    ],
                };
                setChartData(formattedData);
            }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCryptoData();
    }, [selectedCrypto]);

    useEffect(() => {
        if (chartData) {
            const ctx = chartRef.current.getContext("2d");

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
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
                            ticks: {
                                beginAtZero: true,
                                font: {
                                    size: 12,
                                },
                            },
                            categoryPercentage: 1,
                            barPercentage: 0.8,
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                display: true,
                            },
                            ticks: {
                                stepSize: 500,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            {chartData ? (
                <canvas ref={chartRef}></canvas>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CryptoChart;