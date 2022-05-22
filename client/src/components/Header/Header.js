import { PureComponent } from 'react';
import Nav from './Nav';
import Container from '../Container';
import Actions from './Actions';

import getNavigation from '../../services/queries/nav';
import getCurrencies from '../../services/queries/currency';
import logo from './icons/a-logo.svg';
import './Header.scss';


class Header extends PureComponent {
    state = {
        currentCurrency: '',
        currencies: [],
        categories: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.onGetNavigation();
        this.onGetCurrencies();
    }

    onGetNavigation = () => {
        getNavigation
            .then(response => {
                this.setState({
                    categories: response.data.categories,
                    loading: response.loading
                })
            }).catch(() => this.setState({ error: true }))
    }

    onGetCurrencies = () => {
        getCurrencies
            .then(response => {
                this.setState({
                    currencies: response.data.currencies,
                    currentCurrency: response.data.currencies[0].symbol,
                    loading: response.loading
                })
            }).catch(() => this.setState({ error: true }))
    }

    changeCurrentCurrency = (value) => {
        this.setState(({ currentCurrency }) => ({
            currentCurrency: value
        }))
    }

    render() {
        const { currencies, currentCurrency, categories, loading, error } = this.state;
        const notAvailable = error ? 'Navbar is not available' : null;
        const processing = loading ? 'Loading...' : null;
        const viewNav = !(error || loading || !categories) ? <Nav categories={categories} /> : null;
        const viewIcon = !(error || loading) ? <img src={logo} alt="logo" /> : null;
        const viewActions = !(error || loading || !currentCurrency || !viewIcon)
            ? <Actions current={currentCurrency} currencies={currencies} change={this.changeCurrentCurrency} />
            : null;

        return (
            <header className='Header'>
                <Container>
                    {notAvailable}
                    {processing}
                    {viewNav}
                    {viewIcon}
                    {viewActions}
                </Container>
            </header>
        )
    }
}

export default Header;