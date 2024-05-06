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
            id: req.user.id,
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

const getUserRecipes = async (req, res) => {
  try {
    const response = await Prisma.recipe_sale.findMany({
      where: {
        buyer: {
          id: req.user.id,
        },
      },
      select: {
        recipe: true
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const buyRecipe = async (req, res) => {
  try {
    const recipe = await Prisma.recipe.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }

    if (recipe.creatorId == req.user.id) {
      return res.status(400).json({ message: "Usuário não pode comprar sua propria receita" });
    }

    const recipe_sales = await Prisma.recipe_sale.findMany({
      where: {
        recipeId: recipe.id,
        buyerId: req.user.id,
      },
    });

    if (recipe_sales.length > 0) {
      return res.status(400).json({ message: "Usuário já comprou essa receita" });
    }

    //todo: deployar o contrato por aqui
    //https://docs.infura.io/tutorials/ethereum/deploy-a-contract-using-web3.js?q=filter

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
      return res.status(404).json({ message: "Receita não encontrada" });
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

module.exports = { createRecipe, getRecipe, getUserRecipes, buyRecipe, getRecipes, deleteRecipe, sendJsonERC1155Data };