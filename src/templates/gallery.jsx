import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Navback from "views/Navback";
import SmallTop from "views/SmallTop"
import Footer from "views/Footer";
import GallerySection from "views/GallerySection";
import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";

import getBaseUrl from "utils/getBaseUrl";
import breakDownAllNodes from "utils/breakDownAllNodes";

import "../style/main.scss";


export const query = graphql`
  query GalleryQuery($langKey: String!) {
    site {
      siteMetadata {
        keywords
        description
        phone
        phoneCode
        mail
        realizations {
          cz
          pl
          de
        }
        gallery
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { order: ASC, fields: [fields___directoryName, fields___fileName] }
    ) {
      nodes {
        html
        frontmatter {
          back
          brand
          flag
          logoFileName
          logoSvgFileName
          secondHeader
          copyright
          copyrightHref
          header
          imageFileName
          menuText
          privacyHref
          privacyText
          subheader
          title
        }
        fields {
          fileName
          directoryName
        }
      }
    }

    productsGallery: 
    allFile(filter: {relativeDirectory: {eq: "assets/images/portfolios"}}) {
        edges {
          node {
            name
              childImageSharp {
                thumb: gatsbyImageData(
                  width: 270
                  height: 270
                  placeholder: BLURRED
                )
                full: gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
  }
`;

const GalleryPage = ({ data, pageContext: { langKey, defaultLang, langTextMap } }) => {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data;

  const { customedHeaderNode, navBackNode, footerNode } = breakDownAllNodes(nodes);


  const linkBack = getBaseUrl(defaultLang, langKey)



  const gallery = data.site.siteMetadata.realizations

  const resultLang = Object.keys(gallery).filter(item => {
    let link
    if (item === langKey) {
      link = `${gallery[item]}/${item}`
    } return link
  });


  const realizationsText = gallery[resultLang]



  let langSelectorPart;
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} linkPart={gallery} partLink={realizationsText} />
    );
  }

  const numberPhotos = data.productsGallery.edges.length

  const images = data.productsGallery.edges.map(({ node }, i) => ({
    ...node.childImageSharp,
    caption: `RoBud zdjęcie ${i + 1} / ${numberPhotos}`,

  }))


  return (
    <>
      <SEO lang={langKey} title="Top" keywords={keywords} description={description} />
      <SmallTop frontmatter={customedHeaderNode.frontmatter} linkBack={linkBack} />
      <Navback
        frontmatter={navBackNode.frontmatter}
        extraItems={langSelectorPart}
        linkBack={linkBack}
      />
      <GallerySection images={images} />

      <Footer frontmatter={footerNode.frontmatter} />
    </>
  );
};

GalleryPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};

GalleryPage.defaultProps = {
  pageContext: {
    langKey: "pl",
    defaultLang: "pl",
    langTextMap: {},
  },
};

export default GalleryPage;
