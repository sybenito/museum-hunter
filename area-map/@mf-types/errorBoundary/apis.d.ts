
    export type RemoteKeys = 'errorBoundary/ErrorBoundary';
    type PackageType<T> = T extends 'errorBoundary/ErrorBoundary' ? typeof import('errorBoundary/ErrorBoundary') :any;