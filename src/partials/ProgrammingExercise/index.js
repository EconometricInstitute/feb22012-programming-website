import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt as icon } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "@material-ui/core"

import { withTranslation } from "react-i18next"
import withSimpleErrorBoundary from "../../util/withSimpleErrorBoundary"
import { normalizeExerciseId } from "../../util/strings"
import ExerciseDescription from "./ExerciseDescription"

const accentColor = "#FAAA38"

const ProgrammingExerciseWrapper = styled(Card)`
  margin: 3.5rem 0;
  // border-left: 0.2rem solid ${accentColor};
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
  background-color: #D23D48;
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
  min-height: 300px;
`

class ProgrammingExercise extends React.Component {
  render() {
    const { children, name } = this.props

    return (
      <ProgrammingExerciseWrapper
        id={normalizeExerciseId(`programming-exercise-${name}`)}
      >
        <Header>
          <StyledIcon icon={icon} size="2x" />
          <HeaderTitleContainer>
            <HeaderMuted>{this.props.t("programmingExercise")} </HeaderMuted>
            <h3>{name}</h3>
          </HeaderTitleContainer>
        </Header>
        <CardContent>
          <Body>
            <div>
              <div>
                <ExerciseDescription>{children}</ExerciseDescription>
              </div>
            </div>
          </Body>
        </CardContent>
      </ProgrammingExerciseWrapper>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(ProgrammingExercise),
)
