const express = require('express');
const categoriesService = require('../activities/services/categories.service');
const activitiesService = require('../activities/services/activities.service');

const router = express.Router();

router.get('/', categoriesService.getCategories);
router.get('/:categoryId', categoriesService.getCategory);
router.get('/:categoryId/activities', activitiesService.getActivities);
router.get('/:categoryId/activities/:activityId', activitiesService.getActivity);

router.post('/', categoriesService.addCategory);
router.post('/:categoryId/activities/', activitiesService.addActivity);

router.put('/:categoryId', categoriesService.editCategory);
router.put('/:categoryId/activities/:activityId', activitiesService.editActivity);

router.delete('/:categoryId', categoriesService.removeCategory);
router.delete('/:categoryId/activities/:activityId', activitiesService.removeActivity);

module.exports = router;