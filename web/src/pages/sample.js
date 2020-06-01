import React from 'react'
import {graphql} from 'gatsby'
function sample({data}) {
  return (
    <div>
      {console.log(data)}
    </div>
  )
}
export const data = graphql `
query MyNav {
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
export default sample
