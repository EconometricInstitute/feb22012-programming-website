import React from "react"
import styled from "styled-components"

import { Card, CardContent } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen as icon } from "@fortawesome/free-solid-svg-icons"
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
  background-color: #17a2b8;
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
    /*
    const body = this.props.children;

    return (
      <Wrapper style={{ "--color": '#528afc'}}>
      <Header>
        <StyledIcon icon={faPencilAlt} size="1x" />
        {this.props.title}
      </Header>
      <Body>
        {body}
      </Body>
    </Wrapper>
    )
    */
    return (
      <ExerciseWrapper>
        <Header>
          <StyledIcon icon={icon} size="2x" />
          <h2>Background Material</h2>
        </Header>
        <Content>
          <Body>
            <DescriptionWrapper>
              This section provides an in-depth description of topics that are useful
              and relevant to the course and may help you during work on assignments.
              However, you do not need to learn this section for the exam.
            </DescriptionWrapper>
          </Body>
        </Content>
      </ExerciseWrapper>
    )

  }
}

export default withSimpleErrorBoundary(WorkInProgress);
