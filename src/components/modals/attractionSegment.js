import { Card, Segment, Icon, Button } from "semantic-ui-react";

const AttractionsSegment = (props) => {
  return (
    <Segment>
      <Card.Group>
        {props.slots.map((slot) => {
          const now = Date.now();
          const hideTime = new Date(Date.parse(slot.hide_time));

          if (hideTime <= now) {
            return null;
          }

          return (
            <Card key={slot._id}>
              <Card.Content>
                <Card.Header>
                  <Icon name="clock outline" />
                  {hideTime.toLocaleString("en-US")}
                </Card.Header>
                <div>
                  <Icon name="user" />
                  {slot.ticket_capacity - slot.taken}/{slot.ticket_capacity}{" "}
                  slots available!
                </div>
              </Card.Content>
              <Card.Content extra>
                <Button.Group>
                  {/* Make this conditional based on whether we have a ticket or not */}
                  <Button
                    content="Reserve a ticket"
                    labelPosition="right"
                    icon="ticket"
                    onClick={() => this.setState({ open: false })}
                    positive
                  />
                </Button.Group>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Segment>
  );
};

export default AttractionsSegment;
