import BackDrops from "../BackDrops";
import ErrorIndicator from "../ErrorIndicator";

import './Modal.scss';

const Modal = ({ closeModal, showModalStatus, children }) => {
    return (
        <BackDrops showModalStatus={showModalStatus} closeModal={closeModal}>
            <div className="Modal__close" onClick={closeModal}></div>
            <div className="Modal">
                <ErrorIndicator />
                {children}
            </div>
        </BackDrops>
    )
}

export default Modal;