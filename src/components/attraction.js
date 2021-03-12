import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default class Attraction extends React.Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.id = props.id;
    this.about = props.about;
    this.description = props.description;
    this.active = props.isActive;
    this.img = props.imageURL;
    this.endTime = props.endTime;
    this.slots = props.slots !== undefined ? props.slots : [];
    this.state = {
      slotsTaken: 0,
    };

    // this.slots.reduce((acc, val) => {
    //     acc[val._id] = props.slots.ticket_capacity;
    //     return acc;
    //   }, {})

    this.getTicketsAvailable = this.getTicketsAvailable.bind(this);
    this.getTicketsAvailable();
  }

  getTicketsAvailable() {
    fetch("http://18.222.7.110:3000/api/tickets/")
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status !== "success") {
            console.log("Failed to retrieve available tickets");
            console.log(res.message);
          }

          console.log("Taken:", this.state.slotsTaken);
          console.log("Retrieved:", res.data);
          console.log("Slot ID:", this.id);

          const slotTickets = res.data.reduce(
            (acc, { slot_id }) => (slot_id === this.id ? acc + 1 : acc),
            0
          );

          this.setState({
            slotsTaken: slotTickets,
          });
        },
        (err) => {
          console.error("Failed to retrieve available tickets");
          console.error(err);
        }
      );
  }

  render() {
    let slotCapacity = this.slots.reduce(
      (acc, slot) => acc + slot.ticket_capacity,
      0
    );

    return (
      <Card fluid>
        <Image src={this.img} wrapped disabled={!this.active} />
        <Card.Content>
          <Card.Header>{this.name}</Card.Header>
          <Card.Description>{this.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Icon name="user outline" />
            {slotCapacity - this.state.slotsTaken}/{slotCapacity} available
          </div>
          <div>
            <Icon name="clock outline" />
            {this.slots.length} slots available
          </div>
          <div>
            <Icon name="close" />
            End Time: {this.endTime.toLocaleString("en-US")}
          </div>
        </Card.Content>
      </Card>
    );
  }
}
