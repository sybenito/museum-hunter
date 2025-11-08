type StateResultsProps = {
  states: string[];
  onSelectState: (state: string) => void;
};

const StateResults = ({ states, onSelectState }: StateResultsProps) => {
  return (
    <div className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
      {states.map((state) => (
        <div
          key={state}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectState(state)}
        >
          {state}
        </div>
      ))}
    </div>
  );
};

export default StateResults;
