document.addEventListener('DOMContentLoaded', () => {
    fetch('data/CATALOG.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки каталога');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('collections-container');
        data.collections.forEach(col => {
    const div = document.createElement('div');
    div.className = 'collection-card';
div.innerHTML = `
    <div class="card-image-placeholder">No Image</div>
    <span class="status-badge">${col.status}</span>
    <h3>${col.name}</h3>
    <p>${col.description || 'No description available'}</p>
    <small>Items: ${col.items_count}</small>
    <button onclick="alert('Navigating to ${col.name}')" class="view-btn">View Collection</button>
`;
    container.appendChild(div);
});
        })
        .catch(error => console.error('Ошибка:', error));
});
