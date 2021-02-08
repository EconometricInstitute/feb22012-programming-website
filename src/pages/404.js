import React from "react"
import Layout from "../templates/Layout"
import Container from "../components/Container"
import { withLoginStateContext } from "../contexes/LoginStateContext"
import Helmet from "react-helmet"

const NotFoundPage = () => (
  <Layout>
    <Container>
      <Helmet title="404" />
      <h1>Page not found.</h1>
      <p>You are trying to access a page that does not exist.</p>
    </Container>
  </Layout>
)

export default withLoginStateContext(NotFoundPage)
