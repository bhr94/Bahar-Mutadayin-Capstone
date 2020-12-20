import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import {useState} from "react"

const ModalExample = (props) => {
  const { buttonLabel, className } = props;
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>
          Are you sure to sign out?
        </ModalHeader>
        <ModalBody>
          If you sign out, you will be asked credentials for the next time
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.handleLogOut}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
