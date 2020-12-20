import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";

const CreateGroupModal = (props) => {
  const { buttonLabel, className } = props;

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalBody>
          <Label for="unmountOnClose">Group Title</Label>{" "}
          <Input
            name="groupTitle"
            placeholder="please enter a group title"
            onChange={props.handleChange}
          />
          <Label for="unmountOnClose">Group description</Label>{" "}
          <Input
            name="groupDescription"
            placeholder="please enter a group description"
            onChange={props.handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.createGroup}>
            Create
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateGroupModal;
