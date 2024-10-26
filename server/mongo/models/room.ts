import mongoose, { Schema, Document } from 'mongoose';
// import geocoder from '@/lib/utils/node-geocoder';
import { IUser } from './user';
import { todayFormatted } from '@/lib/utils/dayjs';

// export interface ILocation {
//   type: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   coordinates: number[];
//   formattedAddress: string;
// }

export interface IUserReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
}

export interface IAmenities {
  isBreakfast: boolean;
  isInternet: boolean;
  isPets: boolean;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  status: string;
  address: string;
  price: number;
  images: string[];
  category: string;
  createdAt: string;
  capacity: number;
  occupancy: number;
  bedCapacity: number;
  rating: number;
  // location: ILocation;
  reviews: IUserReview[];
  amenities: IAmenities;
  user: IUser;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ['Available', 'Reserved', 'Occupied'],
    },
    default: 'Available',
  },
  address: {
    type: String,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    enum: {
      values: ['Standard', 'Deluxe', 'Suite', 'Executive Suite'],
    },
    default: 'Standard',
  },
  createdAt: {
    type: String,
    default: todayFormatted,
  },
  capacity: {
    type: Number,
  },
  occupancy: {
    type: Number,
    default: 0,
  },
  bedCapacity: {
    type: Number,
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //   },
  //   city: String,
  //   state: String,
  //   zipCode: String,
  //   country: String,
  //   coordinates: {
  //     type: [Number],
  //     index: '2dsphere',
  //   },
  //   formattedAddress: String,
  // },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
  amenities: {
    isBreakfast: {
      type: Boolean,
      default: false,
    },
    isInternet: {
      type: Boolean,
      default: false,
    },
    isPets: {
      type: Boolean,
      default: false,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// roomSchema.pre('save', async function () {
//   const geo = await geocoder.geocode(this.address);

//   this.location = {
//     type: 'Point',
//     city: geo[0].city,
//     state: geo[0].stateCode,
//     zipCode: geo[0].zipcode,
//     country: geo[0].countryCode,
//     coordinates: [geo[0].longitude, geo[0].latitude],
//     formattedAddress: geo[0].formattedAddress,
//   };
// });

export default mongoose.models.Room ||
  mongoose.model<IRoom>('Room', roomSchema);
