const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/expensesDB", {
    useNewUrlParser: true,
}).catch((err) => console.log(err))
const Schema = mongoose.Schema
const expenseSchema = new Schema({
    item: String,
    group: String,
    amount: Number,
    date: Date
})

const Expense = mongoose.model('expense', expenseSchema)

module.exports = Expense