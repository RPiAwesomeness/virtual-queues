import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import PagedAttractions from "./pagedAttractions";

class AttractionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: props.name,
      description: props.description,
      active: props.isActive,
      slots: props.slots === undefined ? [] : props.slots,
      maxAvailable: props.maxAvailable,
      img: props.image,
    };
  }

  render() {
    const [maxCapacity, takenSlots] = this.state.slots.reduce(
      (acc, slot) => [acc[0] + slot.ticket_capacity, acc[1] + slot.taken],
      [0, 0]
    );

    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
      >
        <Modal.Header>Attraction Details</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={this.state.img} wrapped />
          <Modal.Description>
            <Header>{this.state.name}</Header>
            <p>{this.state.description}</p>
            <PagedAttractions slots={this.state.slots} />
            <Header>
              {`There are ${
                maxCapacity - takenSlots
              }/${maxCapacity} tickets available.`}
            </Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Okay"
            labelPosition="right"
            icon="checkmark"
            onClick={() => this.setState({ open: false })}
            inverted
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AttractionModal;
