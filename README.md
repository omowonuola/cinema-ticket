# Cinema Ticket Service

A Node.js service for handling cinema ticket bookings with validation rules and business logic implementation.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Business Rules](#business-rules)
- [Usage](#usage)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)

## Requirements

- Node.js >= 21.6.1
- npm >= 10.2.0

## Installation

1. Clone the repository:
```bash
git clone https://github.com/omowonuola/cinema-ticket
cd cinema-ticket
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
cinema-tickets/
├── src/
│   ├── lib/
│   │   ├── TicketTypeRequest.js
│   │   └── InvalidPurchaseException.js
│   ├── thirdparty/
│   │   ├── paymentgateway/
│   │   │   └── TicketPaymentService.js
│   │   └── seatbooking/
│   │       └── SeatReservationService.js
│   ├── TicketService.js
│   └── index.js
├── test/
│   └── TicketService.test.js
├── package.json
└── README.md
```

## Business Rules

The service implements the following business rules:

1. Ticket Types and Pricing:
   - Adult: £25
   - Child: £15
   - Infant: £0 (no seat allocation)

2. Purchase Constraints:
   - Maximum 25 tickets per purchase
   - Child and Infant tickets require Adult ticket purchase
   - Infants don't require a seat (sit on lap)
   - Account ID must be valid (greater than 0)

## Usage

### Basic Usage

```javascript
import TicketService from './TicketService.js';
import TicketTypeRequest from './lib/TicketTypeRequest.js';

// Create ticket service instance
const ticketService = new TicketService();

// Create ticket requests
const adultRequest = new TicketTypeRequest('ADULT', 2);
const childRequest = new TicketTypeRequest('CHILD', 1);

// Purchase tickets
try {
    ticketService.purchaseTickets(1, adultRequest, childRequest);
    console.log('Tickets purchased successfully');
} catch (error) {
    console.error('Error purchasing tickets:', error.message);
}
```

### Running the Demo

```bash
npm start
```

## Testing

The project includes comprehensive tests using Mocha and Chai.

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Documentation

### TicketService

#### `purchaseTickets(accountId, ...ticketTypeRequests)`

Processes ticket purchases with validation.

Parameters:
- `accountId` (number): Valid account ID > 0
- `ticketTypeRequests` (...TicketTypeRequest): One or more ticket requests

Throws:
- `InvalidPurchaseException`: When purchase validation fails

### TicketTypeRequest

#### Constructor: `new TicketTypeRequest(type, noOfTickets)`

Creates a new ticket request.

Parameters:
- `type` (string): 'ADULT', 'CHILD', or 'INFANT'
- `noOfTickets` (number): Number of tickets requested

Methods:
- `getNoOfTickets()`: Returns number of tickets
- `getTicketType()`: Returns ticket type

## Error Handling

The service handles various error cases:

1. Invalid Account ID:
   - Non-integer account IDs
   - Account IDs <= 0

2. Invalid Ticket Requests:
   - Empty requests
   - Invalid ticket types
   - Invalid number of tickets

3. Business Rule Violations:
   - Exceeding maximum ticket limit
   - Child/Infant tickets without Adult tickets
   - More infants than adults

