const billInput = document.querySelector('.input-field');
const peopleInput = document.querySelector('.people-input');
const tipButtons = document.querySelectorAll('.tip-button');
const customButton = document.querySelector('.custom-button');
const customInput = document.querySelector('.custom-input-field');
const tipAmountDisplay = document.querySelector('.results .value:first-of-type');
const totalDisplay = document.querySelector('.results .value:last-of-type');
const resetButton = document.querySelector('.reset-button');

let billAmount = 0;
let numberOfPeople = 1;
let tipPercentage = 0;

function calculateTip() {
    if (numberOfPeople === 0) return;

    const tipAmountPerPerson = (billAmount * (tipPercentage / 100)) / numberOfPeople;
    const totalPerPerson = (billAmount / numberOfPeople) + tipAmountPerPerson;

    tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

billInput.addEventListener('input', () => {
    billAmount = parseFloat(billInput.value) || 0;
    calculateTip();
});

peopleInput.addEventListener('input', () => {
    numberOfPeople = parseFloat(peopleInput.value) || 1;
    if (numberOfPeople === 0) {
        document.querySelector('.error-message').classList.add('active');
        peopleInput.style.borderColor = 'red';
    } else {
        document.querySelector('.error-message').classList.remove('active');
        peopleInput.style.borderColor = '';
    }
    calculateTip();
});

tipButtons.forEach(button => {
    button.addEventListener('click', function() {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        customButton.classList.remove('active');
        customInput.value = '';
        document.querySelector('.custom-input-group').classList.add('hidden');
        this.classList.add('active');
        tipPercentage = parseFloat(this.textContent);
        calculateTip();
    });
});

customButton.addEventListener('click', function() {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    document.querySelector('.custom-input-group').classList.remove('hidden');
});

customInput.addEventListener('input', () => {
    tipPercentage = parseFloat(customInput.value) || 0;
    calculateTip();
});

resetButton.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customInput.value = '';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    customButton.classList.remove('active');
    document.querySelector('.custom-input-group').classList.add('hidden');
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    document.querySelector('.error-message').classList.remove('active');
    peopleInput.style.borderColor = '';
    billAmount = 0;
    numberOfPeople = 1;
    tipPercentage = 0;
});
