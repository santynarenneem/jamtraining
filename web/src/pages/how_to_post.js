import React from 'react'
import Image from 'gatsby-image'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import urlIMage from '@sanity/image-url'
import Container from '../components/container'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../containers/layout'
import '../assets/css/how_to.css'
import styles from '../components/blog-post.module.css'
const urlFetch = source => urlIMage({projectId:'cxszgpkl',dataset:'production'}).image(source);
const serializers ={
  types:{
    step:props1=>(

    <div>
      <BlockContent blocks={props1.node.instructionName}/>
      <div className={styles.mainImage}>
      <img src={urlFetch(props1.node.imageName)} alt={props1.node.imageName.alt}/>
      </div>
      <BlockContent blocks={props1.node.directions}/>
      </div>

    ),
    figure:props2=> (
      <div className={styles.mainImage}>
      <img src={urlFetch(props2.node.asset)} alt={props2.node.alt}/>
      </div>
    ),
    productReference:props3=> <p>{props3.node.product._ref}</p>,
    span:props4=> <h1>test</h1>,

    youTube:props5=> ({node}) => {
      const { url } = node
      const id = getYouTubeId(url)
      return (<YouTube videoId={id} />)
    }

  }
}
function how_to_post({data}) {
  const { desktop, mobile} = data.sanityHowToArticle.heroImage.asset;

  return (
    <Layout>
    <Container>
      <h1>{data.sanityHowToArticle.headline}</h1>
      <h4>{data.sanityHowToArticle.subheading}</h4>
      <h6>Date : {data.sanityHowToArticle.publishedAt}</h6>


     {/* <img   alt={data.sanityHowToArticle.heroImage.alt} src={urlFetch(data.sanityHowToArticle.heroImage) .width(1200)
        .height(Math.floor((9 / 16) * 1200))
        .fit('crop')
        .auto('format')
        .url()}/>*/}
        <Image fluid={[
          data.sanityHowToArticle.heroImage.asset.mobile,
{...data.sanityHowToArticle.heroImage.asset.desktop,media:`(min-width: 768px)`}
        ]}/>


      <h6>Skill Level : {data.sanityHowToArticle.skillLevel}</h6>
      <h6>Time : {data.sanityHowToArticle.time} minutes</h6>
      {data.sanityHowToArticle.productList.map(ele=>(

<div>
<Image style={{width:120}} alt={ele._key} fluid={ele.productImage.asset.fluid}/>
{ele.productName}</div>
      ))}
      <BlockContent blocks={data.sanityHowToArticle._rawHowTobody} serializers={serializers} />
      </Container>
      </Layout>
  )
}
export const data = graphql `

query ($pagePath :String) {
  sanityHowToArticle(slug: {current: {eq: $pagePath}}){
headline
time
subheading
skillLevel
publishedAt(formatString: "YYYY MMMM DD")
_rawHowTobody
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

     mobile: fluid(maxWidth: 400) {
        ...GatsbySanityImageFluid_withWebp
      }
     desktop: fluid(maxWidth: 700) {
        ...GatsbySanityImageFluid_withWebp
      }

      url
    }
}
slug{
    current
}
}
  }
`

export default how_to_post

