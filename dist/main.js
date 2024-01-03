
const renderer = new Renderer()
const xValues = ["fun", "food", "rent", "bills", "misc"];
const barColors = [
    "#FED130",
    "#FE3F61",
    "#FD7BD4",
    "#FEAA36",
    "#00C9E9"
];

function renderAll() {
    const expenses = $.get("/expenses")
    const groups = xValues.map(group => $.get("/expenses/" + group + "?total=true"))
    groups.push(expenses)
    Promise.all(groups).then((results) => {
        let [fun, food, rent, bills, misc, expences] = results
        const yValues = [fun.total, food.total, rent.total, bills.total, misc.total];
        expences.total = yValues.reduce((a, b) => a + b, 0).toFixed(2)
        expences.groups = xValues
        renderer.renderExpenses(expences)
        console.log(expences)
        new Chart("myChart", {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Expenses"
                }
            }
        });
        renderer.renderAddExpense({ groups: xValues })

    })
}

function filterDates() {
    const d1 = $("#start-date").val();
    const d2 = $("#end-date").val();
    let url = "/expenses"
    let totalQuery = "?total=true"
    if (d1 != "") {
        url += "?d1=" + d1
        totalQuery += "&d1="+d1
        if (d2 != "") {
            url += "&d2=" + d2
            totalQuery += "&d2="+d2
        }
    }
    console.log(url)
    const expenses = $.get(url)
    const groups = xValues.map(group => $.get("/expenses/" + group + totalQuery ))
    groups.push(expenses)
    Promise.all(groups).then((results) => {
        let [fun, food, rent, bills, misc, expences] = results
        const yValues = [fun.total, food.total, rent.total, bills.total, misc.total];
        expences.total = yValues.reduce((a, b) => a + b, 0).toFixed(2)
        expences.groups = xValues
        console.log(expences)
        renderer.renderExpenses(expences)
        new Chart("myChart", {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Expenses"
                }
            }
        });
        renderer.renderAddExpense({ groups: xValues })

    })

}
function filterGroup() {
    const group = $("#group").find(":selected").text()
    let url = "/expenses/"+group
    let totalQuery = "?total=true"
    const expenses = $.get(url)
    const groups = $.get("/expenses/" + group + totalQuery )
    Promise.all([groups,expenses]).then((results) => {
        let [groups, expences] = results
        const yValues = [groups.total];
        expences.total = groups.total.toFixed(2)
        expences.groups = xValues
        renderer.renderExpenses(expences)
        new Chart("myChart", {
            type: "doughnut",
            data: {
                labels: [group],
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Expenses"
                }
            }
        });
        renderer.renderAddExpense({ groups: xValues })

    })

}

function addExpense() {
    const date = $("#date").val();
    const amount = $("#amount").val();
    const item = $("#item").val();
    const group = $("#group").find(":selected").text()
    let expense
    if (date === '') {
        expense = { amount, item, group }
    }
    else {
        expense = { date, amount, item, group }
    }
    $.post("/expense", expense).then((result) => {


    })
}
renderAll()




