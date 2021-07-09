import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import getBaseUrl from "utils/getBaseUrl";

import Navbar from "views/Navbar";
import Top from "views/Top";
import Footer from "views/Footer";
import * as Sections from "views/Sections";
import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";


import breakDownAllNodes from "utils/breakDownAllNodes";
import fileNameToSectionName from "utils/fileNameToSectionName";

import "../style/main.scss";

/**
 * get file name list from content/sections folder
 */
export const query = graphql`
  query IndexQuery($langKey: String!) {
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
          btn
          brand
          flag
          logoFileName
          logoSvgFileName
          anchor
          imageMain
          secondHeader
          contactUsHeader
          copyright
          copyrightHref
          header
          imageFileName
          jumpToAnchor
          jumpToAnchorText
          menuText
          contactForm {
            acept
            name
            nameMin
            nameMax
            nameR
            email
            emailE
            emailMin
            emailMax
            emailR
            message
            messageMin
            messageR
            termsR
            confirmed
            thanks
            send
          }
          portfolios {
            content
            extraInfo
            header
            subheader
            imageFileNameDetail
            imageFileName
          }
          privacyHref
          privacyText
          services {
            header
            iconName
            icon
            imageFileName
          }
          social {
            facebook
            github
            linkedin
            medium
            twitter
          }
          subheader
          suppliers {
            icon
            btn
            href
            header
            subheader
          }
          mapLocation {
            country
            mapImage
            mapTitle
            mapLocationTitle
            mapLocationApp {
              area {
                region
                cities
              }
            }
          }
          title
          timeline {
            content
            header
            number
            imageContent
            imageFileName
          }
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

const IndexPage = ({ children, data, pageContext: { langKey, defaultLang, langTextMap } }) => {
  const {
    site: {
      siteMetadata: { keywords, description, phone, phoneCode, mail },
    },
    allMarkdownRemark: { nodes },
  } = data;

  const { topNode, navBarNode, anchors, footerNode, sectionsNodes } = breakDownAllNodes(nodes);

  let langSelectorPart;
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
    );
  }


  const gallery = data.site.siteMetadata.realizations

  const resultLang = Object.keys(gallery).filter(item => {
    let link
    if (item === langKey) {
      link = `${gallery[item]}/${item}`
    } return link
  });


  const realizationsText = gallery[resultLang]
  const realizationsLink = `${getBaseUrl(defaultLang, langKey)}${gallery[resultLang]}`

  return (
    <>
      <SEO lang={langKey} title="Top" keywords={keywords} description={description} />
      <Navbar
        anchors={anchors}
        frontmatter={navBarNode.frontmatter}
        extraItems={langSelectorPart}
        realizationsLink={realizationsLink}
        realizationsText={realizationsText}
      />
      <Top frontmatter={topNode.frontmatter} />
      {
        // dynamically import sections
        sectionsNodes.map(({ html, frontmatter, fields: { fileName } }, ind) => {
          const sectionComponentName = fileNameToSectionName(fileName);
          const SectionComponent = Sections[sectionComponentName];

          return SectionComponent ? (
            <SectionComponent
              key={sectionComponentName}
              className={ind % 2 === 1 ? "bg-light" : null}
              frontmatter={frontmatter}
              html={html}
              phone={phone}
              phoneCode={phoneCode}
              mail={mail}
            />
          ) : null;
        })
      }

      {children}
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
  children: PropTypes.any,
};

IndexPage.defaultProps = {
  children: null,
  pageContext: {
    langKey: "pl",
    defaultLang: "pl",
    langTextMap: {},
  },
};

export default IndexPage;
