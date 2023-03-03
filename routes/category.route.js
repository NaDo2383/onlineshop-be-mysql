const express = require("express");

const router = express.Router();
const cate = require("../controllers/cate.controller.js");

router.get("/cate", cate.getAll);
router.post("/cate", cate.create);
router.delete("/cate/:id", cate.delete);
router.put("/cate", cate.update);

module.exports = router;
