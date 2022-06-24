import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changeCategory } from '../../../redux/actions';

import './Nav.scss';

const Nav = ({ categories, activeCategory, changeCategory }) => {

    const setLinkTo = (name) => {
        return name === 'all' ? '' : name;
    }

    return (
        <nav>
            <ul className='Nav'>
                {categories.map((category, idx) => {
                    const { name } = category;

                    let active = activeCategory.name === name
                        ? 'active'
                        : null;

                    let link = setLinkTo(name)

                    return <li
                        key={name + idx}
                        onClick={() => changeCategory(name)}
                        className={`Nav__item ${active}`}
                    >
                        <Link className='Nav__link'
                            to={link}>{name}</Link>
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