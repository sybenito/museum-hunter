
    export type RemoteKeys = 'countrySearch/CountrySearch' | 'countrySearch/model/Country';
    type PackageType<T> = T extends 'countrySearch/model/Country' ? typeof import('countrySearch/model/Country') :T extends 'countrySearch/CountrySearch' ? typeof import('countrySearch/CountrySearch') :any;