import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Link } from "gatsby";
import { NavDropdown } from "react-bootstrap";

import SvgIcon from "components/SvgIcon";

import getBaseUrl from "utils/getBaseUrl";

import "./LanguageSelector.scss";

const LanguageSelector = ({ defaultLang, langKey, langTextMap, flag, linkPart }) => {

  return (
    <NavDropdown
      title={langTextMap[langKey]}
      id="language-dropdown"
      className="language-selector"
    >
      {Object.keys(langTextMap).map((key) => {
        let goTo
        if (linkPart) {
          goTo = `${getBaseUrl(defaultLang, key)}${linkPart[key]}`
        } else
          goTo = getBaseUrl(defaultLang, key)

        return (
          <Link
            key={key}
            to={goTo}
            className={clsx("dropdown-item test", { active: key === langKey })}
          >

            <SvgIcon className="test" fileName={`svgs/flag-${key}.svg`} alt={flag} />
          </Link>
        );
      })}
    </NavDropdown>
  );
};

LanguageSelector.propTypes = {
  defaultLang: PropTypes.string,
  langKey: PropTypes.string,
  langTextMap: PropTypes.object,
  flag: PropTypes.any,
  linkPart: PropTypes.object,
};

LanguageSelector.defaultProps = {
  linkPart: null,
  defaultLang: "pl",
  langKey: "pl",
  langTextMap: {
    pl: "polski",
  },
  flag: "svgs/flag-pl.svg",
};

export default LanguageSelector;
