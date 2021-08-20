const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    memory: {
      type: String,
      default: 64,
    },
    status: {
      type: String,
      enum: ["Stocking", "OutStocking", "Importing"],
      default: "Stocking",
    },
    color: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    nameCategory: {
      type: String,
    },
    checked: {
      type: Boolean,
      required: true,
      default: false,
    },
    numberSold: {
      type: Number,
      default: 0,
    },
    storage: {
      type: Number,
      required: true,
      default: 500,
    },
    sale: {
      type: Number,
      required: true,
      default: 0,
    },
    key: {
      type: String,
      default: uuidv4(),
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberReviews: {
      type: Number,
      default: 0,
    },
    display: {
      type: Object,
      default: {
        screenTechnology: "IPS LCD",
        resolution: "HD+ (720 x 1560 Pixels)",
        FPS: "60 Hz",
        maximumBrightness: "400 nits",
      },
    },
    rareCamera: {
      type: Object,
      default: {
        resolution: "64 MP",
        flash: "Yes",
      },
    },
    frontCamera: {
      type: Object,
      default: {
        resolution: "16 MP",
      },
    },
    cpu: {
      type: Object,
      default: {
        os: "Android 10",
        chip: "Snapdragon 460 8 cores",
        cpuSpeed: "1.8 GHz",
        gpu: "Adreno 610",
      },
    },
    memoryAndStorage: {
      type: Object,
      default: {
        ram: "4 GB",
        internalMemory: "64 GB",
        memoryStick: "Max 512Gb",
      },
    },
    connect: {
      type: Object,
      default: {
        bluetooth: "v4.2",
        chargingInterface: "Type-C",
        headphoneJack: "3.5 mm",
      },
    },
    batteries: {
      type: Object,
      default: {
        batteryCapacity: "4000 mAh",
        batteryType: "Li-Ion",
      },
    },
    general: {
      type: Object,
      default: {
        weight: "180g",
        releaseTime: "12/2020",
        design: "Monolithic",
      },
    },
    subImages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
