const express = require("express");
const { saveAddress, getUserAddresses, updateAddress } = require("../controllers/addressController");

const router = express.Router();

router.post("/", saveAddress);
router.get("/:userId", getUserAddresses);
router.put("/:id", updateAddress);

module.exports = router;
