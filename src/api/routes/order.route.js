const express = require("express");
/*eslint-disable*/
const router = express.Router();
const error500 = require("../error-handlers/500");

const { Order } = require("../../models/index");

// Routes
router.get("/order", getOrders);
router.get("/order/:userID", error500, gerUserOrders);
// router.get("/comment/:postID", error500, getPostComments);

router.post("/order", createOrder);
// router.put("/order/:id", error500, updateOrder);
// router.delete("/comment/:id", error500, deleteComment);
router.delete("/order/:id", deleteOrder);

async function getOrders(req, res) {
    try {
        let Orders = await Order.findAll();
        return res.status(200).json({
          Orders,
        });
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
/* istanbul ignore next */
async function gerUserOrders(req, res) {
    try {
        const userID = req.params.userID;
        const orders = await Order.findAll({where: {userID:userID}});
      
        return res.status(200).json(orders);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
// async function getPostComments(req, res) {
//   const postID = req.params.postID;
//   const comment = await Comment.readComments(postID );

//   return res.status(200).json(comment);
// }

/* istanbul ignore next */
async function createOrder(req, res) {
    try {
        const newOrder = req.body;
        const order = await Order.create(newOrder);
        return res.status(201).json(order);
        
    } catch (error) {
     return res.status(500).send(error.message);   
    }
}

/* istanbul ignore next */
// async function updateComment(req, res) {
//   const id = req.params.id;
//   const obj = req.body;

//   const comment = await Comment.update(id, obj);
//   return res.status(202).json(comment);
// }
/* istanbul ignore next */
async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    await Order.delete(id);
    return res.status(204).send("Order deleted successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = router;
