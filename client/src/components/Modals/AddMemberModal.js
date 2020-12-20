import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";

const AddMemberModal = (props) => {
  const { buttonLabel, className } = props;

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
      <ModalBody>
        <Label for="unmountOnClose">Friend's name</Label>{" "}
        <Input
          name="friendName"
          placeholder="Enter your friend's name..."
          type="name"
          onChange={props.handleChange}
        />
        <Label for="unmountOnClose">Friend's family name</Label>{" "}
        <Input
          name="friendFamilyName"
          placeholder="Enter your friend's family name..."
          type="name"
          onChange={props.handleChange}
        />
        <Label for="unmountOnClose">Friend's email</Label>{" "}
        <Input
          name="friendEmail"
          placeholder="Enter your friend's email..."
          type="email"
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
  );
};

export default AddMemberModal;
