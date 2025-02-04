// script.js
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');
    const articlesContainer = document.getElementById('articles-container');
    const newsContainer = document.getElementById('news-container');

    calculateBtn.addEventListener('click', () => {
        const transport = parseFloat(document.getElementById('transport').value) || 0;
        const energy = parseFloat(document.getElementById('energy').value) || 0;
        const diet = document.getElementById('diet').value;

        // Placeholder calculations (replace with actual logic)
        let carbonFootprint = (transport * 2.3) + (energy * 0.5); // Example conversion factors

        if (diet === 'vegetarian') {
            carbonFootprint *= 0.8;
        } else if (diet === 'vegan') {
            carbonFootprint *= 0.6;
        }

        result.textContent = `Your estimated carbon footprint: ${carbonFootprint.toFixed(2)} kg CO2e`;
    });



    // Fetch articles (using a dummy API for now - replace with real API)
    fetchArticles(articlesContainer, 'articles