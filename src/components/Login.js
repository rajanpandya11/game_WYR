import React from "react";
import {
  Dropdown,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

const profileOptions = [
  {
    key: "Rajan Pandya",
    text: "Rajan Pandya",
    value: "Rajan Pandya",
    image: { avatar: false, src: "" }
  },
  {
    key: "sarahedo",
    text: "Sarah Edo",
    value: "Sarah Edo",
    image: { avatar: false, src: "" }
  },
  {
    key: "tylermcginnis",
    text: "Tyler McGinnis",
    value: "Tyler McGinnis",
    image: { avatar: false, src: "" }
  },
  {
    key: "johndoe",
    text: "John Doe",
    value: "John Doe",
    image: { avatar: false, src: "" }
  }
];

export default function() {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Dropdown
            placeholder="Select Profile"
            fluid
            search
            selection
            options={profileOptions}
          />
          <Segment stacked>
            <Button color="black" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
