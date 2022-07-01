import { connect } from "react-redux";
import * as actions from '../../redux/actions';

import './BackDrops.scss';

const Backdrops = ({ bagSelect, currencySelect, onShowBagSelect, onShowCurrencySelect, showModalStatus, closeModal, children }) => {

    return (
        <>
            {bagSelect && <div onClick={onShowBagSelect} className='backDropDark'></div>}
            {showModalStatus && <div onClick={closeModal} className='backDropDark'>{children}</div>}
            {currencySelect && <div onClick={onShowCurrencySelect} className="backDropTransparent"></div>}
        </>
    )

}

function mapStateToProps(state) {
    return {
        bagSelect: state.customSelects.bagSelect,
        currencySelect: state.customSelects.currencySelect
    };
}

export default connect(mapStateToProps, actions)(Backdrops)