const express = require("express");
const {
  createTour,
  getTours,
  getTour,
  updateTour,
  deleteTour,
  cheapers,
} = require("./../controllers/tourController");

const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router.route("/top-5-cheaper").get(cheapers, getTours);

router.route("/").post(createTour).get(getTours);
router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo("admin", "superadmin"), deleteTour);

module.exports = router;
