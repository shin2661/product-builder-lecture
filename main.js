
document.getElementById('generate-btn').addEventListener('click', () => {
    const numbersContainer = document.getElementById('numbers');
    numbersContainer.innerHTML = ''; // Clear previous numbers

    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const numberElement = document.createElement('span');
        numberElement.className = 'number';
        numberElement.textContent = number;
        numberElement.style.backgroundColor = getRandomColor();
        numbersContainer.appendChild(numberElement);
    });
});

function getRandomColor() {
    const colors = [
        '#ff6b6b', '#f06595', '#cc5de8', '#845ef7', '#5c7cfa', '#339af0',
        '#22b8cf', '#20c997', '#51cf66', '#94d82d', '#fcc419', '#ff922b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
