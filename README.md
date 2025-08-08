# Expense Tracker

A simple, browser-based Expense Tracker built using **HTML5**, **CSS3**, and **JavaScript**.  
It allows users to add, view, and delete transactions, while automatically calculating **Total Income**, **Total Expenses**, and **Current Balance** in real time.  
Data is stored in the browser's **localStorage**, making the application offline-capable and easy to deploy without a backend.

---

## 🚀 Features
- Add income and expense transactions with description and amount.
- Real-time calculation of:
  - Current Balance
  - Total Income
  - Total Expenses
- Delete individual transactions or clear all data.
- Data persistence using `localStorage`.
- Input validation and error messaging.
- Responsive and minimal user interface.

---

## 📂 Project Structure

expense-tracker/
├─ index.html # Application markup
├─ style.css # Styling and layout
├─ script.js # Application logic & localStorage handling
└─ README.md # Documentation


---

## 🛠 Technologies Used
- **HTML5** – Structure and layout.
- **CSS3** – Styling and responsive design.
- **JavaScript (Vanilla)** – Logic, event handling, and data persistence.
- **LocalStorage** – Client-side storage for transactions.

---

## 📖 How to Use
1. **Download or clone** the repository.
2. Open `index.html` in your web browser.
3. Add a transaction:
   - Enter a name (e.g., Salary, Rent).
   - Enter the amount.
   - Select type: **Income** or **Expense**.
4. View updated totals and balance instantly.
5. Use the **Delete** button to remove specific transactions or **Clear All** to reset.

---

## 📊 Example Transaction Flow
1. Add **Salary** of $2000 (Income) → Balance increases.
2. Add **Groceries** of $150 (Expense) → Balance decreases.
3. Delete any transaction to adjust totals automatically.

---

## 📌 Future Enhancements
- Add categories and category-based filtering.
- Monthly/weekly summaries.
- Export/import transactions as CSV.
- Add charts for visual representation (Chart.js).
- User authentication and cloud sync.

---

## 📜 License
This project is released under the **MIT License** — feel free to use, modify, and share.
