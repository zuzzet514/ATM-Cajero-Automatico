/* #######################
   ARRAY WITH THE ACCOUNTS
 #######################*/
const accounts = [
    {name: "Elisa Suárez", user: "elisa_2385", password: "8523*A7", balance: 245},
    {name: "Eduardo Hernández", user: "heduardo0728", password: "e2807+16H", balance: 102},
    {name: "Juan Hernández", user: "juan_hs09", password: "86#09RM", balance: 566}
]
// ----------------------------------------------------------------------------

/* #######################
       HTML ELEMENTS
 #######################*/

const btnSignIn = document.getElementById('signInBtn');
const signInContainer = document.getElementById('signIn-container');
const loginButton = document.getElementById('loginBtn');
// ----------------------------------------------------------------------------

/* #######################
          SIGN IN
 #######################*/

if (btnSignIn !== null && signInContainer !== null && loginButton!== null) {
    btnSignIn.addEventListener('click', ()=> {
        btnSignIn.parentElement.parentElement.remove();

        signInContainer.style.display = 'flex';

        for (let i =0; i < signInContainer.children.length; i++) {
            signInContainer.children[i].style.display = 'flex';
        }
    });
// ----------------------------------------------------------------------------

    /* #######################
           USER VALIDATION
     #######################*/
    loginButton.addEventListener('click', () => {
        let initialIndex = -1;
        const userName = document.querySelector('#userInput').value; // extracting from the input
        const passwordUser = document.querySelector('#passwordInput').value // extracting from the input
        let isUserCorrect = false; // Variables to store whether the username and password are correct
        let isPasswordCorrect = false;

        for (let i =0; i < accounts.length; i++) {
            if (userName === accounts[i].user) {
                isUserCorrect = true;

                if (passwordUser === accounts[i].password) {
                    isPasswordCorrect = true;
                    initialIndex = i;
                    break;
                }
            }
        }

        if (isUserCorrect && isPasswordCorrect) {
            alert("Login successful!");
            window.location.href = '../html/atm-main.html';
            sessionStorage.setItem("thisIndex", initialIndex);

        } else {
            if (!isUserCorrect) {
                alert("Invalid user. Please try again.");
            } else {
                alert("Invalid password. Please try again.");
            }
        }
    });
}
// ----------------------------------------------------------------------------

/* #######################
CURRENT ACCOUNT OPERATIONS
 #######################*/
let indexConverted = parseInt(sessionStorage.getItem("thisIndex")); // getting the current account index in line 61

if (indexConverted !== -1) {
    /*  HTML ELEMENTS */
    const currentAccountName = document.querySelector('#accountName'); // selecting the span
    const cards = document.getElementsByClassName('cards'); // selecting the cards
    const enterInput = document.getElementById('enterInput'); // selecting input and confirm buttons so
    const enterConfirm = document.getElementById('enterConfirm');// they don't disappear
    const withdrawInput = document.getElementById('withdrawInput');
    const withdrawConfirm = document.getElementById('withdrawConfirm');

    /* EVENT LISTENERS */
    enterInput.addEventListener('click', (e)=> e.stopPropagation());
    enterConfirm.addEventListener('click', (e)=> e.stopPropagation());
    withdrawInput.addEventListener('click', (e)=> e.stopPropagation());
    withdrawConfirm.addEventListener('click', (e)=> e.stopPropagation());

    /* HEADING OF THE MAIN PAGE */
    currentAccountName.innerText = `${accounts[indexConverted].name}`; // Welcome currentAccountName!
// ----------------------------------------------------------------------------


    /* #######################
            OPERATIONS
    #######################*/
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const hiddenDiv = cards[i].lastElementChild; // div.cards>(section.up+div.hidden) the last element child is the div
            hiddenDiv.classList.toggle('hidden'); // remove .hidden class from the divs, so we can see the divs
            enterInput.value = '';
            withdrawInput.value = '';
            if (i === 0) { //check balance div
                checkBalance(indexConverted);
            } else if(i === 1) { // enter amount div
                enterConfirm.addEventListener('click', ()=> {enterAmount(indexConverted)});

            } else { // withdraw amount div
                withdrawConfirm.addEventListener('click', () => {withdrawAmount(indexConverted)})
            }
        });
    }
}
// ----------------------------------------------------------------------------

/* #######################
FUNCTIONS OPERATIONS
 #######################*/
function checkBalance(index) {
    // Div the contains <p>$<span><span></p>
    const balanceAmountElement = document.getElementById('balanceAmount'); // Selecting the span

    balanceAmountElement.innerText = accounts[index].balance;
}

function enterAmount(index) {
    const enterAmountInput = document.getElementById('enterInput');
    const amount = parseFloat(enterAmountInput.value);
    let isEqualOrLessThan0 = !(amount < 1);
    let isMoreThan990 = !((amount + accounts[index].balance) > 990);

    if(isMoreThan990 && isEqualOrLessThan0 && !isNaN(amount)) {
        accounts[index].balance += amount;
        alert(`You entered $${amount}`);
        enterAmountInput.value = '';
    } else {
        enterAmountInput.value = '';
        if (!isMoreThan990) {
            alert("The amount entered exceeds the maximum limit of $990.");
        } else {
            alert("The amount to be entered must be greater than zero.");
        }
    }
}

function withdrawAmount(index) {
    const withdrawAmountInput = document.getElementById('withdrawInput');
    const amount = parseFloat(withdrawAmountInput.value)
    let isLessThan10 = !((accounts[index].balance - amount) < 10)
    let isMoreThanBalance = !(accounts[index].balance < amount)
    let isEqualOrLessThan0 = !(amount < 1);

    if (isLessThan10 && isMoreThanBalance && isEqualOrLessThan0 && !isNaN(amount)) {
        accounts[index].balance -= amount
        alert(`You withdrew $${amount}`)
        withdrawAmountInput.value = ''
    } else {
        withdrawAmountInput.value = ''
        if (!isMoreThanBalance) {
            alert("Insufficient balance to withdraw the specified amount.")
        } else {
            if (!isEqualOrLessThan0) {
                alert("You can't withdraw $0 or less");
            } else {
                alert("The balance cannot be less than $10.")
            }
        }
    }
}