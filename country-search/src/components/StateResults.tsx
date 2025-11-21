import { useState, useEffect } from 'react';

type StateResultsProps = {
  states: string[];
  onSelectState: (state: string | null) => void;
};

const StateResults = ({ states, onSelectState }: StateResultsProps) => {
  const [filteredStates, setFilteredStates] = useState<string[]>(states);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const filtered = states.filter((state) =>
      state.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [filterText, states]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="border border-gray-300 rounded mt-2 max-h-120 overflow-y-auto">
      <div className="p-2 border-b border-gray-300">
        <input
          name="filterStates"
          className="rounded w-full p-2 border border-gray-300 text-gray-400"
          onChange={handleFilterChange}
          placeholder="State/Province Search..."
        />
      </div>
      <div
        key="All States and Provinces "
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => onSelectState('All States and Provinces')}
      >
        All States/Provinces
      </div>
      {filteredStates.sort().map((state) => (
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
