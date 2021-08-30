import React from "react"
import styled from "styled-components"

import { Card, CardContent } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt as icon } from "@fortawesome/free-solid-svg-icons"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

/*
const Wrapper = styled.aside`
  padding 1rem;
  margin-bottom: 2rem;
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
*/

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
  background-color: rgb(82, 138, 252);
  display: flex;
  flex-direction: row;
  align-items: 0;
  color: white;
  padding: 1rem;
  padding-bottom: 1.5rem;
  h3 {
    margin-bottom: 0;
  }
`

const HeaderTitleContainer = styled.div`
  flex: 1;
`

const HeaderMuted = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-right: 0.2rem;
  position: relative;
  bottom: -3px;
`

const Body = styled.div`
  padding-bottom: 0.5rem;
`

const DescriptionWrapper = styled.div``


class Exercise extends React.Component {


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

    const { children } = this.props

    return (
      <ExerciseWrapper>
        <Header>
          <StyledIcon icon={icon} size="2x" />
          <HeaderTitleContainer>
            <HeaderMuted>Exercise</HeaderMuted>
            <h3>{this.props.title}</h3>
          </HeaderTitleContainer>
        </Header>
        <CardContent>
          <Body>
            <div>
              <div>
                <div />
                <DescriptionWrapper>{children}</DescriptionWrapper>
              </div>
            </div>
          </Body>
        </CardContent>
      </ExerciseWrapper>
    )

  }
}

export default withSimpleErrorBoundary(Exercise);
