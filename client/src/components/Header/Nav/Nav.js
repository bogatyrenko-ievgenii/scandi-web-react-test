import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { changeCategory } from '../../../redux/actions';
import './Nav.scss';

const Nav = ({ categories, activeCategory, changeCategory }) => {
    const setCategory = (event) => {
        let value = event.target.value;
        changeCategory(value);
    }

    return (
        <nav>
            <ul className='Nav'>
                {categories.map((category, idx) => {
                    let active = activeCategory.idx === idx
                        ? 'active'
                        : null;

                    return <li
                        key={idx} value={idx}
                        onClick={setCategory}
                        className={`Nav__item ${active}`}
                    >
                        {category.name}
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
    return { changeCategory: (idx) => dispatch(changeCategory(idx)) }
}

Nav.propTypes = {
    categories: PropTypes.array.isRequired,
    activeCategory: PropTypes.object.isRequired,
    changeCategory: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);