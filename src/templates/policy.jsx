import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Navback from "views/Navback";
import SmallTop from "views/SmallTop"
import Footer from "views/Footer";

import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";

import getBaseUrl from "utils/getBaseUrl";
import breakDownAllNodes from "utils/breakDownAllNodes";

import "../style/main.scss";
import Policy from "views/Policy";

export const query = graphql`
  query PolicyQuery($langKey: String!) {
    site {
      siteMetadata {
        keywords
        description
        policy {
            cz
            pl
            de
          }
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
  }
`;

const PolicyPage = ({ data, pageContext: { langKey, defaultLang, langTextMap } }) => {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data;

  const { customedHeaderNode, navBackNode, policyNode, footerNode } = breakDownAllNodes(nodes);


  const linkBack = getBaseUrl(defaultLang, langKey)

  const alternative = data.site.siteMetadata.policy

  const resultLang = Object.keys(alternative).filter(item => {
    let link
    if (item === langKey) {
      link = `${alternative[item]}/${item}`
    } return link
  });


  const alternativeText = alternative[resultLang]



  let langSelectorPart;
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} linkPart={alternative} partLink={alternativeText} />
    );
  }

  return (
    <>
      <SEO lang={langKey} title="Top" keywords={keywords} description={description} />
      <SmallTop frontmatter={customedHeaderNode.frontmatter} linkBack={linkBack} />
      <Navback
        frontmatter={navBackNode.frontmatter}
        extraItems={langSelectorPart}
        linkBack={linkBack}
      />

      <Policy frontmatter={policyNode.frontmatter} html={policyNode.html} />
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  );
};

PolicyPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};

PolicyPage.defaultProps = {
  pageContext: {
    langKey: "pl",
    defaultLang: "pl",
    langTextMap: {},
  },
};

export default PolicyPage;
