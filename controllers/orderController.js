const Project = require('../models/project');
  
  exports.getOrders = (req, res, next) => {
    Project.find({ 'customer': String})
      .then(orders => {
        console.log("ORDERS");
        console.log(orders);
        res.render('orders/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
        });
      })
      .catch(err => { });
  };

exports.postOrder = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            email: req.user.email,
            userId: req.user
          },
          products: products
        });
        return order.save();
      })
      .then(result => {
        return req.user.clearCart();
      })
      .then(() => {
        res.redirect('/orders');
      })
      .catch(err => {});
  };
