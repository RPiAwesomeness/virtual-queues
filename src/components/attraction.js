import React, { createRef } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import Toast from "./toast";

export default class Attraction extends React.Component {
  toastRef = createRef();

  constructor(props) {
    super(props);

    this.name = props.name;
    this.id = props.id;
    this.about = props.about;
    this.description = props.description;
    this.active = props.isActive;
    this.img = props.imageURL;
    this.endTime = props.endTime;

    let slots = [];
    if (props.slots !== undefined) {
      slots = props.slots.map((slot) => {
        slot.taken = 0;
        return slot;
      });
    }
    this.state = {
      slots: slots,
    };

    // this.state.slots.reduce((acc, val) => {
    //     acc[val._id] = props.slots.ticket_capacity;
    //     return acc;
    //   }, {})

    this.getTicketsAvailable = this.getTicketsAvailable.bind(this);
    this.requestTicketForSlot = this.requestTicketForSlot.bind(this);
  }

  componentDidMount() {
    this.getTicketsAvailable();
  }

  getTicketsAvailable() {
    this.state.slots.forEach(({ _id }, idx) => {
      fetch(`http://18.222.7.110:3000/api/slots/${_id}/tickets/`)
        .then((res) => res.json())
        .then(
          (res) => {
            if (res.status !== "success") {
              console.log("Failed to retrieve available tickets");
              console.log(res.message);
            }

            console.debug("Taken:", this.state.slotsTaken);
            console.debug("Slot ID:", this.id);
            console.debug("Retrieved:", res.data);

            // Get copy of slots array
            const newSlots = this.state.slots.slice();
            newSlots[idx].taken = res.data.length;

            this.setState({ slots: newSlots });
          },
          (err) => {
            console.error("Failed to retrieve available tickets");
            console.error(err);
          }
        );
    });
  }

  requestTicketForSlot(slotId) {
    const ticketReq = {
      student_id: 2030758,
      slot_id: slotId,
    };

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketReq),
    };

    fetch("http://18.222.7.110:3000/api/tickets/", postOptions)
      .then((res) => res.json())
      .then(
        (res) => {
          console.log("Request Result:", res);
          this.toastRef.current.setState({
            success: true,
            visible: true,
            message: `Successfully retrieved ticket with ID ${res.data._id}!`,
            header: "Success!",
          });
        },
        (err) => console.error(err)
      );
  }

  render() {
    let [maxCapacity, takenSlots] = this.state.slots.reduce(
      (acc, slot) => [acc[0] + slot.ticket_capacity, acc[1] + slot.taken],
      [0, 0]
    );

    return (
      <div>
        <Card
          fluid
          onClick={() => this.requestTicketForSlot(this.state.slots[0]._id)}
        >
          <Image src={this.img} wrapped disabled={!this.active} />
          <Card.Content>
            <Card.Header>{this.name}</Card.Header>
            <Card.Description>{this.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Icon name="user" />
              {maxCapacity - takenSlots}/{maxCapacity} available of{" "}
              {this.state.slots.length} slots
            </div>
            <div>
              <Icon name="clock" />
              End Time: {this.endTime.toLocaleString("en-US")}
            </div>
            <Toast ref={this.toastRef} visible={false} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}
