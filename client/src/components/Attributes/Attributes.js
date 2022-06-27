import { PureComponent } from 'react';
import Attribute from './Attribute/Attribute';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

// import './BagItemBanner.scss'

class Attributes extends PureComponent {

    state = {
        selected: null,
    }

    componentDidMount() {
        this.setDefaultAttribute();
    }

    onSelect = (value) => {
        const { name, id, addToSelected } = this.props;

        if (this.state.selected === value) {
            return
        } else {
            this.setState({
                selected: value
            })
            if (id) {
                this.props.changeAttribute({ id, name, value })
            }
            if (addToSelected) {
                addToSelected(name, value)
            }
        }
    }

    setDefaultAttribute = () => {
        const { defaultAttributes, name } = this.props;
        if (defaultAttributes) {
            this.setState({
                selected: defaultAttributes[name]
            })
        }
    }

    render() {

        const { name, items, blockName } = this.props;
        // console.log(this.props);
        return (
            <li className={`${blockName}__attribute`}>
                <div className={`${blockName}__attrName`}>{name}:</div>
                <ul className={`${blockName}__attrItems`}>
                    {items.map((item, idx) => {
                        return <Attribute key={`${name}${idx}`} type={name} value={item.value} blockName={blockName}
                            selected={this.state.selected} setAttribute={() => this.onSelect(item.value)}
                        />
                    })}
                </ul>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(Attributes);