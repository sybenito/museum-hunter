export const mfConfig = {
  name: "main",
  filename: "remoteEntry.js",
  remotes: {
    countrySearch: "countrySearch@http://localhost:3001/remoteEntry.js",
    googleMap: "googleMap@http://localhost:3003/remoteEntry.js",
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: false as const,
      strictVersion: false,
      eager: true,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: false as const,
      strictVersion: false,
      eager: true,
    },
  },
  dts: true,
} as const;
