/* eslint-disable */
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    this.transactions.forEach(t => balance += t.value);
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      console.log('insufficient funds!');
      return;
    }
    // change amount to value
    // this.amount = this.value;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }
  isAllowed() {
    if (this.value < 0) {
      return this.amount <= this.account.balance;
    }
    return true;
  }

}
class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
}
class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
}


// DRIVER CODE BELOW
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log(t1.account.transactions[0])

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
// console.log(t2)

const t3 = new Withdrawal(70.01, myAccount);
t3.commit();
// myAccount.transactions.forEach(t => console.log(t.value))
console.log('Ending Balance:', myAccount.balance);
