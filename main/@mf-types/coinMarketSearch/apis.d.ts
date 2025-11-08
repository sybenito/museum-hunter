
    export type RemoteKeys = 'coinMarketSearch/Search';
    type PackageType<T> = T extends 'coinMarketSearch/Search' ? typeof import('coinMarketSearch/Search') :any;