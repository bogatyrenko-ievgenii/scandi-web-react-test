import PropTypes from 'prop-types'

const Attribute = ({ type, value, selected, setAttribute, blockName }) => {

    const other = type !== 'Color' ? 'other' : null;
    const color = type === 'Color' ? 'color' : null;
    const bg = color ? value : '';
    const borderColor = color && value === '#FFFFFF' ? '#000000' : null;

    const activeCo = selected === value && color ? 'activeCo' : '';
    const activeOth = selected === value && other ? 'activeOth' : '';

    return (
        <li onClick={setAttribute} style={{ backgroundColor: bg, boxShadow: `0px 0px 1px ${borderColor}` }}
            className={`${blockName}__param-${color || other} ${activeCo || activeOth}`}>
            {other && value}
        </li>
    );

}

Attribute.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setAttribute: PropTypes.func.isRequired,
    blockName: PropTypes.string.isRequired
}

export default Attribute;