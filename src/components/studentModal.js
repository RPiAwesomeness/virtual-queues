import React, { createRef } from "react";
import { Button, Modal, Icon, Table } from "semantic-ui-react";
import StudentIdInput from "./studentIdInput";

class StudentModal extends React.Component {
  idRef = createRef();

  constructor(props) {
    super(props);

    this.state = {
      tickets: props.tickets === undefined ? {} : props.tickets,
      header: props.header,
      open: props.open === undefined ? false : props.open,
      studentID: props.studentID,
    };
  }

  render() {
    if (this.state.studentID === undefined) {
      return (
        <Modal
          size="small"
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
        >
          <Modal.Header>{this.state.header}</Modal.Header>
          <Modal.Content>
            <StudentIdInput ref={this.idRef} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="green"
              onClick={() =>
                this.setState({
                  open: false,
                  studentID: this.idRef.current.value,
                })
              }
            >
              <Icon name="check" />
              Okay
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
      >
        <Modal.Header>{this.state.header}</Modal.Header>
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
                {Object.entries(this.state.tickets).map(([key, val]) => (
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
          <Button
            basic
            color="blue"
            inverted
            onClick={() => this.setState({ open: false })}
          >
            <Icon name="close" />
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default StudentModal;
