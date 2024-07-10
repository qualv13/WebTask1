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
    const rows = data.trim().split('\n');
    const headings = rows[0].split(',');
    const values = rows.slice(1).map(row => row.split(','));
    return { headings, values };
}
function showRandomValue(headings, values) {
    const displayDiv = document.createElement('div');
    displayDiv.setAttribute('id', 'randomValueDisplay');
    displayDiv.innerHTML = '';
    let randomIndex;
    let randomValues;

    do {
        randomIndex = Math.floor(Math.random() * values.length);
        randomValues = values[randomIndex];
    } while (randomValues.includes(''));

    randomValues.forEach((value, index) => {
        const headingElement = document.createElement('h3');
        const valueElement = document.createElement('p');
        headingElement.textContent = headings[index];
        valueElement.textContent = value;
        displayDiv.appendChild(headingElement);
        displayDiv.appendChild(valueElement);
    });
    document.querySelector('body').appendChild(displayDiv);
}
document.addEventListener('DOMContentLoaded', loadAndShowRandomValue);
