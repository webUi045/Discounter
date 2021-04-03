import React from "react";
import { Portal } from "react-portal";
import { ToastContainer, Zoom } from "react-toastify";

import Backdrop from "../Backdrop";
import Form from "../Form";
import "./Modal.scss";

interface IModalProps {
  name: string;
  onClick(): void;
  children: React.ReactNode;
}

const Modal = ({ name, onClick, children }: IModalProps) => (
  <>
    <Portal>
      <div className="modal">
        <Form onClick={onClick} name={name}>
          {children}
          <ToastContainer enableMultiContainer containerId={'signIn'} autoClose={3000} transition={Zoom} className="error-notification"/>
        </Form>
      </div>
    </Portal>
    <Backdrop />
  </>
);

export default Modal;
