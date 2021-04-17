import React, { createRef } from "react";
import { Header, Modal, Table } from "semantic-ui-react";

import StudentIdInput from "./studentIdInput";

class StudentModal extends React.Component {
  idRef = createRef();

  constructor(props) {
    super(props);

    this.handleIdSubmit = props.onIdSubmit;
    this.header = props.header;
    this.state = {
      tickets: props.tickets === undefined ? [] : props.tickets,
      open: props.open === undefined ? false : props.open,
      studentId: props.studentId === undefined ? "000000" : props.studentId,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const newId = this.idRef.current.getId();
    if (this.state.studentId === newId) {
      // No changes were made, do nothing
      return;
    }

    // The ID changed, update state and retrieved tickets
    this.setState({ studentId: newId });
    this.handleIdSubmit(newId);
  }

  render() {
    return (
      <Modal
        closeIcon
        size="small"
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
      >
        <Modal.Header>{this.header}</Modal.Header>
        <Modal.Content>
          <Header>Tickets Available</Header>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Event</Table.HeaderCell>
                <Table.HeaderCell>Ticket ID</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.tickets.map((val) => (
                <Table.Row key={val._id}>
                  <Table.Cell>{val.slot_id}</Table.Cell>
                  <Table.Cell>{val._id}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Header>Student ID</Header>
          <StudentIdInput
            onSubmit={this.handleSubmit}
            studentId={this.state.studentId}
            ref={this.idRef}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default StudentModal;
