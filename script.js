// script.js
// Expense Tracker: stores transactions in localStorage and updates UI.
// Structure of a transaction: { id, name, amount, type, date }

const transactionForm = document.getElementById('transactionForm');
const nameInput = document.getElementById('transactionName');
const amountInput = document.getElementById('transactionAmount');
const transactionList = document.getElementById('transactionList');
const balanceAmount = document.getElementById('balanceAmount');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const formMsg = document.getElementById('formMsg');
const clearAllBtn = document.getElementById('clearAll');

const STORAGE_KEY = 'expense_tracker_transactions_v1';

// Load transactions from localStorage or start with empty array
let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Utility: format number to 2 decimals with commas
function formatCurrency(num) {
  return Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Save to localStorage
function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// Render all transactions and totals
function render() {
  // Clear list
  transactionList.innerHTML = '';

  // Totals
  let income = 0;
  let expense = 0;

  transactions.forEach(tx => {
    const li = document.createElement('li');
    li.className = 'transaction-item';

    const left = document.createElement('div');
    left.className = 'transaction-left';

    const nameSpan = document.createElement('div');
    nameSpan.innerHTML = `<div class="tx-name">${escapeHtml(tx.name)}</div><div class="tx-type">${new Date(tx.date).toLocaleString()}</div>`;

    left.appendChild(nameSpan);

    const right = document.createElement('div');
    right.className = 'transaction-right';

    const amountSpan = document.createElement('div');
    amountSpan.className = 'tx-amount ' + (tx.type === 'income' ? 'income' : 'expense');
    amountSpan.textContent = (tx.type === 'income' ? '+' : '-') + '$' + formatCurrency(tx.amount);

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => removeTransaction(tx.id);

    right.appendChild(amountSpan);
    right.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(right);

    transactionList.appendChild(li);

    if (tx.type === 'income') income += Number(tx.amount);
    else expense += Number(tx.amount);
  });

  const balance = income - expense;
  balanceAmount.textContent = '$' + formatCurrency(balance);
  totalIncomeEl.textContent = '$' + formatCurrency(income);
  totalExpenseEl.textContent = '$' + formatCurrency(expense);

  saveTransactions();
}

// Remove by id
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  render();
}

// Add new transaction
transactionForm.addEventListener('submit', function (e) {
  e.preventDefault();
  formMsg.textContent = '';

  const name = nameInput.value.trim();
  let amountValue = amountInput.value;

  // Validation
  if (!name) {
    formMsg.textContent = 'Please enter a transaction name.';
    return;
  }
  if (amountValue === '' || isNaN(amountValue)) {
    formMsg.textContent = 'Please enter a valid amount.';
    return;
  }

  amountValue = Number(amountValue);
  if (amountValue === 0) {
    formMsg.textContent = 'Amount cannot be zero.';
    return;
  }

  const type = document.querySelector('input[name="type"]:checked').value;

  // Ensure stored amount is positive number
  const amount = Math.abs(amountValue);

  const newTx = {
    id: Date.now().toString(),
    name,
    amount,
    type,
    date: new Date().toISOString()
  };

  transactions.unshift(newTx); // newest on top
  nameInput.value = '';
  amountInput.value = '';
  render();
});

// Clear all transactions (with a confirm)
clearAllBtn.addEventListener('click', () => {
  if (!transactions.length) return;
  if (confirm('Delete all transactions? This cannot be undone.')) {
    transactions = [];
    render();
  }
});

// Simple escape for XSS safety
function escapeHtml(unsafe) {
  return unsafe.replace(/[&<>"']/g, function(m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m];
  });
}

// Initial render on page load
render();
