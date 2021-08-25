import React from "react"
import styled from "styled-components"
import CourseSettings from "../../course-settings"

import BannerImage from "../../banner.svg"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

const BannerWrapper = styled.header`
  height: 20rem;
  max-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  background-color: rgb(0, 35, 40);
  color: white;
  text-align: center;
  h1 {
  }
  h2 {
  }
`

const Heading = styled.div`
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 500;
  font-size: 2rem;
  color: white;
  /* color: #c0392b; */
  /* background: white; */
  padding: 0.5rem;
  margin: 1rem;
  text-align: center;
  @media only screen and (min-width: 720px) {
    font-size: 3rem;
  }
`

const SubHeading = styled.div`
    font-family: 'Roboto Slab', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-weight: 500;
    color: white;
    /* color: #c0392b; */
    /* background: white; */
    padding .5rem;
    font-size: 1.4rem;
    margin: 0 1rem;
`

const Banner = () => (
  <BannerWrapper>
    <Heading>{CourseSettings.default.name}</Heading>
    <SubHeading>{CourseSettings.default.subtitle}</SubHeading>
  </BannerWrapper>
)

export default withSimpleErrorBoundary(Banner)
