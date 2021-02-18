import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import Headroom from "react-headroom";

class TitleBar extends React.Component {
  onHelpClicked() {
    alert("foo");
  }

  render() {
    return (
      <Headroom>
        <Button size="huge" animated="vertical" onClick={this.onHelpClicked}>
          <Button.Content hidden>Help</Button.Content>
          <Button.Content visible>
            <Icon name="question circle outline" />
          </Button.Content>
        </Button>
        <Header as="h2" content="CU Events" subheader="Virtual Queues" />
      </Headroom>
    );
  }
}

export { TitleBar as default };
