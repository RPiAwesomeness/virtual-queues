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
    
    let slots = props.slots !== undefined
      ? props.slots.map((slot) => {
        slot.taken = 0;
        return slot;
      })
      : [];
    this.state = {
      slots: slots
    };

    // this.state.slots.reduce((acc, val) => {
    //     acc[val._id] = props.slots.ticket_capacity;
    //     return acc;
    //   }, {})

    this.getTicketsAvailable = this.getTicketsAvailable.bind(this);
  }

  componentDidMount() {
    this.getTicketsAvailable();
  }

  getTicketsAvailable() {
    this.state.slots.forEach(({_id}, idx) => {
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

  render() {
    let [maxCapacity, takenSlots] = this.state.slots.reduce(
      (acc, slot) => [acc[0] + slot.ticket_capacity, acc[1] + slot.taken],
      [0, 0]
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
            <Icon name="user" />
            {maxCapacity - takenSlots}/{maxCapacity} available of {this.state.slots.length} slots
          </div>
          <div>
            <Icon name="clock" />
            End Time: {this.endTime.toLocaleString("en-US")}
          </div>
        </Card.Content>
      </Card>
    );
  }
}
