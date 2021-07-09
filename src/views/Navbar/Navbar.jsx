import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Navbar, Container, Nav, Button } from "react-bootstrap";

import useWindowOnScroll from "hooks/useWindowOnScroll";
import useSmoothScrollTo from "hooks/useSmoothScrollTo";
import NavItem from "components/NavItem";
import SvgIcon from "components/SvgIcon";
import { Link } from "gatsby"

import "./Navbar.scss";

const MyNavbar = ({ anchors, frontmatter, extraItems, realizationsLink, realizationsText }) => {
  const { brand, menuText, logoSvgFileName } = frontmatter;

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
            {anchors.map((anchor) => (
              <NavItem key={anchor} to={anchor} onClick={closeMenu} />
            ))}

          </Nav>
          {extraItems}
          <Link to={realizationsLink}><Button className="text-uppercase">{realizationsText}</Button></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

MyNavbar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.string),
  realizationsLink: PropTypes.string,
  realizationsText: PropTypes.string,
  frontmatter: PropTypes.object,
  extraItems: PropTypes.any,
};

MyNavbar.defaultProps = {
  anchors: [],
  frontmatter: {},
  extraItems: null,
  realizationsLink: null,
  realizationsText: null,
};

export default MyNavbar;
