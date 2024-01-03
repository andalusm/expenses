class Renderer {
    
    constructor(){
        this.expensesContainer = $("#expenses-container");
        this.expensesTemplate = $("#expenses-template");
        this.addExpenseTemplate = $("#add-expense-template");
        this.addExpenseContainer = $("#add-container")
    }
    render(container, handleTemplate, attribute){
        container.empty()
        const source = handleTemplate.html();
        const template = Handlebars.compile(source);
        const newHTML = template(attribute);
        container.append(newHTML)
    }

    renderExpenses(expenses){
        this.render(this.expensesContainer,this.expensesTemplate,expenses)
    }
    renderAddExpense(group){
        this.render(this.addExpenseContainer,this.addExpenseTemplate,group)
    }

}