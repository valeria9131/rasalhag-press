document.addEventListener('DOMContentLoaded', () => {
    fetch('data/CATALOG.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('collections-container');
            data.collections.forEach(col => {
                const div = document.createElement('div');
           div.innerHTML = `
    <h3>${col.name}</h3>
    <p>${col.description}</p>
    <small>Items: ${col.items_count}</small>
`;
                container.appendChild(div);
            });
        });
});
