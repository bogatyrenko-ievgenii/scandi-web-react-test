const Attribute = ({ type, item, selected, click }) => {

    const other = type !== 'Color' ? 'other' : null;
    const color = type === 'Color' ? 'Color' : null;
    const bg = color ? item : '';

    const active = selected === item && color ? 'activeCo' : '';
    const activeOth = selected === item && other ? 'activeOth' : '';

    return (
        <li onClick={click} style={{ backgroundColor: bg }}
            className={`Pdp__param-${color || other} ${active || activeOth}`}>
            {other && item}
        </li>
    );

}

export default Attribute;