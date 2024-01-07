const renderer = new Renderer()
const categories = ["Fun", "Food", "Rent", "Bills", "Misc"];
const logos = ["fa-futbol", "fa-utensils", "fa-house", "fa-money-bill-wave", "fa-icons"];
const barColors = [
    "#FED130",
    "#FE3F61",
    "#FD7BD4",
    "#FEAA36",
    "#00C9E9"
];
const closeButton = $(`<input value="Ok" type="button" class="btn btn-success" onclick="window.location.reload();"/>`)

class RenderHelper {
    renderResult(results) {
        const [fun, food, rent, bills, misc, expences] = results
        const totalCategories = [fun.total, food.total, rent.total, bills.total, misc.total];
        expences.total = totalCategories.reduce((a, b) => a + b, 0).toFixed(2)
        expences.groups = categories
        expences.maxGroup = this.getThreeMaxGroups(totalCategories, categories)
        renderer.renderExpenses(expences)
        new Chart("myChart", {
            type: "doughnut",
            data: {
                labels: categories,
                datasets: [{
                    backgroundColor: barColors,
                    data: totalCategories
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Expenses"
                }
            }
        });
        renderer.renderAddExpense({ groups: categories })

    }
    renderGroup(results, group) {
        let [groups, expences] = results
        const totalCategories = [groups.total];
        expences.total = groups.total.toFixed(2)
        const i = categories.findIndex(c => c.toLowerCase() === group)
        const icon = [logos[i]]
        expences.groups = categories
        expences.maxGroup = this.getThreeMaxGroups(totalCategories, [group], [icon])
        renderer.renderExpenses(expences)

        new Chart("myChart", {
            type: "doughnut",
            data: {
                labels: [group],
                datasets: [{
                    backgroundColor: [barColors[i]],
                    data: totalCategories
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Expenses"
                }
            }
        });
        renderer.renderAddExpense({ groups: categories })
    }
    getThreeMaxGroups(groupTotal, groupName, icons = logos) {
        const maxGroups = []
        for (const i in groupTotal) {
            const group = { total: groupTotal[i].toFixed(2), name: groupName[i], icon: icons[i] }
            maxGroups.push(group)
        }
        maxGroups.sort((a, b) => {
            return a.total - b.total;
        });
        return maxGroups.slice(0, 3)
    }


}
const rendererHelper = new RenderHelper()

