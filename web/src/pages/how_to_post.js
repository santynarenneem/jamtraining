import React from 'react'
import Image from 'gatsby-image'
import Grid from '@material-ui/core/Grid';
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import urlIMage from '@sanity/image-url'
import Container from '../components/container'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../containers/layout'
import '../assets/css/how_to.css'
import styles from '../components/blog-post.module.css'
const urlFetch = source => urlIMage({projectId: 'cxszgpkl', dataset: 'production'}).image(source);
const serializers = {
    types: {
        step: props1 => (

            <div>
                <BlockContent blocks={props1.node.instructionName}/>
                <div className={styles.mainImage}>
                    <img src={urlFetch(props1.node.imageName)} alt={props1.node.imageName.alt}/>
                </div>
                <BlockContent blocks={props1.node.directions}/>
            </div>

        ),
        figure: props2 => (
            <div className={styles.mainImage}>
                <img src={urlFetch(props2.node.asset)} alt={props2.node.alt}/>
            </div>
        ),
        productReference: props3 => <p>{props3.node.product._ref}</p>,
        span: props4 => <h1>test</h1>,

        youTube: props5 => ({node}) => {
            const {url} = node
            const id = getYouTubeId(url)
            return (
                <h1>test</h1>
            )
        }

    }
}
function how_to_post({data}) {
    {
        console.log(data)
        console.log(data.sanityHowToArticle.tags[0].tagName)
        const tagVal=[];
        data.sanityHowToArticle.tags.forEach((tag,index)=>{
          tagVal.push(tag.tagName);
        })
        console.log(tagVal);
    }
    const {desktop, mobile} = data.sanityHowToArticle.heroImage.asset;
    // window.onscroll = function() {myFunction()};

    // function myFunction() {
    //   var elmnt = document.getElementById("content");
    //   console.log(elmnt.scrollHeight,document.body.scrollTop,document.documentElement.scrollTop);
    //   if (document.body.scrollTop > elmnt.scrollHeight -1000 || document.documentElement.scrollTop > elmnt.scrollHeight -1000) {
    //     document.getElementById("article").style = "position:relative";
    //   } else {
    //     document.getElementById("article").style = "position:fixed";
    //   }
    // }
    return (

        <Layout>
            <Grid container spacing={3} id="content">
                <Grid item md={8}>
                    <div className="mainContent">
                        <h1>{data.sanityHowToArticle.headline}</h1>
                        <h4>{data.sanityHowToArticle.subheading}</h4>
                        <h6>Date : {data.sanityHowToArticle.publishedAt}</h6>

                        {/* <img   alt={data.sanityHowToArticle.heroImage.alt} src={urlFetch(data.sanityHowToArticle.heroImage) .width(1200)
        .height(Math.floor((9 / 16) * 1200))
        .fit('crop')
        .auto('format')
        .url()}/>*/}
                        <Image
                            fluid={[
                            data.sanityHowToArticle.heroImage.asset.mobile, {
                                ...data.sanityHowToArticle.heroImage.asset.desktop,
                                media: `(min-width: 768px)`
                            }, {
                                ...data.sanityHowToArticle.heroImage.asset.tablet,
                                media: `(min-width: 508px)`
                            }
                        ]}/>

                        <h6>Skill Level : {data.sanityHowToArticle.skillLevel}</h6>
                        <h6>Time : {data.sanityHowToArticle.time}
                            minutes</h6>
                        {data
                            .sanityHowToArticle
                            .productList
                            .map(ele => (

                                <div>
                                    <Image
                                        style={{
                                        width: 120
                                    }}
                                        alt={ele._key}
                                        fluid={ele.productImage.asset.fluid}/> {ele.productName}</div>
                            ))}
                        <BlockContent
                            blocks={data.sanityHowToArticle._rawHowTobody}
                            serializers={serializers}/>


                    </div>
                </Grid>
                <Grid item md={4}>
                    <div id="article" className="related-article">
                    <Grid container spacing={2}>
<Grid item md={12} xs={12}>
                        <h1>Related Articles</h1>
                        </Grid>


                        {data.allSanityFeatureArticle.edges.map(article=>{
                          return(
                            <Grid container>
                            <Grid item md={4} xs={12}>
                            <img className="rel-article-img"src={article.node.heroImage.asset.url}/>
                        </Grid>
                        <Grid item md={8} xs={12}>
                       <span className="rel-article-header"> {article.node.headline}</span>
                        </Grid>

                            </Grid>
                          )
                        })}
                        <h6>{data.sanityHowToArticle.tags.map(tag=>{
                          return(
                            <div>
                            <h3>{tag.tagName}</h3>
                            </div>
                          );
                        })}</h6>
                        </Grid>
                    </div>

                </Grid>
            </Grid>
        </Layout>
    )
}

export const data = graphql `

query GetQuery($id :String,$tagValue:[String]) {
  sanityHowToArticle(id: {eq: $id}){
    headline
    time
    subheading
    skillLevel
    publishedAt(formatString: "YYYY MMMM DD")
    _rawHowTobody
    tags {
      tagName
    }
    productList {
      _key
      productName
        productImage {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }
        }
      }
    }
    heroImage{
      hotspot {
        x
        y
        height
        width
        _type
        _key
       }
      crop {
        top
        right
        left
        bottom
        _type
        _key
      }
    alt

    asset{

     mobile: fluid(maxWidth: 100) {
        ...GatsbySanityImageFluid_withWebp
      }
     desktop: fluid(maxWidth: 700) {
        ...GatsbySanityImageFluid_withWebp
      }
      tablet:fluid(maxWidth:300){
        ...GatsbySanityImageFluid_withWebp
      }

      url
    }
}
slug{
    current
}
}
allSanityFeatureArticle(filter: {tags: {elemMatch: {tagName: {in: $tagValue}}}}) {
  edges {
    node {
      headline
      heroImage {
        asset {
          url
        }
      }
    }
  }
}

  }



`

export default how_to_post;
