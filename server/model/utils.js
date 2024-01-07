const expensesJson = require('../expenses')
const Expense = require('./Expense')

class ExpensesController {

    deleteAll() {
        return Expense.deleteMany({}).then((deleted) => {
            return deleted
        })
    }
    generateExpenses() {
        for (const e of expensesJson) {
            this.addExpense(e)
        }
    }

    addExpense(expense) {
        const expenseDB = new Expense(expense)
        return expenseDB.save()
            .then((expense) => {
                return { result: `You spent ${expense.amount} on ${expense.item}`, success: true }
            })
            .catch((err) => {
                console.log("Couldn't save")
                return { result: `You spent ${expense.amount} on ${expense.item}`, success: false }
            })


    }
    getAllExpenses() {
        return Expense.find({}).sort({ date: -1 }).then((expenses) => {
            return expenses;
        })
    }
    getExpensesBetweenDates(date1, date2) {
        return Expense.find({ date:{$gt: date1, $lt: date2} }).sort({ date: -1 }).then((expenses) => {
            return expenses;
        })
    }

    updateExpenseToGroup(group1, group2) {
        return Expense.findOneAndUpdate({ group: group1 }, { group: group2 }, { new: true }).then((expense) => {
            return `${expense.item}'s group was changed to ${expense.group}`;
        })
    }
    getTotalExpensesGroup(group) {
        return Expense.aggregate([{ $match: { group: group } }, { $group: { _id: null, totalAmount: { $sum: "$amount" } } }]).then((total) => {
            if (total.length === 0)
                return 0
            return total[0].totalAmount
        })
    }
    getExpensesGroup(group) {
        return Expense.find({ group: group }).then((expenses) => {
            return expenses
        })
    }
    getExpensesGroupBetweenDates(group, date1, date2) {
        return Expense.find({ $and: [{ date: { $gte: date1 } }, { date: { $lte: date2 } }, { group: group }] }).then((expenses) => {
            return expenses
        })
    }
    getTotalExpensesGroupBetweenDates(group, date1, date2) {
        const startDate = new Date(date1);
        const endDate = new Date(date2);
        return Expense.aggregate([{ $match: { group: group, date: { $gte: startDate, $lte: endDate } } }, { $group: { _id: null, totalAmount: { $sum: "$amount" } } }]).then((total) => {
            if (total.length === 0)
                return 0
            return total[0].totalAmount
        })
    }

}
const Expenses = new ExpensesController()

module.exports = Expenses
