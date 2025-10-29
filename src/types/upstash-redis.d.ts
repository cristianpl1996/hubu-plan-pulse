declare module "@upstash/redis" {
  export class Redis {
    constructor(config: { url: string; token: string });
    lrange(key: string, start: number, end: number): Promise<unknown[]>;
    get?(key: string): Promise<unknown>;
    set?(key: string, value: unknown): Promise<unknown>;
  }
}


