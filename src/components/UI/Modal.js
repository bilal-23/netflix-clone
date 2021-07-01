import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import "./Modal.scss";

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className='modal'>
            <div className='content'>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;