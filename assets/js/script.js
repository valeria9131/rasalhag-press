// Global array to store catalog data
let catalogData = [];

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the catalog JSON file
    fetch('data/CATALOG.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load catalog');
            return response.json();
        })
        .then(data => {
            catalogData = data.collections;
            
            const container = document.getElementById('collections-container');
            container.innerHTML = ''; // Clear container
            
            // Render all collections
            catalogData.forEach(renderCollection);
            
            // Hide loader once loaded
            const loader = document.getElementById('loader');
            if (loader) loader.style.display = 'none';
            
            // Update counter
            updateCounter(catalogData.length);
        })
        .catch(error => console.error('Error loading catalog:', error));
});

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

// Function to filter collections based on status
function filterCollections(status) {
    const container = document.getElementById('collections-container');
    container.innerHTML = ''; // Clear container
    
    const filtered = status === 'all' 
        ? catalogData 
        : catalogData.filter(col => col.status === status);
        
    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-results">No collections found</p>';
        updateCounter(0);
        return;
    }
    
    filtered.forEach(renderCollection);
    updateCounter(filtered.length);
}

// Function to update the items counter
function updateCounter(count) {
    const counter = document.getElementById('counter');
    if (counter) {
        counter.innerText = `Showing ${count} collections`;
    }
}
