
function renderAll() {
    const expenses = $.get("/expenses")
    const groups = categories.map(group => $.get("/expenses/" + group.toLowerCase() + "?total=true"))
    groups.push(expenses)
    Promise.all(groups).then((results) => {
        rendererHelper.renderResult(results)      
    })
}

function filterDates() {
    const d1 = $("#start-date").val();
    const d2 = $("#end-date").val();
    let url = "/expenses"
    let totalQuery = "?total=true"
    if (d1 != "") {
        url += "?d1=" + d1
        totalQuery += "&d1=" + d1
        if (d2 != "") {
            url += "&d2=" + d2
            totalQuery += "&d2=" + d2
        }
    }
    const expenses = $.get(url)
    const groups = categories.map(group => $.get("/expenses/" + group.toLowerCase() + totalQuery))
    groups.push(expenses)
    Promise.all(groups).then((results) => {
        rendererHelper.renderResult(results)
    })

}
function filterGroup() {
    const group = $("#group-filter").find(":selected").text().toLowerCase()
    let url = "/expenses/" + group
    let totalQuery = "?total=true"
    const expenses = $.get(url)
    const groups = $.get("/expenses/" + group + totalQuery)
    Promise.all([groups, expenses]).then((results) => {
        rendererHelper.renderGroup(results, group)
        

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
    const modalTitle = $(".modal-title")
    const modalBody = $(".modal-body")
    const modalFooter = $(".modal-footer")
    $.post("/expense", expense).then((result) => {
        modalTitle.text("Success")
        modalBody.empty()
        modalBody.append($(`<p>${result.result}</p>`))
        modalFooter.empty()
        modalFooter.append(closeButton)
    })
        .catch((err) => {
            modalTitle.text("Error")
            modalBody.empty()
            modalBody.append($(`<p>This is an error, nothing was added!</p>`))
            modalFooter.empty()
            modalFooter.append(closeButton)
        })
}
renderAll()




