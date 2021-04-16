import React from "react";
import { Button, Modal, Icon, Table } from "semantic-ui-react";
import { StudentIdInput } from "./studentIdInput";

export const StudentModal = (props) => {
  const [open, setOpen] = React.useState(false);

  if (props.tickets === undefined) {
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>{props.header}</Modal.Header>
        <Modal.Content>
          <Modal.Description></Modal.Description>
          <StudentIdInput />
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="blue" inverted onClick={() => setOpen(false)}>
            <Icon name="close" />
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Event</Table.HeaderCell>
                <Table.HeaderCell>Ticket ID</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.entries(props.tickets).map(([key, val]) => (
                <Table.Row>
                  <Table.Cell>{key}</Table.Cell>
                  <Table.Cell>{val}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="blue" inverted onClick={() => setOpen(false)}>
          <Icon name="close" />
          Okay
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
