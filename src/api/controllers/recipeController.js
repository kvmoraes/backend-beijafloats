const prisma = require("@prisma/client");
const { randomBytes, randomInt } = require("crypto");
// const { get } = require("../routes/routes");

const Prisma = new prisma.PrismaClient();

const createRecipe = async (req, res) => {
  const { name, price, description, ingredients } = req.body;

  try {
    const recipe = await Prisma.recipe.create({
      data: {
        name: name,
        royaltiesId: randomInt(100000).toString(),
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

const buyRecipe = async (req, res) => {
  try {
    //todo: user nao pode comrpar mesma receita
    const recipe = await Prisma.recipe.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    //todo: deployar o contrato e disponibilizar os JSONS por aqui

    await Prisma.recipe_sale.create({
      data: {
        price: recipe.price,
        nft_address: randomBytes(10).toString("hex"),
        recipe: {
          connect: {
            id: recipe.id,
          },
        },
        buyer: {
          connect: {
            id: req.user.id,
          },
        },
      }
    });

    res.status(200).json({"message": "Receita comprada com sucesso!"});
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

const sendJsonERC1155Data = async (req, res) => {
  try {
    const id = req.params.id;

    const digitsArray = id.match(/\d/g);
    const digitsString = digitsArray.join('');

    const recipe = await Prisma.recipe.findFirst({
      where: {
        OR: [
          {
            id: Number(digitsString),
          },
          {
            royaltiesId: digitsString,
          },
        ],
      }
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (id == recipe.royaltiesId){
      res.json({
        "name": "Royalties da " + recipe.name,
        "symbol": "CERV" + randomInt(1039).toString(), //tudo bem ser aleatório, pois função é chamada uma vez por contrato
      });
      return;
    }

    res.status(200).json({
      "name": recipe.name,
      "description": recipe.description,
      "image": recipe.image
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRecipe, getRecipe, buyRecipe, getRecipes, deleteRecipe, sendJsonERC1155Data };