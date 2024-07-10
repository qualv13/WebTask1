async function loadAndShowRandomValue() {
    try {
        const response = await fetch('data.csv');
        const data = await response.text();
        const { headings, values } = parseCSV(data);
        showRandomValue(headings, values);
    } catch (error) {
        console.error('Error fetching the CSV file:', error);
    }
}
function parseCSV(data) {
    const rows = [];
    const lines = data.split('\n');

    lines.forEach(line => {
        const columns = [];
        let col = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                columns.push(col.trim() === '' ? null : col.trim());
                col = '';
            } else {
                col += char;
            }
        }
        columns.push(col.trim() === '' ? null : col.trim());
        rows.push(columns);
    });
    const headings = rows[0];
    const values = rows.slice(1);
    return { headings, values };
}

function showRandomValue(headings, values) {
    const displayDiv = document.createElement('div');
    displayDiv.setAttribute('id', 'randomValueDisplay');
    displayDiv.innerHTML = '';
    let randomIndex;
    let randomValue;
    let idx = 0;
    do {
        randomIndex = Math.floor(Math.random() * (values[idx].length));
        randomValue = values[randomIndex].value;
        if (values[randomIndex][idx] != null) {
            const headingElement = document.createElement('h3');
            const valueElement = document.createElement('p');
            headingElement.textContent = headings[idx];
            valueElement.textContent = values[randomIndex][idx];
            displayDiv.appendChild(headingElement);
            displayDiv.appendChild(valueElement);
            ++idx;
        }
    } while (idx < headings.length);
    document.querySelector('body').appendChild(displayDiv);
}
document.addEventListener('DOMContentLoaded', loadAndShowRandomValue);
