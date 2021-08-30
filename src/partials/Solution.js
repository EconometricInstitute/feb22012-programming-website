import React from "react"
import styled from "styled-components"

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

const Wrapper = styled.aside`
  padding 1rem;
  margin-bottom: 0.75rem;
  border-left: 0.2rem solid var(--color);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

const StyledIcon = styled(FontAwesomeIcon)`
  vertical-align: middle;
  margin-right: 1rem;
  margin-left: 0.5rem;
  color: var(--color);
`

const Header = styled.h3`
  font-size: 1.3rem;
  font-weight: normal;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f7f7f9;
`

const Body = styled.div`
  padding-bottom: 0.5rem;
`

class Solution extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showSolution: false};
    this.trigger = this.trigger.bind(this);
  }

  trigger() {
    this.setState(prevState => ({showSolution: !prevState.showSolution}))
  }

  render() {
    const toggleText = this.state.showSolution ? 'Hide Solution' : 'Show Solution';

    const toggle = (
      <FormGroup row>
        <FormControlLabel control={
          <Switch
            checked={this.state.showSolution}
            onChange={this.trigger}
            color="primary"
          />
        }
        label={toggleText}
        />
      </FormGroup>
    );

    if (!this.state.showSolution) {
      return toggle;
    }
    return (
      <>
      {toggle}
      <Wrapper style={{ "--color": '#f9e076'}}>
        <Header>
          <StyledIcon icon={faEye} size="1x" />
          Solution
        </Header>
        <Body>
          {this.props.children}
        </Body>
      </Wrapper>
    </>
    )
  }
}

export default withSimpleErrorBoundary(Solution);
