export interface MetaParams {
    page?: number;
    per_page?: number;
    sort?: string;
    geoip?: string;
    geolocation?: {
        lat?: number;
        lon?: number;
        range?: number;
    }
  }