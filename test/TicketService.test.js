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