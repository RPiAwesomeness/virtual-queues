import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import CardModal from "./cardmodal";

//import {Sticky, Card} from "semantic-ui-react"


export default class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.active = props.isActive;
    this.available = props.available;
    this.maxAvailable = props.maxAvailable;
    this.img = props.image;
    this.state = {
          showModal: false
    };
  }

  checkActive() {
      if (this.available <= 0) {
          this.available = 0;
          this.isActive = false;
      }
  }
  onAttractionClicked() {
      alert('This is a test of the paging system.');
      //this.setState({ showModal: true });               //Doesn't work due to scope
    }

  render() {
      return (
          <Card fluid onClick={() => this.setState({ showModal: true })}>
              <CardModal
                  open={this.state.showModal}            //Tries to update open within CardModal
                  name={this.name}
                  description={this.description}
                  isActive={this.active}
                  available={this.available}
                  maxAvailable={this.maxAvailable}
                  image={this.image}
              />
        <Image src={this.img} wrapped disabled={!this.active} />
        <Card.Content>
          <Card.Header>{this.name}</Card.Header>
          <Card.Description>{this.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Icon name="user" />
            {this.available}/{this.maxAvailable} available
          </div>
          <div>
            <Icon name="clock outline" />
          </div>
        </Card.Content>
      </Card>
    );
  }
}
