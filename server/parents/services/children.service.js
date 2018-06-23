const Parent = require('../models/parent.model');
const Child = require('../models/child.model').model;
const SharedService = require('../../shared.service');

module.exports = {
  getChildren(req, res) {
    const parentId = req.params.parentId;

    if (!parentId) {
      res.status(400).json({ message: 'Missing properties in request' });
    }

    Parent.findById(parentId, 'children', (error, children) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      return res.json(children);
    });
  },

  getChild(req, res) {
    const parentId = req.params.parentId;
    const childId = req.params.childId;

    if (!parentId || !childId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getChild(parentId, childId, (error, child) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      return res.json(child);
    });
  },

  addChild(req, res) {
    const parentId = req.params.parentId;
    const childObject = req.body.child;

    if (!parentId || !childObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    const requiresKeys = ['name', 'image', 'location', 'time'];
    if (!SharedService.validateFields(requiresKeys, childObject)) {
      res.status(400).json({ message: 'Missing properties in child object' });
      return;
    }

    const child = new Child(childObject);
    SharedService.getParent(parentId, (error, parent) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      parent.children.push(child);
      parent.save((error) => {
        if (error) {
          res.status(400).json(error);
          return;
        }

        res.status(200).json({ message: 'Child created and saved to parent' });
      });
    });
  },

  editChild(req, res) {
    const parentId = req.params.parentId;
    const childId = req.params.childId;
    const childObject = req.body.child;

    if (!parentId || !childId || !childObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getParent(parentId, (error, parent) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      const oldChildObject = parent.children.id(childId);
      Object.assign(oldChildObject, childObject);
      parent.save((error) => {
        if (error) {
          res.status(400).json(error);
          return;
        }

        res.status(200).json({ message: 'Child saved' });
      });
    });
  },

  removeChild(req, res) {
    const parentId = req.params.parentId;
    const childId = req.params.childId;

    if (!parentId || !childId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getParent(parentId, (error, parent) => {
      parent.children.id(childId).remove();

      parent.save((error) => {
        if (error) {
          res.status(400).json(error);
          return;
        }

        res.status(200).json({ message: 'Child deleted' });
      });
    });
  }
};
