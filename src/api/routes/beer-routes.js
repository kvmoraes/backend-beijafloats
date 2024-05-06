const { createValidator } = require("express-joi-validation");
const beerController = require("../controllers/beerController");
const userjwt = require("../middleware/userjwt");

const validator = createValidator({});

const {
  beerParamsSchema,
  beerDefaultBodySchema,
} = require("../middleware/beerValidator");

const router = require("express").Router();

router.post(
  "/beer",
  userjwt,
  validator.body(beerDefaultBodySchema),
  beerController.createBeer
);

router.get(
  "/beer/buy/:id",
  userjwt,
  validator.params(beerParamsSchema),
  beerController.buyBeer
);

router.get(
  "/beer",
  validator.body(beerDefaultBodySchema),
  beerController.getBeers
);

router.get(
  "/beer/:id",
  validator.params(beerParamsSchema),
  beerController.getBeer
);

router.get(
  "/user/beers",
  userjwt,
  beerController.getUserBeers
);


router.get(
  ["/beer/erc1155/:id", "/beer/erc1155/:id.json"],
  //validator.query(beerParamsSchema),
  beerController.sendJsonERC1155Data
);

/*
router.delete(
  "/beer/:id",
  userjwt,
  validator.query(beerParamsSchema),
  beerController.deleteBeer
);
*/

module.exports = router;