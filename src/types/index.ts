
export interface Location {
  lat: number;
  lng: number;
}

export interface Station {
  id: string;
  name: string;
  location: Location;
  address: string;
  plugTypes: PlugType[];
  chargingSpeed: ChargingSpeed[];
  price: number;
  priceUnit: string;
  availability: StationAvailability;
  waitTime?: number; // in minutes
  distance?: number; // in km or miles
  rating: number;
  amenities: string[];
  images: string[];
}

export enum PlugType {
  TYPE_1 = "Type 1",
  TYPE_2 = "Type 2",
  CHAdeMO = "CHAdeMO",
  CCS = "CCS",
  TESLA = "Tesla"
}

export enum ChargingSpeed {
  LEVEL_1 = "Level 1",
  LEVEL_2 = "Level 2",
  DC_FAST = "DC Fast"
}

export interface StationAvailability {
  total: number;
  available: number;
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isAvailable: boolean;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  stationId: string;
  plugType: PlugType;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: BookingStatus;
  createdAt: string; // ISO string
  totalPrice: number;
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed"
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  vehicle?: Vehicle;
  paymentMethods?: PaymentMethod[];
  favoriteStations?: string[];
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  plugType: PlugType;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "applepay" | "googlepay";
  last4?: string;
  expiryDate?: string;
}

export interface Filter {
  plugTypes?: PlugType[];
  chargingSpeed?: ChargingSpeed[];
  availability?: boolean;
  maxPrice?: number;
  rating?: number;
  amenities?: string[];
  distance?: number;
}

export interface MapMarker {
  id: string;
  position: Location;
  isSelected: boolean;
  station: Station;
}
