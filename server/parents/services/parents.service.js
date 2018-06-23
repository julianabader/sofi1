const Parent = require('../models/parent.model');
const SharedService = require('../../shared.service');

module.exports = {
  getParents(req, res) {
    Parent.find({}, (error, parentsList) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(parentsList);
    });
  },

  getParent(req, res) {
    const parentId = req.params.parentId;

    if (!parentId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    SharedService.getParent(parentId, (error, parent) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(parent);
    });
  },

  addParent(req, res) {
    const parentObject = req.body.parent;

    if (!parentObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    parentObject.children = [];
    const requiresKeys = ['name', 'image'];
    if (!SharedService.validateFields(requiresKeys, parentObject)) {
      res.status(400).json({ message: 'Missing properties in parent object' });
      return;
    }
    
    const parent = new Parent(parentObject);
    parent.save((error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.status(200).json({ message: 'Parent created' });
    });
  },

  editParent(req, res) {
    const parentId = req.params.parentId;
    const parentObject = req.body.parent;

    if (!parentId || !parentObject) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    Parent.update({ _id: parentId }, { $set: parentObject}, (error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.status(200).json({ message: 'Parent updated' });
    });
  },

  removeParent(req, res) {
    const parentId = req.params.parentId;

    if (!parentId) {
      res.status(400).json({ message: 'Missing properties in request' });
      return;
    }

    Parent.deleteOne({ _id: parentId }, function (err) {
      if (err) {
        res.status(400).json(error);
        return;
      }

      res.status(400).json({ message: 'Parent deleted' });
    });
  },
};
