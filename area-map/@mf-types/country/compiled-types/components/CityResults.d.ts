type CityResultsProps = {
    cities: string[];
    onSelectCity: (city: string) => void;
};
declare const CityResults: ({ cities, onSelectCity }: CityResultsProps) => import("react/jsx-runtime").JSX.Element;
export default CityResults;
