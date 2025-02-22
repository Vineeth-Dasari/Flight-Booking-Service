const {BookingService} = require('../services/index');

const { createChannel , publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const { StatusCodes} = require('http-status-codes');

const bookingService = new BookingService();

class BookingController {

    constructor(){
        //this.channel= channel;
    }

    async sendMessageToQueue(req, res){
        const channel =  await createChannel();
        const payload = { 
            data : {
            subject : ' This is notification from queue',
            content : 'Queue will sub this notification',
            recepientEmail : 'vineethd333@gmail.com',
            notificationTime : '2024-11-01T03:35:42'
            },
 
            service : 'CREATE_TICKET'
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(200).json({
            message : 'Successfully published the event'
        })
    }

    async create (req, res) {

        try{
            const response = await bookingService.createBooking(req.body);
    
            return res.status(StatusCodes.OK).json({
                message : 'Succesfully compelted booking',
                success : true,
                err : {},
                data : response
            })
        }catch(error){
            return res.status(error.statusCode).json({
                message : error.message,
                success : false,
                err : error.explanation,
                data : {}
    
        })
        }
    }
}

module.exports = BookingController;
