
document.addEventListener("DOMContentLoaded", function () {

    // 1. AUTOMATIC BALANCE CALCULATION

    const incomeElement = document.getElementById("incomeAmount");
    const expenseElement = document.getElementById("expenseAmount");
    const balanceElement = document.getElementById("balanceAmount");

    if (incomeElement && expenseElement && balanceElement) {

        const income = Number(
            incomeElement.textContent.replace(/[^\d.]/g, "")
        );

        const expense = Number(
            expenseElement.textContent.replace(/[^\d.]/g, "")
        );

        const balance = income - expense;

        balanceElement.textContent =
            "৳ " + balance.toLocaleString("en-US");
    }


    // 2. MONTHLY BUDGET CALCULATION

    const budgetText = document.getElementById("budgetText");
    const budgetPercentage = document.getElementById("budgetPercentage");
    const budgetFill = document.getElementById("budgetFill");

    if (budgetText && budgetPercentage && budgetFill) {

        const amounts = budgetText.textContent.match(/[\d,]+/g);

        if (amounts && amounts.length >= 2) {

            const spent = Number(amounts[0].replace(/,/g, ""));
            const total = Number(amounts[1].replace(/,/g, ""));

            if (total > 0) {

                const percentage = Math.min(
                    (spent / total) * 100,
                    100
                );

                budgetPercentage.textContent =
                    Math.round(percentage) + "% Used";

                budgetFill.style.width = percentage + "%";
            }
        }
    }


    // 3. ANIMATED FINANCIAL COUNTERS

    function animateCounter(element) {

        const finalValue = Number(
            element.textContent.replace(/[^\d.]/g, "")
        );

        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const currentValue = Math.floor(
                finalValue * progress
            );

            element.textContent =
                "৳ " + currentValue.toLocaleString("en-US");

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent =
                    "৳ " + finalValue.toLocaleString("en-US");
            }
        }

        requestAnimationFrame(updateCounter);
    }

    const balanceCounter = document.getElementById("balanceAmount");
    const incomeCounter = document.getElementById("incomeAmount");
    const expenseCounter = document.getElementById("expenseAmount");

    if (balanceCounter) {
        animateCounter(balanceCounter);
    }

    if (incomeCounter) {
        animateCounter(incomeCounter);
    }

    if (expenseCounter) {
        animateCounter(expenseCounter);
    }


    // 4. SCROLL REVEAL ANIMATION

    const featuresSection = document.getElementById("features");
    const stepsSection = document.getElementById("how-it-works");

    const revealElements = [
        featuresSection,
        stepsSection
    ];

    revealElements.forEach(function (element) {

        if (element) {

            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";
            element.style.transition = "all 0.7s ease";

        }
    });

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                }
            });
        },

        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {

        if (element) {
            revealObserver.observe(element);
        }
    });


    // 5. BACK TO TOP BUTTON

    const topButton = document.createElement("button");

    topButton.textContent = "↑";
    topButton.title = "Back to Top";

    topButton.style.position = "fixed";
    topButton.style.right = "25px";
    topButton.style.bottom = "25px";
    topButton.style.width = "45px";
    topButton.style.height = "45px";
    topButton.style.border = "none";
    topButton.style.borderRadius = "50%";
    topButton.style.background = "#0866f5";
    topButton.style.color = "white";
    topButton.style.fontSize = "25px";
    topButton.style.cursor = "pointer";
    topButton.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    topButton.style.display = "none";
    topButton.style.zIndex = "999";

    document.body.appendChild(topButton);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";
        }
    });

    topButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 6. DYNAMIC COPYRIGHT YEAR

    const footerYear = document.getElementById("footerYear");

    if (footerYear) {

        footerYear.innerHTML =
            "Copyright &copy; " +
            new Date().getFullYear() +
            " Student Expense Tracker. All rights reserved.";
    }

});
