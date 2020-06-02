import React, { lazy } from 'react'
import {graphql} from 'gatsby'
import Loadable from "@loadable/component"
import Image from 'gatsby-image'
import Slider from "react-slick";

const Layout = Loadable(() => import('../containers/layout'))
import BlockContent from '@sanity/block-content-to-react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/home.css";
import SEO from '../components/seo'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1
};
const settingsOne = {


  lazyLoad: true,
  className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
  slidesToShow: 4,
  initialSlide: 0,
  slidesToScroll: 4,
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
function home({data}) {
    return (
        <Layout>

        <SEO title="Home" description="NASA"  />
                {console.log(data)}
                {console.log(data.sanityLandingLayout.landingSections)}
                {data
                    .sanityLandingLayout
                    .landingSections
                    .map(function (sec) {
                        if (sec.slides == undefined) {

                          return (

                            <BlockContent blocks={sec._rawTextBlockBody}/>

                            );

                        } else {
if(sec.sliderName == "Random Tile Slider Authored Tommy"){
  return (
    <div key={sec.id}>

        <h1 className="sliderTileTitle">{sec.sliderName}</h1>
        <Slider
            style={{
            margin: 40,
            padding:10
        }}
            {...settingsOne}>
            {sec
                .slides
                .map(element => {
                    return (
                        <div  className="sliderDivTile" key={element.id}>
                        <div  style={{margin:"20px"}}>
                        <Image className="sliderImageTile" fluid={element.heroImage.asset.fluid}/>
                            <span className="sliderContentTile">
                                {element.headline}</span>
                                </div>
                        </div>

                    );

                })}
        </Slider>

    </div>

);
}else{
                            return (
                                <div key={sec.id}>

                                  <div className="sliderDiv">
                                    <Slider
                                        style={{
                                        margin: 40
                                    }}
                                        {...settings}>
                                        {sec
                                            .slides
                                            .map(element => {
                                                return (
                                                  <div className="sliderDivBlock" key={element.id}>
                                                      <Image className="sliderImage" fluid={element.heroImage.asset.fluid}/>
                                                        <span className="sliderContent">
                                                            {element.headline} <br/>Go To Article</span>
                                                  </div>

                                                );

                                            })}
                                    </Slider>
                                    </div>
                                </div>

                            );
                        }
                      }
                    })}

        </Layout>
    )
}
export const data = graphql `
query HomeQuery {
  sanityLandingLayout(landingPage: {eq: "Home Page"}) {
    id
    landingPage
    landingSections {
      ... on SanityArticleSlider {
        id
        sliderName
        slides {
          ... on SanityFeatureArticle {
            id
            headline
            heroImage {
              asset {
                fluid(maxWidth: 700) {
                  ...GatsbySanityImageFluid_withWebp
                }
              }
            }
            slug {
              current
            }
          }
          ... on SanityGalleryArticle {
            id
            headline
            heroImage {
              asset {
                fluid(maxWidth: 700) {
                  ...GatsbySanityImageFluid_withWebp
                }
              }
            }
            slug {
              current
            }
          }
          ... on SanityHowToArticle {
            id
            headline
            heroImage {
              asset {
                fluid(maxWidth: 700) {
                  ...GatsbySanityImageFluid_withWebp
                }
              }
            }
            slug {
              current
            }
          }
        }
      }
      ... on SanityTextBlock {
        id
        textBlockName
        _rawTextBlockBody
      }

    }
  }
}

`
export default home
