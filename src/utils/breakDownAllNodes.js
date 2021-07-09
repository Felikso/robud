import { curry, pathSatisfies, test, identity, path } from "ramda";

const propFilter = curry((pathList, regex) => pathSatisfies(test(regex), pathList));

/**
 * break down all data retrieved in index.js
 */
export default function breakDownAllNodes(nodes) {
  const filterByFileName = propFilter(["fields", "fileName"]);
  const filterByDirectoryName = propFilter(["fields", "directoryName"]);

  // top part
  const topNode = nodes.find(filterByFileName(/top/i)) || {};

  // customedheader part
  const customedHeaderNode = nodes.find(filterByFileName(/customedheader/i)) || {};

  // error part
  const errorNode = nodes.find(filterByFileName(/error/i)) || {};

  // navbar
  const navBarNode = nodes.find(filterByFileName(/navbar/i)) || {};

  // navback
  const navBackNode = nodes.find(filterByFileName(/navback/i)) || {};

  // footer
  const footerNode = nodes.find(filterByFileName(/footer/i)) || {};

  // policy
  const policyNode = nodes.find(filterByFileName(/policy/i)) || {};

  // sections part
  const sectionsNodes = nodes.filter(filterByDirectoryName(/sections/i));

  // anchors for NavBar
  const anchors = sectionsNodes.map(path(["frontmatter", "anchor"])).filter(identity);

  return {
    topNode,
    customedHeaderNode,
    navBarNode,
    navBackNode,
    footerNode,
    sectionsNodes,
    anchors,
    policyNode,
    errorNode,
  };
}
