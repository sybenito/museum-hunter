
    export type RemoteKeys = 'country/CountrySearch' | 'country/model/Country';
    type PackageType<T> = T extends 'country/model/Country' ? typeof import('country/model/Country') :T extends 'country/CountrySearch' ? typeof import('country/CountrySearch') :any;