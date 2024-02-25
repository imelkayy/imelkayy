document.addEventListener("DOMContentLoaded", function() {
    // Check if the roadmap container exists
    const roadmapContainer = document.getElementById('roadmap-entries');
    const versionFilter = document.getElementById('version-filter');
    const dateFilter = document.getElementById('date-filter');
    const statusFilter = document.getElementById('status-filter');
    
    if (roadmapContainer) {
        fetch('roadmap-data.json')
            .then(response => response.json())
            .then(data => {
                initializeFilters(data); // Setup initial data and filters
                // Event listeners for filters
                versionFilter.addEventListener('change', () => filterRoadmapEntries(data));
                dateFilter.addEventListener('change', () => filterRoadmapEntries(data));
                statusFilter.addEventListener('change', () => filterRoadmapEntries(data));
            })
            .catch(error => console.error('Error:', error));
    }
    
    function initializeFilters(data) {
        const uniqueDates = new Set();
        const uniqueVersions = new Set();
        data.forEach(item => {
            if (item.date && item.id !== 'header' && item.id !== 'ignore') uniqueDates.add(item.date);
            if (item.version && item.id !== 'header' && item.id !== 'ignore') uniqueVersions.add(item.version);
        });
        uniqueDates.forEach(date => dateFilter.add(new Option(date, date)));
        uniqueVersions.forEach(version => versionFilter.add(new Option(version, version)));
        filterRoadmapEntries(data); // Apply initial filter (show all)
    }
    
    function filterRoadmapEntries(data) {
        const selectedVersion = versionFilter.value;
        const selectedDate = dateFilter.value;
        const selectedStatus = statusFilter.value;
        roadmapContainer.innerHTML = ''; // Clear existing entries
    
        const filteredData = data.filter(item => {
            const byVersion = selectedVersion === 'all' || item.version === selectedVersion;
            const byDate = selectedDate === 'all' || item.date === selectedDate;
            const byStatus = selectedStatus === 'all' || item.status === selectedStatus;
            return byVersion && byDate && byStatus && item.id !== 'header' && item.id !== 'ignore';
        }).reverse();
    
        // If there are header items, add them first regardless of filters
        const headerItems = data.filter(item => item.id === "header");
        headerItems.forEach(item => addRoadmapEntry(item));
    
        // Add filtered entries
        filteredData.forEach(item => addRoadmapEntry(item));
    }
    
    function addRoadmapEntry(item) {
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
        let entryHTML = item.id === "header" ?
            `<div class="roadmap-header"><div class="header-item">${item.date}</div><div class="header-item">${item.feature}</div><div class="header-item">${item.version}</div><div class="header-item">${item.notes}</div></div>` :
            `<div class="roadmap-entry ${statusClass}"><div class="column date">${item.date}</div><div class="column feature">${item.feature}</div><div class="column version">${item.version}</div><div class="column notes">${item.notes}</div></div>`;
        
        roadmapContainer.innerHTML += entryHTML;
    }
    
    

    const settingsTableBody = document.getElementById('settingsTableBody');
    if (settingsTableBody) {
        fetch('INI-settings.json')
            .then(response => response.json())
            .then(data => {
                let iniString = "[BetterCosmetics]\n";
                data.settings.forEach(setting => {
                    if (setting.id === "header" || setting.key === "[BetterCosmetics]") {
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
                        iniString += `${setting.key}=${setting.value}\n`; // Add only key-value pairs
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
