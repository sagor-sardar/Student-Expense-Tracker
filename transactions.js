

const categories = [
  "Food", "Transport", "Books", "Rent",
  "Entertainment", "Health", "Allowance", "Salary", "Other"
];


let transactions = [
  { id: 1, type: "Income", amount: 5000, category: "Allowance", date: "2026-11-01", description: "Monthly allowance" },
  { id: 2, type: "Expense", amount: 300, category: "Food", date: "2026-11-05", description: "Lunch" },
  { id: 3, type: "Expense", amount: 800, category: "Books", date: "2026-11-10", description: "Textbook" }
];

let nextId = 4;     
let editId = null; 


function fillCategories() {
  const select = document.getElementById("category");
  for (let i = 0; i < categories.length; i++) {
    select.innerHTML += "<option>" + categories[i] + "</option>";
  }
}


function showTransactions() {
  const body = document.getElementById("transactionBody");
  body.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  if (transactions.length === 0) {
    body.innerHTML = "<tr><td>No transactions yet.</td></tr>";
  }

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];

    if (t.type === "Income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }

    
    body.innerHTML +=
      "<tr>" +
        "<td data-label='Date'>" + t.date + "</td>" +
        "<td data-label='Type'><span class='badge " + t.type.toLowerCase() + "'>" + t.type + "</span></td>" +
        "<td data-label='Category'>" + t.category + "</td>" +
        "<td data-label='Amount'>" + t.amount + "</td>" +
        "<td data-label='Description'>" + t.description + "</td>" +
        "<td data-label='Actions'><span>" +
          "<button onclick='editTransaction(" + t.id + ")'>Edit</button> " +
          "<button class='delete' onclick='deleteTransaction(" + t.id + ")'>Delete</button>" +
        "</span></td>" +
      "</tr>";
  }

  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalExpense").textContent = totalExpense;
  document.getElementById("totalBalance").textContent = totalIncome - totalExpense;
}


document.getElementById("transactionForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const data = {
    type: document.getElementById("type").value,
    amount: Number(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value
  };

  if (editId === null) {
   
    data.id = nextId;
    nextId++;
    transactions.push(data);
  } else {
   
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id === editId) {
        data.id = editId;
        transactions[i] = data;
      }
    }
  }

  this.reset();  
  showTransactions();
});


function setAddMode() {
  editId = null;
  document.getElementById("formTitle").textContent = "Add Transaction";
  document.getElementById("submitButton").textContent = "Submit";
}

document.getElementById("transactionForm").addEventListener("reset", setAddMode);


function editTransaction(id) {
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];

    if (t.id === id) {
      editId = id;
      document.getElementById("type").value = t.type;
      document.getElementById("amount").value = t.amount;
      document.getElementById("category").value = t.category;
      document.getElementById("date").value = t.date;
      document.getElementById("description").value = t.description;
      document.getElementById("formTitle").textContent = "Edit Transaction";
      document.getElementById("submitButton").textContent = "Update";
    }
  }

  window.scrollTo(0, 0); 
}


function deleteTransaction(id) {
  if (confirm("Delete this transaction?")) {
    transactions = transactions.filter(function (t) {
      return t.id !== id;
    });
    showTransactions();
  }
}


fillCategories();
showTransactions();
