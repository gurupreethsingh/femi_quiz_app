const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }], // Array of tags related to the blog
    categories: [{ type: String }], // Array of categories the blog belongs to
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users who liked the blog
    comments: [commentSchema], // Embedded comments schema
    coverImage: { type: String }, // URL or file path to the blog's cover image
    published: { type: Boolean, default: false }, // Status to mark if the blog is published
    publishedDate: { type: Date }, // Date when the blog is published
    views: { type: Number, default: 0 }, // Count of views
    slug: { type: String, unique: true }, // URL-friendly version of the title
    excerpt: { type: String, maxlength: 250 }, // Short summary of the blog
    readingTime: { type: String }, // Estimated reading time
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Pre-save hook to generate slug from title
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/[\s\W-]+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
