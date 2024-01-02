const expensesJson = require('../expenses')
const Expense = require('./Expense')

class ExpensesController {
    generateExpenses() {
        for (const e of expensesJson) {
            this.addExpense(e)
        }
    }

    addExpense(expense) {
        const expenseDB = new Expense(expense)
        return expenseDB.save()
        .then((expense)=>{
            return `You spent ${expense.amount} on ${expense.item}` 
        })
        .catch((err)=>{
            console.log("Couldn't save")
        })

        
    }
    getAllExpenses(){
        return Expense.find({}).sort({date:-1}).then((expenses)=>{
            return expenses;
        })
    }
    getExpensesBetweenDates(date1,date2){
        console.log(date1,date2)
        return Expense.find({$and:[{date:{$gte:date1}}, {date:{$lte:date2}}]}).sort({date:-1}).then((expenses)=>{
            return expenses;
        })
    }

    updateExpenseToGroup(group1,group2){
        return Expense.findOneAndUpdate({group:group1},{group:group2},{new:true}).then((expense)=>{
            return `${expense.item}'s group was changed to ${expense.group}`;
        })
    }
    getTotalExpensesGroup(group){
        return Expense.aggregate([{$match:{group: group}}, { $group: { _id: null, totalAmount: { $sum: "$amount" } } }]).then((total)=>{
            return `Total expenses for ${group} is ${total[0].totalAmount}`
        })
    }
    getExpensesGroup(group){
        return Expense.find({group:group}).then((expenses)=>{
            return expenses
        })
    }



}
const Expenses = new ExpensesController()

module.exports = Expenses
