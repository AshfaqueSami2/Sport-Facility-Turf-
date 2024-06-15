import { Schema, model } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>(
  {
    name: {
      type: String,
      required: true,
      sort: true,
      unique: true,
    },
    description: {
      type: String,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;

        // Ensure _id is the first field
        return {
          _id: ret._id,
          name: ret.name,
          description: ret.description,
          pricePerHour: ret.pricePerHour,
          location: ret.location,
          isDeleted: ret.isDeleted,
        };
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  },
);

export const Facility = model<TFacility>('Facility', facilitySchema);
