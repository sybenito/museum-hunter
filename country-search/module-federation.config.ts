export const mfConfig = {
  name: 'countrySearch',
  filename: 'remoteEntry.js',
  exposes: {
    './CountrySearch': './src/components/CountrySearch',
  },
  shared: ['react', 'react-dom'],
  dts: true,
};
