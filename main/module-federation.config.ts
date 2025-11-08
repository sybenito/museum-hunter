export const mfConfig = {
  name: "main",
  exposes: {},
  remotes: {
    countrySearch: "countrySearch@http://localhost:3001/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
  dts: true,
};
