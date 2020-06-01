import React from 'react'
import {graphql} from 'gatsby'
import Slider from "react-slick";
import Container from '../components/container'
import Layout from '../containers/layout'
import Slide from '../components/slides'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/home.css";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
function home({data}) {
    return (
        <Layout>

            <Container>
                {console.log(data)}
                {console.log(data.sanityLandingLayout.landingSections)}
                {data
                    .sanityLandingLayout
                    .landingSections
                    .map(function (sec) {
                        if (sec.slides == undefined) {
                            return (sec.textBlockName);

                        } else {
                            return (
                                <div key={sec.id}>
                                    <h1>{sec.__typename}</h1>
                                    <h6>{sec.sliderName}</h6>
                                    <Slider
                                        style={{
                                        margin: 40
                                    }}
                                        {...settings}>
                                        {sec
                                            .slides
                                            .map(element => {
                                                return (
                                                    <div className="sliderDiv" key={element.id}>
                                                        <img className="sliderImage" src={element.heroImage.asset.url}/>
                                                        <span className="sliderContent">
                                                            {element.headline}</span>
                                                    </div>

                                                );

                                            })}
                                    </Slider>

                                </div>

                            );
                        }

                    })}
            </Container>
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
                url
              }
            }
          }
          ... on SanityGalleryArticle {
            id
            headline
            heroImage {
              asset {
                url
              }
            }
          }
          ... on SanityHowToArticle {
            id
            headline
            heroImage {
              asset {
                url
              }
            }
          }
        }
      }
      ... on SanityTextBlock {
        id
        textBlockName
      }

    }
  }
}

`
export default home
