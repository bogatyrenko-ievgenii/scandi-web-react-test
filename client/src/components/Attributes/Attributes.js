import { PureComponent } from 'react';
import PropTypes from 'prop-types'
import Attribute from './Attribute/Attribute';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

import './Attributes.scss';

class Attributes extends PureComponent {

    state = {
        selected: null,
        attributeCursor: 'pointer',
    }

    componentDidMount() {
        if (this.props.defaultAttributes) {
            this.setDefaultAttribute();
            this.makeDisableOnSelect();
        }
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

    makeDisableOnSelect = () => {
        this.onSelect = () => { }
        this.setState({ attributeCursor: 'default' })
    }

    setDefaultAttribute = () => {
        const { defaultAttributes, name } = this.props;
        this.setState({
            selected: defaultAttributes[name]
        })
    }

    getAttrStyleSize = () => {
        let size = '';
        if (this.state.attributeCursor === 'default') {
            if (this.props.hasCarousel) {
                size = 'big'
            } else {
                size = 'mini'
            }
        } else {
            size = 'big'
        }
        return size
    }

    render() {
        const { name, items } = this.props;
        const size = this.getAttrStyleSize();

        return (
            <li className='Attributes'>
                <div className={`Attributes__attrName-${size}`}>{name}:</div>
                <ul className={`Attributes__attrItems-${size}`}>
                    {items.map((item, idx) => {
                        return (
                            <Attribute key={`${name}${idx}`} type={name} value={item.value} getSize={this.getAttrStyleSize}
                                selected={this.state.selected} setAttribute={() => this.onSelect(item.value)}
                                attributeCursor={this.state.attributeCursor}
                            />
                        )
                    })}
                </ul>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

Attributes.propTypes = {
    blockName: PropTypes.string.isRequired,
    changeAttribute: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, actions)(Attributes);