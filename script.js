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

        let carbonFootprint = (transport * 2.3) + (energy * 0.5);

        if (diet === 'vegetarian') {
            carbonFootprint *= 0.8;
        } else if (diet === 'vegan') {
            carbonFootprint *= 0.6;
        }

        result.innerHTML = `<strong>Your estimated carbon footprint:</strong><br> <span style="font-size: 1.2rem; color: #7c9473">${carbonFootprint.toFixed(2)} kg CO₂e</span>`;
    });

    const apiKey = 'f2ec8f06-85f7-4bac-bbc6-fb7e49f09dbd';
    const query = 'climate change';
    const fromDate = '2024-01-01';
    const toDate = '2024-12-31';

    async function fetchGuardianArticles(query, fromDate, toDate) {
        const apiUrl = `https://content.guardianapis.com/search?q=${query}&from-date=${fromDate}&to-date=${toDate}&show-fields=headline,thumbnail,body&api-key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.response && data.response.results.length > 0) {
                articlesContainer.innerHTML = '';

                data.response.results.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');

                    const image = document.createElement('img');
                    image.src = article.fields.thumbnail || 'default-image.jpg';
                    image.alt = article.fields.headline;

                    const headline = document.createElement('h3');
                    headline.textContent = article.fields.headline;

                    const link = document.createElement('a');
                    link.href = article.webUrl;
                    link.textContent = 'Read More';
                    link.target = '_blank';

                    const preview = document.createElement('p');
                    if (article.fields.body) {
                        preview.textContent = article.fields.body.slice(0, 200) + '...';
                    }

                    articleDiv.appendChild(image);
                    articleDiv.appendChild(headline);
                    articleDiv.appendChild(preview);
                    articleDiv.appendChild(link);

                    articlesContainer.appendChild(articleDiv);
                });
            } else {
                articlesContainer.innerHTML = '<p>No articles found.</p>';
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            articlesContainer.innerHTML = '<p>Failed to load articles.</p>';
        }
    }

    fetchGuardianArticles(query, fromDate, toDate);
});
