const express = require('express')
const router = express.Router()
const ExpensesController = require('../model/utils')
const moment = require('moment')
moment.locale();

router.get('/expenses', function (req, res) {
    let d1 = req.query.d1
    let d2 = req.query.d2

    if (d1 === undefined) {
        ExpensesController.getAllExpenses()
            .then((expences) => {
                res.status(202).send(expences)
            })
            .catch((err) => {
                res.status(err.status).send("Errors")
            })
    }
    else {
        if (d2 === undefined)
            d2 = moment().format('LLLL');
        ExpensesController.getExpensesBetweenDates(d1, d2)
            .then((expences) => {
                res.status(202).send(expences)
            })
            .catch((err) => {
                res.status(err.status).send("Errors")
            })
    }
})
router.get('/expenses/:group', function (req, res) {
    const group = req.params.group
    const total = req.query.total
    let d1 = req.query.d1
    let d2 = req.query.d2

    if (d1 === undefined) {
        if (total === 'true') {
            ExpensesController.getTotalExpensesGroup(group)
                .then((total) => {
                    res.status(202).send({ total })
                })
                .catch((err) => {
                    res.status(err.status).send("Errors")
                })
        }
        else {
            ExpensesController.getExpensesGroup(group)
                .then((result) => {
                    res.status(202).send(result)
                })
                .catch((err) => {
                    res.status(err.status).send("Errors")
                })
        }
    }
    else {
        if (d2 === undefined)
            d2 = moment().format('LLLL');
        if (total === 'true') {
            ExpensesController.getTotalExpensesGroupBetweenDates(group,d1,d2)
                .then((total) => {
                    res.status(202).send({ total })
                })
                .catch((err) => {
                    res.status(err.status).send("Errors")
                })
        }
        else {
            ExpensesController.getExpensesGroup(group,d1,d2)
                .then((result) => {
                    res.status(202).send(result)
                })
                .catch((err) => {
                    res.status(err.status).send("Errors")
                })
        }


    }
})

router.post('/expense', function (req, res) {
    let expense = req.body
    expense.date = (expense.date != undefined || expense.date === "") ? moment(expense.date).format('LLLL') : moment().format('LLLL');
    ExpensesController.addExpense(expense).then((result) => {
        res.status(202).send(result)
    })
})

router.put('/update/:group1/:group2', function (req, res) {
    const group1 = req.params.group1
    const group2 = req.params.group2
    ExpensesController.updateExpenseToGroup(group1, group2)
        .then((result) => {
            res.status(202).send(result)
        })

})

router.get('/regenerate', function (req, res) {
    ExpensesController.deleteAll().then((deleted) => {
        ExpensesController.generateExpenses()
        res.end()
    })
})


module.exports = router
