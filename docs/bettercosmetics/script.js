document.addEventListener("DOMContentLoaded", function() {
    // Check if the roadmap container exists
    const roadmapContainer = document.getElementById('roadmap-entries');
    if (roadmapContainer) {
        fetch('roadmap-data.json')
            .then(response => response.json())
            .then(data => {
                const headerItems = data.filter(item => item.id === "header");
                const ignoreItems = data.filter(item => item.id === "ignore");
                const otherItems = data.filter(item => item.id !== "header" && item.id !== "ignore").reverse();
                const combinedData = [...headerItems, ...otherItems, ...ignoreItems];
                
                for (let i = 0; i < combinedData.length; i++) {
                    const item = combinedData[i];
                    if (item.id === "header") {
                        roadmapContainer.innerHTML += `<div class="roadmap-header"><div class="header-item">${item.date}</div><div class="header-item">${item.feature}</div><div class="header-item">${item.version}</div><div class="header-item">${item.notes}</div></div>`;
                    } else if (item.id === "ignore") {
                        continue;
                    } else {
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
                        roadmapContainer.innerHTML += `<div class="roadmap-entry ${statusClass}"><div class="column date">${item.date}</div><div class="column feature">${item.feature}</div><div class="column version">${item.version}</div><div class="column notes">${item.notes}</div></div>`;
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }

    const settingsTableBody = document.getElementById('settingsTableBody');
    if (settingsTableBody) {
        fetch('INI-settings.json')
            .then(response => response.json())
            .then(data => {
                let iniString = "[BetterCosmetics]\n"; // Moved outside the forEach loop
                data.settings.forEach(setting => {
                    if (setting.id === "-1" || setting.key === "[BetterCosmetics]") {
                        // Skip this setting
                        return;
                    }
                    const entryDiv = document.createElement('div');
                    entryDiv.className = (setting.id === "header") ? 'roadmap-header' : 'roadmap-entry';
                    entryDiv.innerHTML = `
                        <div class="column">${setting.key || ''}</div>
                        <div class="column">${setting.description || ''}</div>
                        <div class="column">${setting.value || ''}</div>
                    `;
                    settingsTableBody.appendChild(entryDiv);
                    if (setting.id !== "header") { // Ensure it's not a header entry
                        iniString += `${setting.key} ${setting.value}\n`; // Add only key-value pairs
                    }
                });
                // Append the formatted INI string to the designated section
                const iniSection = document.getElementById('iniConfig');
                if (iniSection) {
                    iniSection.textContent = iniString;
                }
            })
            .catch(error => console.error('Error loading the settings:', error));
    }
    
    


});
