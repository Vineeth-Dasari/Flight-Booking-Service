const express = require('express');

const { BookingController } = require('../../controllers/index');
// const { createChannel } = require =('../../utils/messageQueue');

// const channel = await createChannel();
const bookingcontroller = new BookingController();

const router = express.Router();

router.post('/bookings', bookingcontroller.create);
router.post('/publish', bookingcontroller.sendMessageToQueue);

module.exports = router;

