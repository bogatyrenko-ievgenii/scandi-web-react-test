import BackDrops from "../BackDrops";

import './Modal.scss';

const Modal = ({ closeModal, showModalStatus, children }) => {
    return (
        <BackDrops showModalStatus={showModalStatus} closeModal={closeModal}>
            <div className="Modal__close" onClick={closeModal}></div>
            <div className="Modal">
                {children}
            </div>
        </BackDrops>
    )
}

export default Modal;