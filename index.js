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
    const regex = /("([^"]*)")|([^,\r\n]+)/g;
    const lines = data.split('\n').filter(line => line.trim() !== '');

    lines.forEach(line => {
        const columns = [];
        let match;
        while ((match = regex.exec(line)) !== null) {
            if (match[2]) {
                columns.push(match[2]);
            } else {
                columns.push(match[0]);
            }
        }
        rows.push(columns);
    });

    const headings = rows[0];
    const values = rows.slice(1);
    return { headings, values };
}



// function parseCSV(data) {
//     const rows = data.trim().split('\n');
//     const headings = rows[0].split(',');
//     const values = rows.slice(1).map(row => row.split(','));
//     return { headings, values };
// }
function showRandomValue(headings, values) {
    const displayDiv = document.createElement('div');
    displayDiv.setAttribute('id', 'randomValueDisplay');
    displayDiv.innerHTML = '';
    let randomIndex;
    let randomValue;

    // do {
    //     randomIndex = Math.floor(Math.random() * values.length);
    //     randomValues = values[randomIndex];
    //
    // } while (randomValues.includes(''));
    let idx = 0;
    do {
        randomIndex = Math.floor(Math.random() * (values[idx].length));
        randomValue = values[randomIndex].value;
        if (values[idx][randomIndex] != '') {
            const headingElement = document.createElement('h3');
            const valueElement = document.createElement('p');
            headingElement.textContent = headings[idx];
            valueElement.textContent = values[randomIndex][idx];
            displayDiv.appendChild(headingElement);
            displayDiv.appendChild(valueElement);
            idx++;
        }
    } while (idx < headings.length);

    // randomValues.forEach((value, index) => {
    //     const headingElement = document.createElement('h3');
    //     const valueElement = document.createElement('p');
    //     headingElement.textContent = headings[index];
    //     valueElement.textContent = value;
    //     displayDiv.appendChild(headingElement);
    //     displayDiv.appendChild(valueElement);
    // });
    document.querySelector('body').appendChild(displayDiv);
}
document.addEventListener('DOMContentLoaded', loadAndShowRandomValue);
