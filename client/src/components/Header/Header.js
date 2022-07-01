import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/actions';
import getNavigation from '../../graphql/queries/getNav';

import Nav from './Nav';
import Container from '../Container';
import Actions from './HeaderActions';
import Spinner from '../Spinner';


import logo from './icons/a-logo.svg';
import './Header.scss';


class Header extends PureComponent {
    state = {
        currencies: [],
        categories: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.handleGetNavigation();
    }


    handleGetNavigation = () => {
        getNavigation
            .then(response => {
                this.setState({
                    categories: response.data.categories,
                    loading: response.loading
                })
            }).catch(() => this.setState({ error: true }))
    }

    render() {

        const { categories, loading, error } = this.state;
        const notAvailable = error ? 'Navbar is not available' : null;
        const processing = loading ? <Spinner size={50} /> : null;
        const viewNav = !(error || loading || !categories) ? <Nav categories={categories} /> : null;
        const logotype = <img src={logo} alt="logo" />;

        return (
            <header className='Header'>
                <Container>
                    {processing}
                    {notAvailable}
                    {viewNav}
                    {viewNav && logotype}
                    {viewNav && <Actions handleBackDropShow={this.handleBackDropShow} />}
                </Container>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency,
        activeCategory: state.activeCategory.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurrency: (symbol) => dispatch(changeCurrency(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
