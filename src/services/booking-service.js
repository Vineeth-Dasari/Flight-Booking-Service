const axios = require('axios');
const { BookingRepository } = require('../repository/index');

const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');


class BookingService {

    constructor() { 
        this.bookingRepository =  new BookingRepository();  
    }

    async createBooking(data) {
        
        try{
            const flightId = data.flightId;
            let getFlightRequestURL = FLIGHT_SERVICE_PATH + '/api/v1/flights/'+ flightId;
            //console.log(getFlightRequestURL);
            const flight = await axios.get(getFlightRequestURL);
            const flightData = flight.data.data;

            let priceOfTheFlight = flightData.price;

            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrng in the booking process');
            }
            const totalCost =priceOfTheFlight * data.noOfSeats;
            const bookingPayLoad = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayLoad);

            const updateFlihtRequestUrl =  FLIGHT_SERVICE_PATH + '/api/v1/flights/'+ booking.flightId;
            await axios.patch(updateFlihtRequestUrl, {totalSeats : flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status : "Booked"});
            return finalBooking;

        }catch(error){
            if(error.name == 'ValidationError' || error.name == 'RepositoryError'){
                throw error;
            }
            throw new ServiceError;
        }

    }

}


module.exports =  BookingService;