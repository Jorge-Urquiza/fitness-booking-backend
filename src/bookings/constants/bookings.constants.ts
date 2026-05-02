export const BOOKINGS_ERRORS = {
  CLASS_NOT_FOUND: 'Fitness class not found',
  BOOKING_NOT_FOUND: 'Booking not found',
  CLASS_ALREADY_STARTED: 'Cannot book or cancel after class has started',
  DUPLICATE_BOOKING: 'You already have an active booking for this class',
  CLASS_FULL: 'Class capacity is full',
  BOOKING_ALREADY_CANCELLED: 'Booking is already cancelled',
  FORBIDDEN_CANCEL: 'You can only cancel your own booking',
} as const;
