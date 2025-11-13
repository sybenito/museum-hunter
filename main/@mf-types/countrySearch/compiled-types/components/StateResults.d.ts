type StateResultsProps = {
    states: string[];
    onSelectState: (state: string | null) => void;
};
declare const StateResults: ({ states, onSelectState }: StateResultsProps) => import("react/jsx-runtime").JSX.Element;
export default StateResults;
