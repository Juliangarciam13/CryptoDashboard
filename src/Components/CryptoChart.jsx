import Chart from "chart.js/auto";
import '../Styles/CardCrypto.css';
import React, { useState, useEffect } from "react";


const CryptoChart = ({ selectedCrypto }) => {
    const [chartInstance, setChartInstance] = useState();
    const [loading, setLoading] = useState(true);

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

                const newChartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: "Price(USD)",
                            data: prices,
                            backgroundColor: "rgba(192, 192, 192, 0.8)",
                            borderWidth: 2,
                            hoverBackgroundColor: "#C1EE0A",
                        },
                    ],
                };

                createChart(newChartData);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCryptoData();
        setLoading(false);
    }, [selectedCrypto]);

    const createChart = (data) => {
        const ctx = document.getElementById("crypto-chart").getContext("2d");

        if (chartInstance) {
            chartInstance.destroy();
        }

        const newChartInstance = new Chart(ctx, {
            type: "bar",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false,
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

        setChartInstance(newChartInstance);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "95%", height: "400px", marginLeft: '25px' }}>
            <canvas id="crypto-chart"></canvas>
        </div>
    );
};

export default CryptoChart;
