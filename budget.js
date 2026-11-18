

const categories = [
  "Food", "Transport", "Books", "Rent",
  "Entertainment", "Health", "Allowance", "Salary", "Other"
];

let budgets = [
  { id: 1, month: "2026-11", category: "Food", limit: 1000 },
  { id: 2, month: "2026-11", category: "Books", limit: 600 }
];

const transactions = [
  { id: 1, type: "Income", amount: 5000, category: "Allowance", date: "2026-11-01", description: "Monthly allowance" },
  { id: 2, type: "Expense", amount: 300, category: "Food", date: "2026-11-05", description: "Lunch" },
  { id: 3, type: "Expense", amount: 800, category: "Books", date: "2026-11-10", description: "Textbook" }
];

let nextId = 3;     
let editId = null;  


function fillCategories() {
  const select = document.getElementById("budgetCategory");
  for (let i = 0; i < categories.length; i++) {
    select.innerHTML += "<option>" + categories[i] + "</option>";
  }
}


function getSpent(month, category) {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];

    
    if (t.type === "Expense" && t.category === category && t.date.slice(0, 7) === month) {
      total += t.amount;
    }
  }
  return total;
}


function showBudgets() {
  const body = document.getElementById("budgetBody");
  body.innerHTML = "";

  if (budgets.length === 0) {
    body.innerHTML = "<tr><td>No budgets saved yet.</td></tr>";
  }

  for (let i = 0; i < budgets.length; i++) {
    const b = budgets[i];
    const spent = getSpent(b.month, b.category);
    const remaining = b.limit - spent;
    const percent = Math.round((spent / b.limit) * 100);

   
    let barClass = "";
    if (percent >= 100) {
      barClass = "danger";
    } else if (percent >= 80) {
      barClass = "warning";
    }

   
    const barWidth = Math.min(percent, 100);

    
    let remainingClass = "";
    if (remaining < 0) {
      remainingClass = "over-budget";
    }

    body.innerHTML +=
      "<tr>" +
        "<td data-label='Month'>" + b.month + "</td>" +
        "<td data-label='Category'>" + b.category + "</td>" +
        "<td data-label='Limit'>" + b.limit + "</td>" +
        "<td data-label='Spent'>" + spent + "</td>" +
        "<td data-label='Remaining' class='" + remainingClass + "'>" + remaining + "</td>" +
        "<td data-label='Used'><div class='bar'><div class='bar-fill " + barClass + "' style='width:" + barWidth + "%'></div></div></td>" +
        "<td data-label='Actions'><span>" +
          "<button onclick='editBudget(" + b.id + ")'>Edit</button> " +
          "<button class='delete' onclick='deleteBudget(" + b.id + ")'>Delete</button>" +
        "</span></td>" +
      "</tr>";
  }
}




document.getElementById("budgetForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const data = {
    month: document.getElementById("budgetMonth").value,
    category: document.getElementById("budgetCategory").value,
    limit: Number(document.getElementById("budgetLimit").value)
  };

  if (editId === null) {
    
    data.id = nextId;
    nextId++;
    budgets.push(data);
  } else {
   
    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].id === editId) {
        data.id = editId;
        budgets[i] = data;
      }
    }
  }

  this.reset();  
  showBudgets();
});


function setAddMode() {
  editId = null;
  document.getElementById("budgetTitle").textContent = "Monthly Budget";
  document.getElementById("saveButton").textContent = "Save Budget";
}

document.getElementById("budgetForm").addEventListener("reset", setAddMode);


function editBudget(id) {
  for (let i = 0; i < budgets.length; i++) {
    const b = budgets[i];

    if (b.id === id) {
      editId = id;
      document.getElementById("budgetMonth").value = b.month;
      document.getElementById("budgetCategory").value = b.category;
      document.getElementById("budgetLimit").value = b.limit;
      document.getElementById("budgetTitle").textContent = "Edit Budget";
      document.getElementById("saveButton").textContent = "Update Budget";
    }
  }

  window.scrollTo(0, 0); 
}


function deleteBudget(id) {
  if (confirm("Delete this budget?")) {
    budgets = budgets.filter(function (b) {
      return b.id !== id;
    });
    showBudgets();
  }
}


function showReport() {
  const from = document.getElementById("fromDate").value;
  const to = document.getElementById("toDate").value;

  let totalIncome = 0;
  let totalExpense = 0;
  const expenseByCategory = {}; 

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];

    
    if (from !== "" && t.date < from) continue;
    if (to !== "" && t.date > to) continue;

    if (t.type === "Income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
    }
  }

  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalExpense").textContent = totalExpense;
  document.getElementById("totalBalance").textContent = totalIncome - totalExpense;

  
  const body = document.getElementById("reportBody");
  body.innerHTML = "";

  const names = Object.keys(expenseByCategory);

  if (names.length === 0) {
    body.innerHTML = "<tr><td>No expenses found.</td></tr>";
  }

  for (let i = 0; i < names.length; i++) {
    body.innerHTML +=
      "<tr>" +
        "<td data-label='Category'>" + names[i] + "</td>" +
        "<td data-label='Total Expense'>" + expenseByCategory[names[i]] + "</td>" +
      "</tr>";
  }
}

function clearReportFilter() {
  document.getElementById("fromDate").value = "";
  document.getElementById("toDate").value = "";
  showReport();
}


fillCategories();
showBudgets();
showReport();
