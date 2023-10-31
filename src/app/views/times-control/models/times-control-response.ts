export type TimesControlResponse = Array<{
  day: number;
  times: Array<{
    id: string;
    start: string;
    finish?: string;
  }>;
}>;
