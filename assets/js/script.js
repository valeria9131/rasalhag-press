document.addEventListener('DOMContentLoaded', () => {
    fetch('data/CATALOG.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки каталога');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('collections-container');
  // Global array to store catalog data
let catalogData = [];

// Fetch data from the catalog JSON file
fetch('data/CATALOG.json')
    .then(response => response.json())
    .then(data => {
        catalogData = data.collections;
        const container = document.getElementById('collections-container');
        container.innerHTML = ''; // Clear container
        
        // Render all collections using the separate function
        catalogData.forEach(renderCollection);
    })
    .catch(error => console.error('Error loading catalog:', error));

// Function to render a single collection card
function renderCollection(col) {
    const container = document.getElementById('collections-container');
    const div = document.createElement('div');
    div.className = 'collection-card';
    div.innerHTML = `
        <div class="card-image-placeholder">No Image</div>
        <span class="status-badge">${col.status}</span>
        <h3>${col.name}</h3>
        <p>${col.description || 'No description available'}</p>
        <div class="card-meta">
            <small>Items: ${col.items_count}</small>
            <small>Added: ${col.date_added}</small>
        </div>
        <button onclick="alert('Navigating to ${col.name}')" class="view-btn">View Collection</button>
    `;
    container.appendChild(div);
}
    container.appendChild(div);
}

// Внутри вашего fetch (там, где был цикл):
data.collections.forEach(renderCollection);
        })
        .catch(error => console.error('Ошибка:', error));
});
function filterCollections(status) {
    const container = document.getElementById('collections-container');
    container.innerHTML = ''; // Очищаем контейнер
    
    // Получаем данные (предполагая, что 'catalogData' сохранено глобально после первого fetch)
    const filtered = status === 'all' 
        ? catalogData 
        : catalogData.filter(col => col.status === status);
        
    filtered.forEach(renderCollection); // Функция рендеринга одной карточки
}

const loader = document.getElementById('loader');
if (loader) loader.style.display = 'none';

const counter = document.getElementById('counter');
if (counter) {
    counter.innerText = `Showing ${filtered.length} collections`;
}
