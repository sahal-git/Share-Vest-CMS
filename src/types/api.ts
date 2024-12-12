export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestConfig {
  method: RequestMethod;
  headers: Record<string, string>;
  body?: string;
}