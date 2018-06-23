const Category = require('../models/category.model');
const Activity = require('../models/activity.model').model;
const SharedService = require('../../shared.service');

module.exports = {
  getActivities(req, res) {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      res.status(400).json({ message: 'Missing properties in request' });
    }

    Category.findById(categoryId, 'activities', (error, activities) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      return res.json(activities);
    });
  },

  getActivity(req, res) {
    const categoryId = req.params.categoryId;
    const activityId = req.params.activityId;

    if (!categoryId || !activityId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getActivity(categoryId, activityId, (error, activity) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      return res.json(activity);
    });
  },

  addActivity(req, res) {
    const categoryId = req.params.categoryId;
    const activityObject = req.body.activity;

    if (!categoryId || !activityObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    const requiresKeys = ['name', 'image', 'description', 'location', 'time'];
    if (!SharedService.validateFields(requiresKeys, activityObject)) {
      res.status(400).json({ message: 'Missing properties in activity object' });
      return;
    }

    const activity = new Activity(activityObject);
    SharedService.getCategory(categoryId, (error, category) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      category.activities.push(activity);
      category.save((error) => {
        if (error) {
          res.status(400).json(error);
          return;
        }

        res.status(200).json({ message: 'Activity created and saved to category' });
      });
    });
  },

  editActivity(req, res) {
    const categoryId = req.params.categoryId;
    const activityId = req.params.activityId;
    const activityObject = req.body.activity;

    if (!categoryId || !activityId || !activityObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getCategory(categoryId, (error, category) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      const oldActivityObject = category.activities.id(activityId);
      Object.assign(oldActivityObject, activityObject);
      category.save((error) => {
        if (error) {
          res.status(400).json(error);
          return;
        }

        res.status(200).json({ message: 'Activity saved' });
      });
    });
  },

  removeActivity(req, res) {
    const categoryId = req.params.categoryId;
    const activityId = req.params.activityId;

    if (!categoryId || !activityId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getCategory(categoryId, (error, category) => {
      category.activities.id(activityId).remove();

      category.save((error) => {
        if (error) {
          res.status(400).json(error);
          return;
        }

        res.status(200).json({ message: 'Activity deleted' });
      });
    });
  }
};
