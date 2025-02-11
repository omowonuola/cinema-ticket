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

        const ticketCounts = this.#calculateTicketCounts(ticketTypeRequests);
        this.#validatePurchaseRules(ticketCounts);
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

     /**
     * Calculate the counts for each ticket type
     * @private
     */
    #calculateTicketCounts(requests) {
      return requests.reduce((counts, request) => {
      const type = request.getTicketType();
      counts[type] = (counts[type] || 0) + request.getNoOfTickets();
      return counts;
      }, {});
    }


   /**
   * Validate the purchase rules
   * @private
   */
  #validatePurchaseRules(ticketCounts) {
    const totalTickets = Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);
    
    // Rule: Maximum 25 tickets per purchase
    if (totalTickets > this.#MAX_TICKETS) {
      throw new InvalidPurchaseException(`Cannot purchase more than ${this.#MAX_TICKETS} tickets`);
    }

    // Rule: Must have adult ticket for child/infant tickets
    const adultCount = ticketCounts['ADULT'] || 0;
    const childCount = ticketCounts['CHILD'] || 0;
    const infantCount = ticketCounts['INFANT'] || 0;

    if ((childCount > 0 || infantCount > 0) && adultCount === 0) {
      throw new InvalidPurchaseException('Child and infant tickets cannot be purchased without an adult ticket');
    }

  }
}