const express = require('express');
const router = express.Router();
const pizzaModel = require('../models/pizzaModel');



//GET ALL PIZZA || @GET REQUEST
router.get('/getallpizzas', async (req, res) => {
  try {
    const pizzas = await pizzaModel.find({});
    res.status(200).send(pizzas)
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/addpizza", async (req, res) => {
  const pizza = req.body.pizza;
  try {
    const newPizza = new pizzaModel({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "larg"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newPizza.save();
    res.status(201).send("New Pizza Added");
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/getpizzabyid', async (req, res) => {
  const { pizzaId } = req.body;
  try {
    const pizza = await pizzaModel.findById({ _id: pizzaId });
    res.status(200).send(pizza)
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/updatepizza', async (req, res) => {
  const { updatedPizza } = req.body;
  try {
    const pizza = await pizzaModel.findOne({ _id: updatedPizza._id });
    (pizza.name = updatedPizza.name),
    (pizza.description = updatedPizza.description),
    (pizza.image = updatedPizza.image),
    (pizza.category = updatedPizza.category),
    (pizza.prices = [updatedPizza.prices]);
    await pizza.save();
    res.status(200).send("Pizza Update Success");
  } catch (error) {
    res.json({ message: error });
  }
});


router.post("/deletepizza", async (req, res) => {
  const pizzaId = req.body.pizzaId;
  try {
    await pizzaModel.findOneAndDelete({ _id: pizzaId });
    res.status(200).send("Pizza Deleted");
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;