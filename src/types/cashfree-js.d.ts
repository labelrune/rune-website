declare module '@cashfreepayments/cashfree-js' {
  export function load(opts: { mode: 'sandbox' | 'production' }): Promise<any>;
}