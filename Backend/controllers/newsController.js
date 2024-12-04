const News = require('../models/News');

// Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create new news
const createNews = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const news = new News({ title, description, category });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: 'Error creating news' });
  }
};

// Update news
const updateNews = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNews = await News.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: 'Error updating news' });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await News.findByIdAndDelete(id);
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting news' });
  }
};

module.exports = { getAllNews, createNews, updateNews, deleteNews };
