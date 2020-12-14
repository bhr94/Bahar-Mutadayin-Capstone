import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
// import {useState} from "react"

const AddMemberModal = (props) => {
  const { buttonLabel, className } = props;

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalBody>         
          <Label for="unmountOnClose">Friend's email</Label>{" "}
          <Input
            name="friendEmail"
            placeholder="Enter your friend's email..."
            type ="email"
            onChange={props.handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.addFriend}>
            Enter
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddMemberModal;
