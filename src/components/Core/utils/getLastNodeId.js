/**
 *
 * @param {Array} nodes nodes data
 * @returns {Number} number id last nodes
 * - by default return 1
 */
export const getLastNodeId = (nodes) => {
  if (Array.isArray(nodes)) {
    if (nodes.length > 0) {
      console.log(nodes[nodes.length - 1].id, "node id");
      return nodes[nodes.length - 1].id;
    } else {
      return 1;
    }
  } else {
    return 1;
  }
};
