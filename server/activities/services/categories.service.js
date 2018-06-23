const Category = require('../models/category.model');
const Activity = require('../models/activity.model');
const SharedService = require('../../shared.service');

module.exports = {
  getCategories(req, res) {
    Category.find({}, (error, activities) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(activities);
    });
  },

  getCategory(req, res) {
    const categoryId = req.params.categoryId;

    Category.findById(categoryId, (error, category) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(category);
    });
  },

  addCategory(req, res) {
    const categoryObject = req.body.category;

    if (!categoryObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    categoryObject.activities = [];
    const requiresKeys = ['name', 'description', 'image'];
    if (!SharedService.validateFields(requiresKeys, categoryObject)) {
      res.status(400).json({ message: 'Missing properties in category object' });
      return;
    }

    const category = new Category(categoryObject);
    category.save((error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.status(200).json({ message: 'Category created' });
    });
  },

  editCategory(req, res) {
    const categoryId = req.params.categoryId;
    const categoryObject = req.body.category;

    if (!categoryId || !categoryObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    Category.update({ _id: categoryId }, { $set: categoryObject}, (error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.status(200).json({ message: 'Category updated' });
    });
  },

  removeCategory(req, res) {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    Category.deleteOne({ _id: categoryId }, function (err) {
      if (err) {
        res.status(400).json(error);
        return;
      }

      res.status(400).json({ message: 'Category deleted' });
    });
  }
};
