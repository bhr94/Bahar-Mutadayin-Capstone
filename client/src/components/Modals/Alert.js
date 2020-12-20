import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Alert = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  return (
    <div>
      <Modal isOpen={props.alertModal} toggle={props.alertToggle} className={className}>
        <ModalHeader toggle={props.alertToggle}>Alert!</ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.alertToggle}>
            Ok
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Alert;
