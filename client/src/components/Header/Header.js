import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/actions';
import getNavigation from '../../graphql/queries/getNav';
// import getCurrencies from '../../graphql/queries/getCurrency';

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
        // showBackDrop: false
    };

    componentDidMount() {
        this.handleGetNavigation();
        // this.handleGetCurrencies();
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.activeCurrency.symbol !== this.props.activeCurrency.symbol) {
    //         this.changeCurrentCurrency()
    //     }
    // }

    handleGetNavigation = () => {
        getNavigation
            .then(response => {
                this.setState({
                    categories: response.data.categories,
                    loading: response.loading
                })
            }).catch(() => this.setState({ error: true }))
    }

    // handleGetCurrencies = () => {
    //     getCurrencies
    //         .then(response => {
    //             this.setState({
    //                 currencies: response.data.currencies,
    //                 currentCurrency: response.data.currencies[0].symbol,
    //                 loading: response.loading
    //             })
    //         }).catch(() => this.setState({ error: true }))
    // }

    // changeCurrentCurrency = () => {
    //     this.setState({
    //         currentCurrency: this.props.activeCurrency.symbol
    //     })
    // }
    // handleBackDropShow = (value) => {
    //     this.setState({ showBackDrop: value })
    // }

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
                {/* {showBackDrop && <div onClick={this.showBagPreview} className='backDropBag'></div>} */}
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurrency: (symbol) => dispatch(changeCurrency(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
