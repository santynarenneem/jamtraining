import {graphql, StaticQuery} from 'gatsby'
import React, {useState} from 'react'

import Layout from '../components/layout'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
    },
    sanityNavBar(name: {eq: "Header"}) {
      name
      navItems {
        navL1 {
          name
        }
        navL2 {
          name
        }
      }
    }

  }
`


function LayoutContainer (props) {
  const [showNav, setShowNav] = useState(false)

  function handleShowNav () {
    setShowNav(true)
  }
  function handleHideNav () {
    setShowNav(false)
  }
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          )
        }
        {console.log(data)}
        return (

          <Layout
            {...props}
            showNav={showNav}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
            nav = {data.sanityNavBar}
          />
        )
      }}
    />

  )

}

export default LayoutContainer
