document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    const searchInput = document.getElementById('search');
    const ctx = document.getElementById('priceChart').getContext('2d');
    let chart = null;

    function fetchCryptoPrices() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderCryptos(data);
                searchInput.addEventListener('input', () => filterCryptos(data));
                setInterval(() => fetchCryptoPrices(), 5000); // Actualizar cada 5 segundos
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderCryptos(data) {
        const cryptoContainer = document.getElementById('crypto-prices');
        cryptoContainer.innerHTML = ''; // Limpiar contenido previo

        data.forEach(crypto => {
            const cryptoElement = document.createElement('div');
            cryptoElement.className = 'crypto';
            cryptoElement.innerHTML = `
                <img src="${crypto.image}" alt="${crypto.name}" />
                <span class="name" data-id="${crypto.id}">${crypto.name}</span>
                <span class="price">$${crypto.current_price.toFixed(2)}</span>
                <span class="change ${crypto.price_change_percentage_24h >= 0 ? 'green' : 'red'}">${crypto.price_change_percentage_24h.toFixed(2)}%</span>
            `;
            cryptoContainer.appendChild(cryptoElement);
        });

        // Evento clic para mostrar detalles
        const cryptoNames = document.querySelectorAll('.name');
        cryptoNames.forEach(name => {
            name.addEventListener('click', function() {
                const cryptoId = this.getAttribute('data-id');
                showCryptoDetails(cryptoId);
            });
        });
    }

    function filterCryptos(data) {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = data.filter(crypto => 
            crypto.name.toLowerCase().includes(searchTerm) || 
            crypto.symbol.toLowerCase().includes(searchTerm)
        );
        renderCryptos(filteredData);
    }

    function showCryptoDetails(cryptoId) {
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=30`)
            .then(response => response.json())
            .then(data => {
                const prices = data.prices.map(price => ({ x: new Date(price[0]), y: price[1] }));
                if (chart) {
                    chart.destroy();
                }
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'Precio de los últimos 30 días',
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day'
                                }
                            },
                            y: {
                                beginAtZero: false
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching chart data:', error));
    }

    fetchCryptoPrices();
});
