
    export type RemoteKeys = 'errorBoundry/ErrorBoundry';
    type PackageType<T> = T extends 'errorBoundry/ErrorBoundry' ? typeof import('errorBoundry/ErrorBoundry') :any;