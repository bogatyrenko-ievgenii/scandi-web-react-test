import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Container from '../Container';


class Catalogue extends PureComponent {

    componentDidMount() {

    }


    render() {
        const { activeCategory } = this.props;

        const { nav } = this.state;
        return (
            <div>
                <Container>
                    <h1>{activeCategory.idx}</h1>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCategory: state.activeCategory
    };
}

export default connect(mapStateToProps)(Catalogue);