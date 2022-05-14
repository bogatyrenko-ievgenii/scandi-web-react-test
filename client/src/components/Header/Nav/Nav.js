import PropTypes from 'prop-types'

import './Nav.scss';

const Nav = ({ categories }) => {
    const onClickNavItem = (event) => {
        document.querySelectorAll('.Nav__item').forEach((item) => {
            item.classList.remove('active');
        })
        event.target.classList.add('active');
    }

    return (
        <ul className='Nav'>
            {categories.map((category, idx) => {
                return <li key={idx} onClick={onClickNavItem} className='Nav__item'>{category.name}</li>
            })}
        </ul>
    );
}

Nav.propTypes = {
    categories: PropTypes.array.isRequired
}

export default Nav;