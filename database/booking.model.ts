import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => {
          // Standard email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Pre-save hook to validate that the referenced event exists
bookingSchema.pre('save', async function (next) {
  // Only check if eventId is new or modified
  if (this.isModified('eventId') || this.isNew) {
    try {
      // Dynamically import Event model to avoid circular dependency
      const Event = mongoose.models.Event || (await import('./event.model')).default;
      
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(new Error('Referenced event does not exist'));
      }
    } catch (error) {
      return next(error as Error);
    }
  }
  
  next();
});

// Create index on eventId for faster query performance
bookingSchema.index({ eventId: 1 });

// Compound index for event-email lookups (useful for preventing duplicate bookings)
bookingSchema.index({ eventId: 1, email: 1 });

// Prevent model recompilation in development (Next.js hot reload)
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
