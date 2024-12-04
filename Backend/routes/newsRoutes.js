const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Get news items by category
router.get('/', async (req, res) => {
  const { category } = req.query; // Get the category from the query string

  try {
    let news;
    
    // If a category is provided, filter by category; otherwise, get all news
    if (category) {
      news = await News.find({ category }); // Fetch news items by category
    } else {
      news = await News.find(); // Fetch all news items
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single news item by ID
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: 'News item not found' });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new news item
router.post('/', async (req, res) => {
  const { title, description, source, category } = req.body; // Include category in the request body
  const newsItem = new News({
    title,
    description,
    source,
    category, // Save the category with the news item
  });

  try {
    const savedNews = await newsItem.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a news item by ID
router.put('/:id', async (req, res) => {
  const { title, description, source, category } = req.body; // Include category in the request body

  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, description, source, category }, // Update the category too
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News item not found' });
    }

    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a news item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return res.status(404).json({ message: 'News item not found' });
    }

    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
