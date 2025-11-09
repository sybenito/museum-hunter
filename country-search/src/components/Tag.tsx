import { useState, useEffect } from 'react';

type colors = 'blue' | 'green' | 'orange' | 'gray';
type TagProps = {
  name: string;
  onClose: () => void;
  color?: colors;
};

const Tag = ({ name, onClose, color = 'gray' }: TagProps) => {
  const [classes, setClasses] = useState<string[]>([
    'text-3xl',
    'px-4',
    'py-1',
    'inline-block',
    'rounded-l-md',
  ]);

  useEffect(() => {
    switch (color) {
      case 'blue':
        setClasses([...classes, 'bg-indigo-500', 'text-white']);
        break;
      case 'green':
        setClasses([...classes, 'bg-green-500', 'text-white']);
        break;
      case 'orange':
        setClasses([...classes, 'bg-orange-500', 'text-white']);
        break;
      case 'gray':
        setClasses([...classes, 'bg-gray-400', 'text-white']);
        break;
    }
  }, [color]);

  return (
    <div className="inline-flex my-1 mr-2">
      <span className={classes.join(' ')}>{name}</span>
      <button
        className="flex-auto items-center bg-gray-600 text-white cursor-pointer px-2 rounded-r-md"
        onClick={onClose}
      >
        x
      </button>
    </div>
  );
};
export default Tag;
