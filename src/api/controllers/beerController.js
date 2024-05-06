const prisma = require("@prisma/client");

const Prisma = new prisma.PrismaClient();

const createBeer = async (req, res) => {
  const { id, name, price } = req.body;

  try {
    const recipe_sale = await Prisma.recipe_sale.findUnique({
      where: {
        id: Number(req.body.id),
      },
    });

    console.log(typeof(parseInt(recipe_sale.id)))

    const beer = await Prisma.beer.create({
      data: {
        name: name,
        price: price,
        recipe_sale: {
          connect: {
            id: Number(recipe_sale.id),
          },
        },
      },
    });
    res.status(201).json(beer);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getBeer = async (req, res) => {
  try {
    const response = await Prisma.beer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const buyBeer = async (req, res) => {
  try {
    const beer = await Prisma.beer.findUnique({
      where: {
        id: Number(req.params.id),
      }
    });

    if (!beer) {
      return res.status(404).json({ message: "Beer not found" });
    }

    await Prisma.beer_sale.create({
      data: {
        price: beer.price,
        token_address: randomBytes(10).toString("hex"),
        beer: {
          connect: {
            id: beer.id,
          },
        },
        buyer: {
          connect: {
            id: req.user.id,
          },
        },
      }
    });

    res.status(200).json({"message": "Cerveja comprada com sucesso!"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBeers = async (req, res) => {
  try {
    const response = await Prisma.beer.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteBeer = async (req, res) => {
  try {
    const beer = await Prisma.beer.delete({
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

    const recipe = await Prisma.beer.findFirst({
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
      return res.status(404).json({ message: "Beer not found" });
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

module.exports = { 
  createBeer, 
  getBeer, 
  buyBeer, 
  getBeers, 
  deleteBeer, 
  sendJsonERC1155Data 
};