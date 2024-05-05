const prisma = require("@prisma/client");

const Prisma = new prisma.PrismaClient();

const beerController = require("express").Router();

beerController.post("/", async (req, res) => {
  const { name, price, description, ingredients } = req.body;

  try {
    const recipe = await Prisma.recipe.create({
      data: {
        name: name,
        description: description,
        price: price,
        ingredients: JSON.stringify(ingredients),
        creator: {
          connect: {
            id: 1, //todo
          },
        },
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

beerController.get("/:id", async (req, res) => {
  try {
    const response = await Prisma.recipe.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

beerController.delete("/:id", async (req, res) => {
  try {
    const recipe = await Prisma.recipe.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = beerController;
