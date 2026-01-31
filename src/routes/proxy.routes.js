const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.all('*', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.TARGET_SERVICE}${req.originalUrl}`,
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error forwarding request' });
  }
});

module.exports = router;
