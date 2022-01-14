export interface EventsParams {
  'performers.slug'?: string;
  'performers.id'?: number;
  'venue.id'?: number;
  'venue.city'?: string;
  'venue.state'?: string;
  'datetime_local.gte'?: string;
  'datetime_local.lte'?: string;
  query?: string;
  id?: number;
  'taxonomies.id'?: number;
  'taxonomies.parent_id'?: number;
  'taxonomies.name'?: string;
}

//TODO: Rename to Event
export interface Events {
    type: string;
    id: number;
    datetime_utc: string;
    venue: Venue;
    datetime_tbd: boolean;
    performers?: (PerformersEntity)[] | null;
    is_open: boolean;
    links?: (null)[] | null;
    datetime_local: string;
    time_tbd: boolean;
    short_title: string;
    visible_until_utc: string;
    stats: Stats;
    taxonomies?: (TaxonomiesEntity)[] | null;
    url: string;
    score: number;
    announce_date: string;
    created_at: string;
    date_tbd: boolean;
    title: string;
    popularity: number;
    description: string;
    status: string;
    access_method?: null;
    event_promotion?: null;
    announcements: Announcements;
    conditional: boolean;
    enddatetime_utc?: null;
    themes?: (null)[] | null;
    domain_information?: (null)[] | null;
  }
  export interface Venue {
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
    id: number;
    popularity: number;
    access_method?: null;
    metro_code: number;
    capacity: number;
    display_location: string;
  }
  export interface Location {
    lat: number;
    lon: number;
  }
  export interface PerformersEntity {
    type: string;
    name: string;
    image: string;
    id: number;
    images: Images;
    divisions?: null;
    has_upcoming_events: boolean;
    primary: boolean;
    stats: Stats1;
    taxonomies?: (TaxonomiesEntity1)[] | null;
    image_attribution: string;
    url: string;
    score: number;
    slug: string;
    home_venue_id?: null;
    short_name: string;
    num_upcoming_events: number;
    colors?: null;
    image_license: string;
    popularity: number;
    location?: null;
  }
  export interface Images {
    huge: string;
  }
  export interface Stats1 {
    event_count: number;
  }
  export interface TaxonomiesEntity1 {
    id: number;
    name: string;
    parent_id?: null;
    document_source: DocumentSource;
    rank: number;
  }
  export interface DocumentSource {
    source_type: string;
    generation_type: string;
  }
  export interface Stats {
    listing_count?: null;
    average_price?: null;
    lowest_price_good_deals?: null;
    lowest_price?: null;
    highest_price?: null;
    visible_listing_count?: null;
    dq_bucket_counts?: null;
    median_price?: null;
    lowest_sg_base_price?: null;
    lowest_sg_base_price_good_deals?: null;
  }
  export interface TaxonomiesEntity {
    id: number;
    name: string;
    parent_id?: null;
    rank: number;
  }
  export interface Announcements {
    checkout_disclosures: CheckoutDisclosures;
  }
  export interface CheckoutDisclosures {
    messages?: (MessagesEntity)[] | null;
  }
  export interface MessagesEntity {
    text: string;
  }
  