const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Online Event", "Offline Event"],
      required: true,
    },
    hostedBy: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    dressCode: {
      type: String,
      required: true,
    },
    ageRestrictions: {
      type: String,
      required: true,
    },
    eventTags: [
      {
        type: String,
        required: true,
      },
    ],
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    eventFee: {
      type: Number,
      default:0
    },
    speakers: [
      {
        name: 
          {
            type: String,
            required: true,
          },
        role: {
          type: String,
          required: true,
        },
        photo: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
