
    export type RemoteKeys = 'countrySearch/CountrySearch';
    type PackageType<T> = T extends 'countrySearch/CountrySearch' ? typeof import('countrySearch/CountrySearch') :any;