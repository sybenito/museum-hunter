
    export type RemoteKeys = 'googleMap/GoogleMap';
    type PackageType<T> = T extends 'googleMap/GoogleMap' ? typeof import('googleMap/GoogleMap') :any;