import React from 'react'
import { graphql } from 'gatsby'
import Image from '../components/Image'
import Content from '../components/Content'
import Layout from '../components/Layout'
import _kebabCase from 'lodash/kebabCase'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HomePage.css'


// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, carousel, body }) => { 
  const renderSlides = () => carousel.images.map((images, index) => {
  return (
    <div key={_kebabCase(images.alt) + '-' + index}>
      <img src={images.image} />
      <p className="legend">Legend {index}</p>

    </div>
  )})

  return (
  <main className="Home">
    <Carousel showArrows={true}>
      {renderSlides()}
    </Carousel>
    <section className="section">
      <div className="container">
        <h1>{title}</h1>
        <Content source={body} />
        <div className="smallDisplay">
          <iframe src="https://calendar.google.com/calendar/b/4/embed?height=400&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FChicago&amp;src=ZGV2dGVzdGVyMmsyMEBnbWFpbC5jb20&amp;color=%23039BE5&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showCalendars=0&amp;mode=AGENDA&amp;title=Does%20title%20even%20matter%3F&amp;showTitle=0&amp;showDate=0&amp;showNav=1" className="mobileIframe" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
        </div>
        <div className="largeDisplay">
          <iframe src="https://calendar.google.com/calendar/b/4/embed?height=400&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FChicago&amp;src=ZGV2dGVzdGVyMmsyMEBnbWFpbC5jb20&amp;color=%23039BE5&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showCalendars=0&amp;mode=MONTH&amp;title=Does%20title%20even%20matter%3F&amp;showTitle=0&amp;showDate=0&amp;showNav=1" className="desktopIframe" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
        </div>
      </div>
    </section>
  </main>
  )
}

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        carousel {
          images {
            image
            alt
          }
        }
      }
    }
  }
`
