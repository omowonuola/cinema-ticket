import TicketService from './pairtest/TicketService.js';
import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js';

// Create an instance of TicketService
const ticketService = new TicketService();

// Function to test different ticket purchase scenarios
function testTicketPurchases() {
    try {
        console.log('\n=== Testing Ticket Purchase Scenarios ===\n');

        // Scenario 1: Purchase adult tickets only
        console.log('Scenario 1: Purchasing 2 adult tickets');
        const adultRequest = new TicketTypeRequest('ADULT', 2);
        ticketService.purchaseTickets(1, adultRequest);
        console.log('Successfully purchased 2 adult tickets\n');

        // Scenario 2: Purchase family tickets
        console.log('Scenario 2: Purchasing family tickets (2 adults, 2 children, 1 infant)');
        const familyAdultRequest = new TicketTypeRequest('ADULT', 2);
        const familyChildRequest = new TicketTypeRequest('CHILD', 2);
        const familyInfantRequest = new TicketTypeRequest('INFANT', 1);
        ticketService.purchaseTickets(1, familyAdultRequest, familyChildRequest, familyInfantRequest);
        console.log('Successfully purchased family tickets\n');

        // Scenario 3: Test invalid scenarios
        console.log('Scenario 3: Testing invalid purchase (child ticket without adult)');
        const childOnlyRequest = new TicketTypeRequest('CHILD', 1);
        ticketService.purchaseTickets(1, childOnlyRequest);

    } catch (error) {
        console.log('Error:', error.message);
    }

}


// Function to calculate and display ticket price
function calculateTicketPrice(type, quantity) {
    const prices = {
        'INFANT': 0,
        'CHILD': 15,
        'ADULT': 25
    };
    const total = prices[type] * quantity;
    console.log(`Price for ${quantity} ${type} ticket(s): £${total}`);
    return total;
}


// Run the tests
console.log('Starting Ticket Service Tests...');
testTicketPurchases();

// Example price calculations
console.log('\n=== Ticket Price Calculations ===');
calculateTicketPrice('ADULT', 2);
calculateTicketPrice('CHILD', 2);
calculateTicketPrice('INFANT', 1);