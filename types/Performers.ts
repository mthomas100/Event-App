export interface PerformersParams {
  slug?: string;
  query?: string;
  id?: number;
  taxonomies ?: {
    name?: string;
    id?: number;
    parent_id?: number;
  }
  genres?: {
    slug?: string;
    primary?: {
      slug?: string;
    }
  }
}


export interface Performers {
    type: string;
    name: string;
    image: string;
    id: number;
    images: Images;
    divisions?: null;
    links?: (LinksEntity)[] | null;
    has_upcoming_events: boolean;
    primary: boolean;
    stats: Stats;
    taxonomies?: (TaxonomiesEntity)[] | null;
    image_attribution: string;
    url: string;
    score: number;
    slug: string;
    home_venue_id?: null;
    short_name: string;
    num_upcoming_events: number;
    colors?: null;
    image_license: string;
    genres?: (GenresEntity)[] | null;
    popularity: number;
    location?: null;
    themes?: (null)[] | null;
    domain_information?: (null)[] | null;
  }
  export interface Images {
    huge: string;
  }
  export interface LinksEntity {
    id: string;
    url: string;
    provider: string;
  }
  export interface Stats {
    event_count: number;
  }
  export interface TaxonomiesEntity {
    id: number;
    name: string;
    parent_id?: null;
    rank: number;
  }
  export interface GenresEntity {
    id: number;
    name: string;
    slug: string;
    primary: boolean;
    images: Images1;
    image: string;
  }
  export interface Images1 {
    '1200x525': string;
    '1200x627': string;
    '136x136': string;
    '500_700': string;
    '800x320': string;
    banner: string;
    block: string;
    criteo_130_160: string;
    criteo_170_235: string;
    criteo_205_100: string;
    criteo_400_300: string;
    fb_100x72: string;
    fb_600_315: string;
    huge: string;
    ipad_event_modal: string;
    ipad_header: string;
    ipad_mini_explore: string;
    mongo: string;
    square_mid: string;
    triggit_fb_ad: string;
  }
  