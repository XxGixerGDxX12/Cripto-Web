// script.js

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    const searchInput = document.getElementById('search');

    function fetchCryptoPrices() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderCryptos(data);
                searchInput.addEventListener('input', () => filterCryptos(data));
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
                <span class="name" onclick="redirectToCryptoSite('${crypto.name}')">${crypto.name}</span>
                <span class="price">$${crypto.current_price.toFixed(2)}</span>
            `;
            cryptoContainer.appendChild(cryptoElement);
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

    function redirectToCryptoSite(cryptoName) {
        const formattedCryptoName = cryptoName.toLowerCase().replace(' ', '-');
        window.location.href = `https://www.cryptosite.com/${formattedCryptoName}`;
    }

    fetchCryptoPrices();
});
