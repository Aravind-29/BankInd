'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Aravind C',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2023-07-18T21:31:17.178Z',
    '2023-07-23T07:42:02.383Z',
    '2023-08-28T09:15:04.904Z',
    '2023-09-01T10:17:24.185Z',
    '2023-10-08T14:11:59.604Z',
    '2023-11-27T17:01:17.194Z',
    '2023-12-11T23:36:17.929Z',
    '2024-01-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-IN',
};

const account2 = {
  owner: 'Jackson J',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2023-07-18T21:31:17.178Z',
    '2023-07-23T07:42:02.383Z',
    '2023-08-28T09:15:04.904Z',
    '2023-09-01T10:17:24.185Z',
    '2023-10-08T14:11:59.604Z',
    '2023-11-27T17:01:17.194Z',
    '2023-12-11T23:36:17.929Z',
    '2024-01-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-IN',
};

const account3 = {
  owner: 'Anirudh S',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  movementsDates: [
    '2023-07-18T21:31:17.178Z',
    '2023-07-23T07:42:02.383Z',
    '2023-08-28T09:15:04.904Z',
    '2023-09-01T10:17:24.185Z',
    '2023-10-08T14:11:59.604Z',
    '2023-11-27T17:01:17.194Z',
    '2023-12-11T23:36:17.929Z',
    '2024-01-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-IN',
  pin: 3333,
};

const account4 = {
  owner: 'Harish M',
  movements: [430, 1000, 700, 50, 90],
  movementsDates: [
    '2023-07-18T21:31:17.178Z',
    '2023-07-23T07:42:02.383Z',
    '2023-08-28T09:15:04.904Z',
    '2023-09-01T10:17:24.185Z',
    '2023-10-08T14:11:59.604Z',
    '2023-11-27T17:01:17.194Z',
    '2023-12-11T23:36:17.929Z',
    '2024-01-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-IN',
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const closetext = document.querySelector('.closetext');
const labelTimer = document.querySelector('.timer');
const userdisplay = document.querySelector('.center-label');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const userlabel = document.querySelector('.username-label')
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const errormsg = document.querySelector('.error_msg');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const errortext = document.querySelector('.error');
const loantext = document.querySelector('.loantext');
//Movements
const displaymovements = function(acc){
  containerMovements.innerHTML = "";
  acc.movements.forEach(function(movement, i) {
    const action = movement>0? "deposit" :"withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth()+1}`.padStart(2, 0) ;
    const year = date.getFullYear();
  const displaydate =  `${day}/${month}/${year}`;

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${action}"> 
       ${action}
      </div>
      <div class="movements__date">${displaydate}</div>
      <div class="movements__value num">${movement}₹</div>
    </div>
  </div>`

  containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  
}


//Balance
const displaybalance = function(acc){
 const balance = acc.movements.reduce(function(acc, cur){
    return acc+cur;
  },0);
  acc.balance=balance;
  labelBalance.textContent = `${balance}₹`;
};




//Creating userid
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
  acc.username = acc.owner
  .toLowerCase()
  .split(" ")
  .map(name => name [0] )
  .join("");
  });
  return accs
}; 
  createUsernames (accounts);

  //Date
  const now = new Date();
  const date = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth()+1}`.padStart(2, 0) ;
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0) ;
  const min = `${now.getMinutes()}`.padStart(2, 0) ;
  labelDate.textContent =  `${date}/${month}/${year},  ${hour}:${min}`;

//Summary
const displaysummary = function(acc){
const income = acc.movements.filter(function(num){return num>0}).reduce(function(acc, num){return acc+num},0);

labelSumIn.textContent = `${income}₹`

const outgoing= acc.movements.filter(function(num){return num<0}).reduce(function(acc, num){return acc+num},0);
labelSumOut.textContent = `${Math.abs(outgoing)}₹`

const interest = acc.movements.filter(function(num){return num>0}).map(deposit=>deposit*acc.interestRate/100).reduce(function(acc, num){return acc+num},0);
const formattedInterest = interest.toFixed(2);
labelSumInterest.textContent=`${formattedInterest}₹`
};


// Deposit and Withdrawal array
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
const deposit = movements.filter(function(num){
  return num>0;
});
const withdrawal = movements.filter(function(num){
  return num <0;
});
const startLogOutTimer = function () {
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`

    // When we reach 0 seconds, stop the timer and logout the user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      userdisplay.style.opacity = 0;
  
    }

    // Decrease 1s
    time--;
  }
  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

//login
let loginaccount, timer;
btnLogin.addEventListener('click', function(e){ 
  e.preventDefault(); //prevent the default behaviour
  loginaccount = accounts.find(acc => acc.username=== inputLoginUsername.value);

if(loginaccount?.pin === Number(inputLoginPin.value)){
  userlabel.textContent = `${loginaccount.owner}!`
  userdisplay.style.opacity = 100;
  containerApp.style.opacity = 100;


  inputLoginUsername.value=inputLoginPin.value="";  
  displaymovements(loginaccount);
  displaybalance(loginaccount);
  displaysummary(loginaccount);

  clearInterval(timer);
    timer = startLogOutTimer();
}

else{
  inputLoginUsername.style.border = "1px solid #f74040";
  inputLoginPin.style.border = "1px solid #f74040";
  errormsg.style.opacity = 100;
}

setTimeout(function() {
  inputLoginUsername.style.border = ""; 
  inputLoginPin.style.border = ""; 
  errormsg.style.opacity = 0; 
}, 3000); 
});

// Transfer Section
btnTransfer.addEventListener('click', function(e){
e.preventDefault();
const receiveracc = accounts.find(acc=> acc.username === inputTransferTo.value);
const amount = Number(inputTransferAmount.value);


if(amount<=0){
 errortext.textContent = `Please Enter Valid Amount`
 errortext.style.opacity = 100;
}
else if(!inputTransferTo.value && !inputTransferAmount.value){
  errortext.textContent = `Please enter correct details`
  errortext.style.opacity = 100;
  console.log(inputTransferTo.value);
  con
}
else if(!receiveracc){
  errortext.textContent = `No Such User Found`
  errortext.style.opacity = 100;
}
else if (loginaccount.balance < amount){
  errortext.textContent = `Insufficient Balance`
  errortext.style.opacity = 100;
}
else if(receiveracc.username==loginaccount.username){
  errortext.textContent = `Sender and Receiver cannot be same`
  errortext.style.opacity = 100;
}
else{
  errortext.textContent = `Sent Successfully`
  errortext.style.opacity = 100;
  loginaccount.movements.push(-amount);
  receiveracc.movements.push(amount);
  loginaccount.movementsDates.push(new Date().toISOString());
  receiveracc.movementsDates.push(new Date().toISOString());
  displaymovements(loginaccount);
  displaybalance(loginaccount);
  displaysummary(loginaccount);
}
inputTransferTo.value=inputTransferAmount.value = "";

setTimeout(function() {
  errortext.style.opacity = 0; 
}, 3000); 
});

//Loan Section
btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const loanamount = Number(inputLoanAmount.value);
  
  if (loanamount < 0) {
    loantext.textContent = "Please Enter a Valid Amount";
    loantext.style.opacity = 1;
  } 
  else if (loginaccount.movements.some(mov => mov >= loanamount * 0.1)) {
   setTimeout( function(){loginaccount.movements.push(loanamount);
    loginaccount.movementsDates.push(new Date().toISOString());
    displaymovements(loginaccount);
    displaybalance(loginaccount);
    displaysummary(loginaccount);
    loantext.textContent = "Loan Approved";
    loantext.style.opacity = 1;},3000);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  else {
    loantext.textContent = "Do not qualify for the loan request";
    loantext.style.opacity = 1;
  }
  
  inputLoanAmount.value = '';
  
  setTimeout(function() {
    loantext.style.opacity = 0; 
  }, 4000);
});



// Close Section
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  
  if(inputCloseUsername.value === loginaccount.username && Number(inputClosePin.value) === loginaccount.pin){
    const Index = accounts.findIndex(acc => acc.username === loginaccount.username);

    accounts.splice(Index, 1);

    containerApp.style.opacity = 0; 
    userdisplay.style.opacity = 0;
  }
  else{
    closetext.textContent = `Invalid Credentials`
    closetext.style.opacity = 100;
  }
  inputClosePin.value=inputCloseUsername.value = "";
  setTimeout(function() {
    closetext.style.opacity = 0; 
  }, 3000); 
})