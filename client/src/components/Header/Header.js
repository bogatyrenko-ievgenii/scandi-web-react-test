import { PureComponent } from 'react';

import getNavigation from '../../graphql/queries/getNav';
import Nav from './Nav';
import Container from '../Container';
import HeaderActions from './HeaderActions';
import Spinner from '../Spinner';

import logo from './icons/a-logo.svg';
import './Header.scss';

class Header extends PureComponent {
    state = {
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
                    {viewNav && <HeaderActions handleBackDropShow={this.handleBackDropShow} />}
                </Container>
            </header>
        )
    }
}

export default Header;
