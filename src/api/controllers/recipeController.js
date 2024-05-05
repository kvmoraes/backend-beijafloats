const prisma = require("@prisma/client");
// const { get } = require("../routes/routes");

const Prisma = new prisma.PrismaClient();

const createRecipe = async (req, res) => {
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
            id: req.user.id, //todo
          },
        },
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getRecipe = async (req, res) => {
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
};

const getRecipes = async (req, res) => {
  try {
    const response = await Prisma.recipe.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
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
};

module.exports = { createRecipe, getRecipe, getRecipes, deleteRecipe };