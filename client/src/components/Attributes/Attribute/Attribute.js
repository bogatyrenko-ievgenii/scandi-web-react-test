import PropTypes from 'prop-types';

const Attribute = ({ type, value, selected, setAttribute, attributeCursor, getSize }) => {

    const other = type !== 'Color' ? 'other' : null;
    const color = type === 'Color' ? 'color' : null;
    const bg = color ? value : '';
    const borderColor = color && value === '#FFFFFF' ? '#000000' : null;
    const size = getSize();

    const activeCo = selected === value && color ? `activeCo-${size}` : '';
    const activeOth = selected === value && other ? 'activeOth' : '';

    return (
        <li onClick={setAttribute} style={{ backgroundColor: bg, boxShadow: `0px 0px 1px ${borderColor}`, cursor: attributeCursor }}
            className={`Attributes__${color || other} Attributes__${color || other}-${size} ${activeCo || activeOth}`}>
            {other && value}
        </li>
    );
}

Attribute.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setAttribute: PropTypes.func.isRequired,
}

export default Attribute;