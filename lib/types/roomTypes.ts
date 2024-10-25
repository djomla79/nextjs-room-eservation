export type ReviewType = {
  userId: string;
  rating: number;
  comment: string;
};

export type LocationType = {
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: number[];
  formattedAddress: string;
};

export type AmenitiesType = {
  isInternet: boolean;
  isBreakfast: boolean;
  isPets: boolean;
};

export type RoomType = {
  _id: string;
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
  location: LocationType;
  reviews: ReviewType[];
  amenities: AmenitiesType;
  user: string;
};

export type CreateRoomType = {
  name: string;
  description: string;
  status: string;
  address: string;
  price: number;
  category: string;
  capacity: number;
  occupancy?: number;
  bedCapacity: number;
  amenities: AmenitiesType;
  user?: string;
};

export type RoomDetailsType = {
  name: string;
  description: string;
  status: string;
  address: string;
  price: number;
  category: string;
  capacity: number;
  images?: string[];
  occupancy?: number;
  bedCapacity: number;
  amenities: AmenitiesType;
};

export type RoomInputType = {
  name: string;
  description: string;
  status: string;
  address: string;
  price: number;
  category: string;
  capacity: number;
  bedCapacity: number;
  amenities: string[];
};

export type RoomFormType = {
  name: string;
  description: string;
  status: string;
  address: string;
  price: number;
  category: string;
  capacity: number;
  bedCapacity: number;
  amenities: AmenitiesType;
};
