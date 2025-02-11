import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {

  #paymentService;
  #reservationService;
  #TICKET_PRICES = {
    'INFANT': 0,
    'CHILD': 15,
    'ADULT': 25
  };
  #MAX_TICKETS = 25;

  constructor(
    paymentService = new TicketPaymentService(), 
    reservationService = new SeatReservationService()
) {
    this.#paymentService = paymentService;
    this.#reservationService = reservationService;
  }

      /**
   * Purchase tickets for the given account
   * @param {number} accountId - The account ID making the purchase
   * @param {...TicketTypeRequest} ticketTypeRequests - The ticket requests
   * @throws {InvalidPurchaseException} If the purchase request is invalid
   */
      purchaseTickets(accountId, ...ticketTypeRequests) {

        this.#validateAccountId(accountId);
        this.#validateTicketRequests(ticketTypeRequests);
      }


         /**
   * Validate the account ID
   * @private
   */
    #validateAccountId(accountId) {
      if (!Number.isInteger(accountId) || accountId <= 0) {
        throw new InvalidPurchaseException('Invalid account ID');
      }
  }


      /**
    * Validate the ticket requests
    * @private
    */
      #validateTicketRequests(requests) {
        if (!requests || requests.length === 0) {
        throw new InvalidPurchaseException('No tickets requested');
        }

        if (!requests.every(request => request instanceof TicketTypeRequest)) {
        throw new InvalidPurchaseException('Invalid ticket request format');
        }
    }
}