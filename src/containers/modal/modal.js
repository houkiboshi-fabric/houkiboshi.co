import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../store/createContext.js';
import Modal from '../../components/Modal/modal.js';

const ModalContainer = ({ children }) => (
  <Consumer>
    {({ open, showModal, hideModal }) => (
      <Modal open={open} showModal={showModal} hideModal={hideModal}>
        {children}
      </Modal>
    )}
  </Consumer>
);

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ModalContainer;
