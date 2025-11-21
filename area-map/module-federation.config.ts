export const mfConfig = {
  name: "googleMap",
  filename: "remoteEntry.js",
  exposes: {
    "./GoogleMap": "./src/components/GoogleMap",
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
