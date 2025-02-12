import { expect } from 'chai';




// Mock services
class MockPaymentService {
    makePayment(accountId, totalAmount) {
      this.lastPayment = { accountId, totalAmount };
    }
}


class MockReservationService {
    reserveSeat(accountId, totalSeats) {
      this.lastReservation = { accountId, totalSeats };
    }
}


describe('TicketService', () => {
    let ticketService;
    let mockPaymentService;
    let mockReservationService;
  
    beforeEach(() => {
      mockPaymentService = new MockPaymentService();
      mockReservationService = new MockReservationService();
      ticketService = new TicketService(mockPaymentService, mockReservationService);
    });


    describe('purchaseTickets', () => {

        it('should successfully purchase adult tickets', () => {
          const request = new TicketTypeRequest('ADULT', 2);
          ticketService.purchaseTickets(1, request);
    
          expect(mockPaymentService.lastPayment).to.deep.equal({
            accountId: 1,
            totalAmount: 50 // 2 adults * £25
          });
          expect(mockReservationService.lastReservation).to.deep.equal({
            accountId: 1,
            totalSeats: 2
          });
        });

        it('should successfully purchase mixed tickets', () => {
            const adultRequest = new TicketTypeRequest('ADULT', 2);
            const childRequest = new TicketTypeRequest('CHILD', 1);
            const infantRequest = new TicketTypeRequest('INFANT', 1);
      
            ticketService.purchaseTickets(1, adultRequest, childRequest, infantRequest);
      
            expect(mockPaymentService.lastPayment).to.deep.equal({
              accountId: 1,
              totalAmount: 65 // (2 * £25) + (1 * £15) + (1 * £0)
            });
            expect(mockReservationService.lastReservation).to.deep.equal({
              accountId: 1,
              totalSeats: 3 // 2 adults + 1 child (infant doesn't need a seat)
            });
        });

        it('should reject invalid account ID', () => {
            const request = new TicketTypeRequest('ADULT', 1);
            expect(() => ticketService.purchaseTickets(0, request))
              .to.throw(InvalidPurchaseException, 'Invalid account ID');
        });

        it('should reject purchase without adult tickets', () => {
            const request = new TicketTypeRequest('CHILD', 1);
            expect(() => ticketService.purchaseTickets(1, request))
            .to.throw(InvalidPurchaseException, 'Child and infant tickets cannot be purchased without an adult ticket');
        });

        it('should reject purchase exceeding maximum tickets', () => {
            const request = new TicketTypeRequest('ADULT', 26);
            expect(() => ticketService.purchaseTickets(1, request))
            .to.throw(InvalidPurchaseException, 'Cannot purchase more than 25 tickets');
        });

    });

});