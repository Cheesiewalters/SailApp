const { Router } = require('express');
const router = Router();
const {
  getAllEventTypes,
} = require('../controllers/event');

router.route('/type').get(getAllEventTypes);

module.exports = router;