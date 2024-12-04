// Mongoose model for news articles.

const mongoose = require('mongoose');  

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['placement', 'tech-event', 'cultural-event', 'cutoff'], 
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


const News = mongoose.model('News', newsSchema);  
module.exports = News;