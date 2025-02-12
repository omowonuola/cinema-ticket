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


    });

});