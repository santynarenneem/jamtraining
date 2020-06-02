import React from 'react'
import {graphql} from 'gatsby'
import {Link} from 'gatsby'
import Layout from '../containers/layout'
import Image from 'gatsby-image'
import Container from '../components/container'
import Slider from "react-slick";
import '../assets/css/how_to.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
const product_Settings = {
  className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};

function how_to({data}) {
    {
        console.log(data)
    }
    return (
        <Layout>
<Container>
        <Slider style={{margin:40}} {...settings}>
          {data.sanityArticleSlider.slides.map(function(element)  {
            return(
              <div key={element.id}>
              <Image style={{width:100,hieght:100}}fluid={element.heroImage.asset.fluid}/>
            <h1>  {element.headline}</h1>
              </div>


            );

          })}
        </Slider>
        <Slider style={{margin:40}} {...product_Settings}>
          {data.sanityProductSlider.slides.map(function(element)  {
            return(
              <div key={element.id}>
              <Image style={{width:100,hieght:100}}fluid={element.productImage.asset.fluid}/>
            <h6>  {element.productName}</h6>
              </div>


            );

          })}
        </Slider>
            <div>
                {data
                    .allSanityHowToArticle
                    .edges
                    .map(howto => (
                        <div key={howto.node.id}>
                           <Link style={{textDecoration:"none",color:"#000"}} to={"/how_to/"+howto.node.slug.current}> <h1>{howto.node.headline}</h1></Link>
                            <h6>{howto.node.subheading}</h6>
                            <Image style={{width:300}}fluid={howto.node.heroImage.asset.fluid}/>
                        </div>
                    ))}
            </div>
            </Container>
        </Layout>
    )
}
export const data = graphql `
query MyQuery {
  allSanityHowToArticle {
    edges {
      node {
        id
        slug {
          current
        }
        headline
        subheading
        heroImage {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }

          }
        }
      }
    }
  },
  sanityArticleSlider(sliderName: {eq: "Generic Main Hero - 5 Popular Stories"}) {
    sliderName
    slides {
      ... on SanityFeatureArticle {
        id
        headline
        heroImage {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }

          }
        }
      }
      ... on SanityGalleryArticle {
        id
        headline
        heroImage {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }

          }
        }
      }
      ... on SanityHowToArticle {
        id
        headline
        heroImage {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }

          }
        }
      }
    }
  },
  sanityProductSlider(sliderName: {eq: "Best Selling Products (Tresemme)"}) {
    sliderName
    slides {
      productName
      productImage{
      asset {
        fluid(maxWidth: 700) {
          ...GatsbySanityImageFluid
        }

      }
    }
    }
  }
}
`
export default how_to
