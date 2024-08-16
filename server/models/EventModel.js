const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g., "10:00 AM"
    endTime: { type: String, required: true }, // e.g., "02:00 PM"
    duration: { type: String }, // e.g., "4 hours"
    location: { type: String },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }], // Reference to users attending the event
    organizer: [{ type: Schema.Types.ObjectId, ref: "User" }], // Reference to the users who are organizing the event
    chiefGuests: [
      {
        name: { type: String },
        designation: { type: String },
      },
    ], // List of chief guests with their designations
    eventType: {
      type: String,
      enum: ["Seminar", "Workshop", "Conference", "Meetup", "Webinar"],
      default: "Meetup",
    }, // Type of event
    price: {
      type: Number,
      default: 0, // Free by default
    }, // Price for attending the event
    sponsors: [{ type: String }], // List of sponsors
    resources: [
      {
        name: { type: String },
        url: { type: String },
      },
    ], // Resources related to the event (e.g., PDFs, slides)
    registrationDeadline: { type: Date }, // Deadline for registration
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    }, // Status of the event
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Event", eventSchema);
