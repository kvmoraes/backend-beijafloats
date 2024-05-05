const prisma = require("@prisma/client");
// const { get } = require("../routes/routes");

const Prisma = new prisma.PrismaClient();

const create_recipe = async (req, res) => {
  const { name, price, description, ingredients } = req.body;

  try {
    const recipe = await Prisma.recipe.create({
      data: {
        name: name,
        description: description,
        price: price,
        ingredients: ingredients,
        // authorId: 1
      },
    });
    res.status(20).json(recipe);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const get_recipe = async (req, res) => {
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

const delete_recipe = async (req, res) => {
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

module.exports = { create_recipe, get_recipe, delete_recipe };
