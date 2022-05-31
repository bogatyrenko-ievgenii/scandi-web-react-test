import { PureComponent } from 'react';
import Attribute from './Attribute/Attribute';

class Attributes extends PureComponent {

    state = {
        selected: null,
    }

    onSelect = (value) => {
        const { id, addToSelected } = this.props
        if (this.state.selected === value) {
            return
        } else {
            this.setState(({ selected }) => ({
                selected: value
            }))
            addToSelected(id, value)
        }
    }

    render() {
        const { name, items, id } = this.props;
        return (
            <li className='Pdp__attribute'>
                <div className='Pdp__attrTitle'>{name}:</div>
                <ul className='Pdp__params'>
                    {items.map((item, idx) => {
                        return <Attribute key={idx} type={id} item={item.value}
                            selected={this.state.selected} click={() => this.onSelect(item.value)} />
                    })}
                </ul>
            </li>
        )
    }
}

export default Attributes;