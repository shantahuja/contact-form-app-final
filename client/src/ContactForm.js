import React from "react";

import Amplify from "aws-amplify";
import { API } from "aws-amplify";
import awsExports from "./aws-exports";

import { TextField, Paper, Grid, Button } from "@material-ui/core";

Amplify.configure(awsExports);

class ContactForm extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    emailError: "",
  };

  handleSubmit = () => {
    const data = {
      body: {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
      },
    };

    console.log(data);
    const apiData = API.post("contactformapi", "/contactform", data);
    console.log({ apiData });
    alert("Mail sent");
  };

  onEmailChanged = (e) => {
    if (e.target.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      this.setState({ emailError: "", email: e.target.value });
    } else {
      this.setState({
        emailError: "Invalid format: example@example.com",
        email: e.target.value,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
          >
            <Paper style={{ padding: 16 }}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <TextField
                    hintText="Name"
                    error={this.state.name.length > 0 ? false : true}
                    floatingLabelText="Name"
                    name="name"
                    helperText="Please enter a name"
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    hintText="Email"
                    error={
                      this.state.emailError.length === 0 &&
                      this.state.email.length > 0
                        ? false
                        : true
                    }
                    floatingLabelText="Email"
                    name="email"
                    helperText="Please enter an email - example@example.com"
                    onChange={this.onEmailChanged}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    hintText="Message"
                    error={this.state.message.length > 0 ? false : true}
                    floatingLabelText="Message"
                    name="message"
                    multiline
                    helperText="Please enter a message"
                    onChange={(e) => {
                      this.setState({ message: e.target.value });
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default ContactForm;
