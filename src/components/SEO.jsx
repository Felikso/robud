import React from "react";
import Helmet from "react-helmet";
import Thumbnail from "content/assets/images/thumbnail/thumbnail.png"
import {
  url,
  socialLinks,
  address,
  contact,
  legalName,
  foundingDate,
  logo,
  title,
  description,
} from "config/site";

const SEO = () => {
  const structuredDataOrganization = `{ 
		"@context": "http://schema.org",
		"@type": "Organization",
		"legalName": "${legalName}",
		"url": "${url}",
		"logo": "${logo}",
		"foundingDate": "${foundingDate}",
		"founders": [{
			"@type": "Person",
			"name": "${legalName}"
		}],
		"contactPoint": [{
			"@type": "ContactPoint",
			"email": "${contact.email}",
			"telephone": "${contact.phone}",
			"contactType": "customer service"
		}],
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "${address.city}",
			"addressRegion": "${address.region}",
			"addressCountry": "${address.country}",
			"postalCode": "${address.zipCode}"
		},
		"sameAs": [
			"${socialLinks.google}",
			"${socialLinks.youtube}",
			"${socialLinks.instagram}",
			"${socialLinks.github}",
            "${socialLinks.facebook}"
		]
  	}`;

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="image" content={Thumbnail} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={Thumbnail} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={Thumbnail} />
      <script type="application/ld+json">{structuredDataOrganization}</script>
      <link rel="publisher" href={socialLinks.google} />
      <title>{title}</title>
      <html lang="pl" dir="ltr" />
    </Helmet>
  );
};

/* SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
};

SEO.defaultProps = {
  title: "",
  description: "",
  location: "",
}; */


export default SEO