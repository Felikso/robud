import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Navbar, Container, Nav } from "react-bootstrap";

import useWindowOnScroll from "hooks/useWindowOnScroll";
import useSmoothScrollTo from "hooks/useSmoothScrollTo";
import SvgIcon from "components/SvgIcon";
import { Link } from "gatsby"

import "./Navback.scss";

const Navback = ({ frontmatter, extraItems, linkBack }) => {
  const { brand, menuText, logoSvgFileName, back } = frontmatter;

  const handleScrollToTop = useSmoothScrollTo(0);

  const [expanded, setExpanded] = React.useState(false);
  const toggleMenu = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  const closeMenu = React.useCallback(() => {
    setExpanded(false);
  }, []);
  const handleBrandClick = React.useCallback(() => {
    closeMenu();
    handleScrollToTop();
  }, [closeMenu, handleScrollToTop]);

  const [shrink, setShrink] = React.useState(false);
  const handleWindowScroll = React.useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setShrink(scrollTop > 100);
  }, []);
  useWindowOnScroll(handleWindowScroll);

  return (
    <Navbar
      className={clsx("navbar-root wv-100", { "navbar-shrink": shrink })}
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>

        <Navbar.Brand className="cursor-pointer" onClick={handleBrandClick}>
          <SvgIcon onClick={handleBrandClick} className="brand-svg-icon" fileName={logoSvgFileName} alt={brand} />
        </Navbar.Brand>

        <Navbar.Toggle onClick={toggleMenu} aria-label="Toggle navigation">
          {menuText}
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="text-uppercase ml-auto">
            <Link to={linkBack}> {back} </Link>
          </Nav>
          {extraItems}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navback.propTypes = {
  linkBack: PropTypes.string,
  frontmatter: PropTypes.object,
  extraItems: PropTypes.any,
};

Navback.defaultProps = {
  frontmatter: {},
  extraItems: null,
  linkBack: null,
};

export default Navback;
