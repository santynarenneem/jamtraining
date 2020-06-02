import {graphql, StaticQuery} from 'gatsby'
import React, {useState} from 'react'
import Layout from '../components/layout'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
<<<<<<< HEAD
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

=======
    }
  }
`

function LayoutContainer (props) {
  const [showNav, setShowNav] = useState(false)
>>>>>>> c4051dd440968ae4407044379d04672487802a47
  function handleShowNav () {
    setShowNav(true)
  }
  function handleHideNav () {
    setShowNav(false)
  }
<<<<<<< HEAD

=======
>>>>>>> c4051dd440968ae4407044379d04672487802a47
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          )
        }
<<<<<<< HEAD
        {console.log(data)}
        return (

=======
        return (
>>>>>>> c4051dd440968ae4407044379d04672487802a47
          <Layout
            {...props}
            showNav={showNav}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
<<<<<<< HEAD
            nav = {data.sanityNavBar}
=======
>>>>>>> c4051dd440968ae4407044379d04672487802a47
          />
        )
      }}
    />
<<<<<<< HEAD

  )

=======
  )
>>>>>>> c4051dd440968ae4407044379d04672487802a47
}

export default LayoutContainer
