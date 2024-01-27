document.addEventListener("DOMContentLoaded", function() {
    fetch('roadmap-data.json')
        .then(response => response.json())
        .then(data => {
            const roadmapContainer = document.getElementById('roadmap-entries');
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (item.id === "header") {
                    // Render as header
                    roadmapContainer.innerHTML += `
                        <div class="roadmap-header">
                            <div class="header-item">${item.date}</div>
                            <div class="header-item">${item.feature}</div>
                            <div class="header-item">${item.version}</div>
                            <div class="header-item">${item.notes}</div>
                        </div>
                    `;
                } else if (item.id === "ignore") {
                    continue; // Now valid within a for loop
                } else {
                    // Determine the class based on the status
                    let statusClass = '';
                    switch (item.status) {
                        case 'P':
                            statusClass = 'status-pending';
                            break;
                        case 'I':
                            statusClass = 'status-inprogress';
                            break;
                        case 'C':
                            statusClass = 'status-completed';
                            break;
                    }

                    // Render as regular row with status class
                    roadmapContainer.innerHTML += `
                        <div class="roadmap-entry ${statusClass}">
                            <div class="column date">${item.date}</div>
                            <div class="column feature">${item.feature}</div>
                            <div class="column version">${item.version}</div>
                            <div class="column notes">${item.notes}</div>
                        </div>
                    `;
                }
            }
        })
        .catch(error => console.error('Error:', error));
});
