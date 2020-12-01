
const Orders = require("../models/order.js");

exports.getPendingOrders = (req, res, next) => {
    Orders.find().then(orders => {
        console.log(orders);
        res.render("admin/pending-orders", {
            orders: orders,
            pageTitle: "Pending Orders",
            path: "/admin/pending-orders"
        })
    })
};