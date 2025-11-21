type colors = 'blue' | 'green' | 'orange' | 'gray';
type TagProps = {
    name: string;
    onClose: () => void;
    color?: colors;
};
declare const Tag: ({ name, onClose, color }: TagProps) => import("react/jsx-runtime").JSX.Element;
export default Tag;
