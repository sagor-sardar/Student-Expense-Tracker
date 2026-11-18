// STUDENT EXPENSE TRACKER - DASHBOARD JS

document.addEventListener("DOMContentLoaded", function () {
    

    // 1. UPDATE TODAY'S DATE
    const todayElement = document.getElementById("today");

    if (todayElement) {
        const today = new Date();

        todayElement.textContent = "📅 Today: " +
            today.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
    }

    // 2. SHOW NOTIFICATION MESSAGE
    function showMessage(message) {

        let toast = document.getElementById("js-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "js-toast";

            Object.assign(toast.style, {
                position: "fixed",
                right: "25px",
                bottom: "25px",
                background: "#172554",
                color: "#ffffff",
                padding: "13px 20px",
                borderRadius: "10px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.18)",
                zIndex: "9999",
                fontSize: "14px",
                opacity: "0",
                transition: "all 0.3s ease"
            });

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = "1";

        clearTimeout(window.dashboardToastTimer);

        window.dashboardToastTimer = setTimeout(function () {
            toast.style.opacity = "0";
        }, 2500);
    }

    // 3. SEARCH TRANSACTIONS
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const transactionTable = document.getElementById("transactionTable");

    if (searchForm && searchInput && transactionTable) {

        const transactionBody = document.getElementById("transactionBody");

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const keyword = searchInput.value.trim().toLowerCase();

            const rows = transactionBody.getElementsByTagName("tr");

            let found = 0;

            Array.from(rows).forEach(function (row) {

                const matched = row.textContent.toLowerCase().includes(keyword);

                row.style.display = matched ? "" : "none";

                if (matched) {
                    found++;
                }
            });

            if (keyword === "") {
                showMessage("Showing all transactions.");
            }
            else if (found > 0) {
                showMessage(found + " transaction(s) found.");
            }
            else {
                showMessage("No matching transaction found.");
            }
        });

        searchInput.addEventListener("input", function () {

            if (searchInput.value.trim() === "") {

                const rows = transactionBody.getElementsByTagName("tr");
                Array.from(rows).forEach(function (row) {
                    row.style.display = "";
                });
            }
        });
    }

    // 4. EDIT AND DELETE TRANSACTIONS
    if (transactionTable) {

        const transactionBody = document.getElementById("transactionBody");

        transactionBody.addEventListener("click", function (event) {

            const button = event.target;

            // EDIT TRANSACTION
            if (button.classList.contains("edit-btn")) {

                const row = button.parentElement.parentElement;

                const descriptionCell = row.cells[3];
                const amountCell = row.cells[4];

                const newDescription = prompt(
                    "Enter transaction description:",
                    descriptionCell.textContent.trim()
                );

                if (newDescription === null) {
                    return;
                }

                if (newDescription.trim() === "") {
                    showMessage("Description cannot be empty.");
                    return;
                }

                const oldAmount = amountCell.textContent.replace(/[^\d.]/g, "");

                const newAmount = prompt(
                    "Enter amount:",
                    oldAmount
                );

                if (newAmount === null) {
                    return;
                }

                const amount = Number(newAmount);

                if (newAmount.trim() === "" || !Number.isFinite(amount) || amount <= 0) {
                    showMessage("Please enter a valid amount.");
                    return;
                }

                const incomeTags = row.getElementsByClassName("income-tag");
                const isIncome = incomeTags.length > 0;

                descriptionCell.textContent = newDescription.trim();

                amountCell.textContent =
                    (isIncome ? "+৳ " : "-৳ ") +
                    amount.toLocaleString("en-US");

                amountCell.classList.remove("amount-red", "amount-green");

                amountCell.classList.add(
                    isIncome ? "amount-green" : "amount-red"
                );

                showMessage("Transaction updated successfully.");
            }

            // DELETE TRANSACTION
            if (button.classList.contains("delete-btn")) {

                const row = button.parentElement.parentElement;

                const description = row.cells[3].textContent.trim();

                const confirmDelete = confirm(
                    'Are you sure you want to delete "' + description + '"?'
                );

                if (confirmDelete) {

                    row.remove();

                    showMessage("Transaction deleted successfully.");
                }
            }

        });
    }

    // 5. NOTIFICATION BELL
    const notificationButton = document.getElementById("notification");

    if (notificationButton) {

        notificationButton.addEventListener("click", function (event) {

            event.preventDefault();

            showMessage("You are all caught up! No new notifications.");

        });
    }

    // 6. MONTHLY BUDGET PROGRESS
    const budgetAmount = document.getElementById("budgetAmount");

    const budgetDetails = document.getElementsByClassName("budget-details");

    const progressFill = document.getElementById("progressFill");

    if (budgetAmount && budgetDetails.length >= 2 && progressFill) {

        const total = Number(
            budgetAmount.textContent.replace(/[^\d.]/g, "")
        );

        const spent = Number(
            budgetDetails[0].getElementsByTagName("b")[0].textContent.replace(/[^\d.]/g, "")
        );

        if (total > 0) {

            const percentage = Math.min(
                (spent / total) * 100,
                100
            );

            progressFill.style.width = percentage + "%";

            budgetDetails[1].getElementsByTagName("b")[0].textContent =
                Math.round(percentage) + "%";
        }
    }

    // 7. QUICK ACTION BUTTONS
    const quickActionLinks = document.getElementsByClassName("action-link");

    Array.from(quickActionLinks).forEach(function (link) {

        link.addEventListener("click", function () {

            const label = link.getElementsByTagName("p")[0];

            if (label) {
                showMessage("Opening " + label.textContent.trim() + "...");
            }

        });
    });


});