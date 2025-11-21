export const billData = {
  customer: {
    name: "John Doe",
    address: "456 Green Street\nMumbai, India",
  },
  company: {
    name: "GetPhysio.in",
    address:
      "123 Main Road, Kolkata, India\nPhone: +91-9876543210\nEmail: contact@GetPhysio.in",
  },
  date: new Date().toLocaleDateString(),
  billNo: "INV-2025-0001",
  discount: 100, // Flat discount
  paid: 500, // Paid amount
  doctor: {
    name: "Dr. Smith",
    specialization: "Physiotherapy",
    degree: "MPT",
    contact: "+91-9876543210",
    registrationNo: "PT-123456",
  },
  items: [
    { item: "Consultation", qty: 1, price: 500 },
    { item: "Physiotherapy", qty: 2, price: 300 },
    { item: "Consultation", qty: 1, price: 500 },
    { item: "Physiotherapy", qty: 2, price: 300 },
    { item: "Consultation", qty: 1, price: 500 },
    { item: "Physiotherapy", qty: 2, price: 300 },
    { item: "Consultation", qty: 1, price: 500 },
    { item: "Physiotherapy", qty: 2, price: 300 },
  ],
};
