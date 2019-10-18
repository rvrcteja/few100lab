
let TipAmounts: NodeListOf<HTMLButtonElement>;
let dollarAmount: HTMLInputElement;
let tipSubtext: HTMLElement;
let billAmount: HTMLLIElement;
let tipPerc: HTMLLIElement;
let tipAmount: HTMLLIElement;
let totalAmount: HTMLLIElement;
let tipInputOtherAmount: HTMLInputElement;

export function runApp() {
    TipAmounts = document.querySelectorAll('.btn-secondary') as NodeListOf<HTMLButtonElement>;

    TipAmounts.forEach((ta, index) => {

        ta.addEventListener('click', tipAmountClick);
    });

    document.addEventListener('keyup', dollarAmountClick);
}

// tslint:disable-next-line: no-shadowed-variable
function calculateTipAmount(dollarAmount: string, tipPerc: string) {
    // tslint:disable-next-line: radix
    return parseInt(tipPerc) * parseInt(dollarAmount) / 100;
}

// tslint:disable-next-line: no-shadowed-variable
function calculateTotalAmount(dollarAmount: string, tipPerc: string) {
    // tslint:disable-next-line: radix
    return parseInt(dollarAmount) + calculateTipAmount(dollarAmount, tipPerc);
}

function dollarAmountClick() {
    let defaultTipAmount = 20;
    handleClick();

    // tslint:disable-next-line: radix
    if (parseInt(tipInputOtherAmount.value) > 0) {
        tipInputOtherAmount.classList.remove('error');
        // tslint:disable-next-line: radix
        defaultTipAmount = parseInt(tipInputOtherAmount.value);

        TipAmounts.forEach((ta) => {
            ta.disabled = false;
        });
    } else {
        // tslint:disable-next-line: radix
        if (parseInt(tipInputOtherAmount.value) < 0) {
            tipInputOtherAmount.classList.add('error');
        }
        defaultTipAmount = 20;
    }

    tipSubtext.innerText = `You are tipping ${defaultTipAmount}%`;
    billAmount.innerText = `Bill Amount: $${dollarAmount.value}`;
    tipPerc.innerText = `Tip Percentage: ${defaultTipAmount}%`;
    tipAmount.innerText = `Amount of Tip: ${calculateTipAmount(dollarAmount.value, `${defaultTipAmount}`)}`;
    totalAmount.innerText = `Total to be Paid: $${calculateTotalAmount(dollarAmount.value, `${defaultTipAmount}`)}`;

}

function tipAmountClick() {
    const clickedTipAmount = this as HTMLButtonElement;
    handleClick();
    tipInputOtherAmount.value = '';
    TipAmounts.forEach((ta) => {
        ta.disabled = false;
    });

    clickedTipAmount.disabled = true;

    if (clickedTipAmount.id === 'button-other') {
        return;
    }

    if (!dollarAmount.value) {
        dollarAmount.placeholder = 'Enter Bill Amoount';
        dollarAmount.classList.add('error');
        return;
    } else {
        dollarAmount.classList.remove('error');
    }

    tipSubtext.innerText = `You are tipping ${clickedTipAmount.dataset.value}%`;
    billAmount.innerText = `Bill Amount: $${dollarAmount.value}`;
    tipPerc.innerText = `Tip Percentage: ${clickedTipAmount.dataset.value}%`;
    tipAmount.innerText = `Amount of Tip: ${calculateTipAmount(dollarAmount.value, clickedTipAmount.dataset.value)}`;
    totalAmount.innerText = `Total to be Paid: $${calculateTotalAmount(dollarAmount.value, clickedTipAmount.dataset.value)}`;
}

export function handleClick() {
    dollarAmount = document.getElementById('dollar-amount') as HTMLInputElement;
    tipSubtext = document.getElementById('tip-subtext') as HTMLElement;
    billAmount = document.getElementById('bill-amount') as HTMLLIElement;
    tipPerc = document.getElementById('tip-perc') as HTMLLIElement;
    tipAmount = document.getElementById('tip-amount') as HTMLLIElement;
    totalAmount = document.getElementById('total-amount') as HTMLLIElement;
    tipInputOtherAmount = document.getElementById('tip-other-amount') as HTMLInputElement;
}
