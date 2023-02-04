export interface DateRange {
  end: string;
  start: string;
}

export interface DataStore {
  [key: string]: any;
}

export interface ExpireKeyMap {
  [key: string]: number;
}
