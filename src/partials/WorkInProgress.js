import React from "react"
import styled from "styled-components"

import { Card, CardContent } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSnowplow as icon } from "@fortawesome/free-solid-svg-icons"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

const ExerciseWrapper = styled(Card)`
  margin: 3.5rem 0;
  border-radius: 1rem !important;
  box-shadow: 0 8px 40px -12px rgba(0,0,0,0.3) !important;
  padding: 0 !important;
`

const StyledIcon = styled(FontAwesomeIcon)`
  vertical-align: middle;
  margin-right: 1.5rem;
  margin-left: 0.5rem;
  color: white;
  position: relative;
  bottom: -13px;
`
const Header = styled.div`
  font-size: 1.3rem;
  font-weight: normal;
  padding 1rem 0;
  border-bottom: 1px solid #f7f7f9;
  background-color: #ffc107;
  display: flex;
  flex-direction: row;
  align-items: 0;
  color: white;
  padding: 1rem;

  h3 {
    margin-bottom: 0;
  }
`
const Body = styled.div`
  // padding-bottom: 0.5rem;
`

const DescriptionWrapper = styled.div``


const Content = styled(CardContent)`
  padding-bottom: 0.25rem;
`

class WorkInProgress extends React.Component {

  render() {
    return (
      <ExerciseWrapper>
        <Header>
          <StyledIcon icon={icon} size="2x" />
          <h2>Work In Progress</h2>
        </Header>
        <Content>
          <Body>
            <DescriptionWrapper>
              This course content is still work in progress! Feel free to browse around,
              but please be aware that the content may still change until we reach this
              topic during the course.
            </DescriptionWrapper>
            <h4>Proceed at your own risk!</h4>
          </Body>
        </Content>
      </ExerciseWrapper>
    )

  }
}

export default withSimpleErrorBoundary(WorkInProgress);
