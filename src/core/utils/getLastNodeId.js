/**
 *
 * @param {array} nodes nodes data
 * @returns {number} number id last nodes
 * - by default return 1
 */
export const getLastNodeId = (nodes) => {
  if (Array.isArray(nodes)) {
    if (nodes.length > 0) {
      return nodes[nodes.length - 1].id;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
