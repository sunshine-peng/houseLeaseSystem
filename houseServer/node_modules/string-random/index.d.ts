
declare namespace stringRandom {
  interface Options {
    specials?: string | boolean;
    numbers?: string | boolean;
    letters?: string | boolean;
  }
}

declare function stringRandom(length?: number, options?: stringRandom.Options | string | true): string;

export = stringRandom;
