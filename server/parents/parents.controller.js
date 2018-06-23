const express = require('express');
const parentsService = require('./services/parents.service');
const childrenService = require('./services/children.service');

const router = express.Router();

router.get('/', parentsService.getParents);
router.get('/:parentId', parentsService.getParent);
router.get('/:parentId/children', childrenService.getChildren);
router.get('/:parentId/children/:childId', childrenService.getChild);

router.post('/', parentsService.addParent);
router.post('/:parentId/children/', childrenService.addChild);

router.put('/:parentId', parentsService.editParent);
router.put('/:parentId/children/:childId', childrenService.editChild);

router.delete('/:parentId', parentsService.removeParent);
router.delete('/:parentId/children/:childId', childrenService.removeChild);

module.exports = router;