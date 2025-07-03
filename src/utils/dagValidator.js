export function validateDAG(nodes, edges) {
  if (nodes.length < 2) {
    return { isValid: false, reason: "Graph must have at least 2 nodes." };
  }

  const adj = {};
  for (const node of nodes) {
    adj[node.id] = [];
  }
  for (const edge of edges) {
    adj[edge.source].push(edge.target);
  }

  const visited = {};
  const recStack = {};

  function dfs(nodeId) {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recStack[nodeId] = true;

      for (const neighbor of adj[nodeId]) {
        if (!visited[neighbor] && dfs(neighbor)) {
          return true;
        } else if (recStack[neighbor]) {
          return true;
        }
      }
    }
    recStack[nodeId] = false;
    return false;
  }

  for (const node of nodes) {
    if (dfs(node.id)) {
      return { isValid: false, reason: "Graph contains a cycle." };
    }
  }

  const connectedNodeIds = new Set();
  for (const edge of edges) {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  }

  const unconnected = nodes.filter((n) => !connectedNodeIds.has(n.id));
  if (unconnected.length > 0) {
    return {
      isValid: false,
      reason: "All nodes must be connected to at least one edge.",
    };
  }

  return { isValid: true };
}
