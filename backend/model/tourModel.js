const mongoose = require("mongoose");

// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "A tour must have a name..."],
//     unique: true,
//   },
//   duration: {
//     type: Number,
//     required: [true, "A tour must have a duration..."],
//   },
//   maxGroupSize: {
//     type: Number,
//     required: [true, "A tour must have a group size..."],
//   },
//   difficulty: {
//     type: String,
//     required: [true, "A tour must have difficulty..."],
//   },
//   ratingsAverage: {
//     type: Number,
//     default: 4.5,
//   },
//   ratingQuantity: {
//     type: Number,
//     default: 0,
//   },
//   price: {
//     type: Number,
//     required: [true, "A tour must have a price..."],
//   },
//   priceDiscount: Number,
//   summary: {
//     type: String,
//     trim: true,
//     required: [true, " A tour must have a description..."],
//   },
//   imageCover: {
//     type: String,
//     required: [true, "A tour mst have a image cover..."],
//   },
//   images: [String],
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//     select: false,
//   },
//   startDates: [Date],
//   lattitude: String,
//   longitude: String,
// });

const tourSchema = new mongoose.Schema({
  rev: { type: String, required: true },
  kind: [{ type: String }],
  created: { type: Date, default: Date.now },
  libraryId: { type: String, required: true },
  creatorId: { type: String, required: true },
  description: { type: String },
  classification: { type: String, required: true },
  type: { type: String, required: true },
  tags: [{ type: String }],
  elements: {
    exchange_id: {
      elementType: { type: String },
      value: { type: String },
    },
    facility_id: {
      elementType: { type: String },
      value: { type: String },
    },
    city: {
      elementType: { type: String },
      value: { type: String },
    },
    zipcode: {
      elementType: { type: String },
      value: { type: String },
    },
    buildingNumber: {
      elementType: { type: String },
      value: { type: String },
    },
    name: {
      elementType: { type: String },
      value: { type: String },
    },
    source: {
      elementType: { type: String },
      value: { type: String },
    },
    rejectionreason: {
      elementType: { type: String },
      value: { type: String },
    },
    dsnNumber: {
      elementType: { type: String },
    },
    latitude: {
      elementType: { type: String },
      value: { type: String },
    },
    state: {
      elementType: { type: String },
      value: { type: String },
    },
    streetAddress: {
      elementType: { type: String },
      value: { type: String },
    },
    description: {
      elementType: { type: String },
    },
    trainingHoliday: {
      elementType: { type: String },
    },
    thursdayHours: {
      elementType: { type: String },
      value: { type: String },
    },
    longitude: {
      elementType: { type: String },
      value: { type: String },
    },
    subcategory: {
      elementType: { type: String },
    },
    federalHoliday: {
      elementType: { type: String },
    },
    installation: {
      elementType: { type: String },
      value: { type: String },
    },
    onlineOrderURL: {
      elementType: { type: String },
    },
    notice: {
      elementType: { type: String },
      value: { type: String },
    },
    mondayHours: {
      elementType: { type: String },
      value: { type: String },
    },
    parentCategory: {
      elementType: { type: String },
      value: { type: String },
    },
    sundayHours: {
      elementType: { type: String },
      value: { type: String },
    },
    primaryPhone: {
      elementType: { type: String },
      value: { type: String },
    },
    websiteUrl: {
      elementType: { type: String },
    },
    category: {
      elementType: { type: String },
      value: { type: String },
    },
    wednesdayHours: {
      elementType: { type: String },
      value: { type: String },
    },
    secondaryPhone: {
      elementType: { type: String },
    },
    installationid: {
      elementType: { type: String },
      value: { type: String },
    },
    saturdayHours: {
      elementType: { type: String },
      value: { type: String },
    },
    fridayHours: {
      elementType: { type: String },
      value: { type: String },
    },
    images: {
      elementType: { type: String },
    },
    thumbnailUrl: {
      elementType: { type: String },
    },
    tuesdayHours: {
      elementType: { type: String },
      value: { type: String },
    },
  },
  name: { type: String, required: true },
  lastModifierId: { type: String, required: true },
  typeId: { type: String, required: true },
  links: {
    createDraft: { href: { type: String } },
    retire: { href: { type: String } },
    self: { href: { type: String } },
    type: { href: { type: String } },
  },
  id: { type: String, required: true },
  lastModified: { type: Date },
  systemModified: { type: Date },
  status: { type: String, required: true },
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
