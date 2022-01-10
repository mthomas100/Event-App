export interface VenuesParams {
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  query?: string;
  id?: number;
}

export interface Venues {
	imageUrl: any;
    state: string;
    name_v2: string;
    postal_code: string;
    name: string;
    links?: (null)[] | null;
    timezone: string;
    url: string;
    score: number;
    location: Location;
    address: string;
    country: string;
    has_upcoming_events: boolean;
    num_upcoming_events: number;
    city: string;
    slug: string;
    extended_address: string;
    stats: Stats;
    id: number;
    popularity: number;
    access_method: AccessMethod;
    metro_code: number;
    capacity: number;
    display_location: string;
  }
  export interface Location {
    lat: number;
    lon: number;
  }
  export interface Stats {
    event_count: number;
  }
  export interface AccessMethod {
    method: string;
    created_at: string;
    employee_only: boolean;
  }
  