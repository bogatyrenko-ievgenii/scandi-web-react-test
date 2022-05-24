import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changeCategory } from '../../../redux/actions';

import './Nav.scss';

const Nav = ({ categories, activeCategory, changeCategory }) => {
    const setCategory = (event) => {
        let text = event.target.textContent;
        changeCategory(text);
    }

    return (
        <nav>
            <ul className='Nav'>
                {categories.map((category, idx) => {
                    let active = activeCategory.name === category.name
                        ? 'active'
                        : null;
                    return <li
                        key={idx}
                        onClick={setCategory}
                        className={`Nav__item ${active}`}
                    ><Link className='Nav__link' to={category.name}>{category.name}</Link>
                    </li>
                })}
            </ul>
        </nav>

    );
}

function mapStateToProps(state) {
    return {
        activeCategory: state.activeCategory
    }
}

function mapDispatchToProps(dispatch) {
    return { changeCategory: (name) => dispatch(changeCategory(name)) }
}

Nav.propTypes = {
    categories: PropTypes.array.isRequired,
    activeCategory: PropTypes.object.isRequired,
    changeCategory: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);