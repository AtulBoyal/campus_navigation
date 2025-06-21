export function dijkstra(mapData, startId, endId) {
  const { nodes, edges } = mapData;
  
  // Create graph representation
  const graph = {};
  nodes.forEach(node => graph[node.id] = []);
  
  // Add edges with defensive checks
  edges.forEach(edge => {
    if (graph[edge.from] && graph[edge.to]) {
      graph[edge.from].push({ to: edge.to, weight: edge.weight });
      graph[edge.to].push({ to: edge.from, weight: edge.weight }); // For bidirectional paths
    } else {
      console.error("Edge refers to missing node:", edge);
    }
  });

  // Initialize data structures
  const distances = {};
  const previous = {};
  const unvisited = new Set(nodes.map(node => node.id));
  
  nodes.forEach(node => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  });
  
  distances[startId] = 0;

  // Main algorithm
  while (unvisited.size > 0) {
    // Find node with smallest distance
    let current = null;
    for (const nodeId of unvisited) {
      if (current === null || distances[nodeId] < distances[current]) {
        current = nodeId;
      }
    }
    
    // Break if we've reached the end
    if (current === endId) break;
    
    unvisited.delete(current);
    
    // Update neighbors
    for (const neighbor of graph[current]) {
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = current;
      }
    }
  }

  if (distances[endId] === Infinity) {
    return []; // No path exists
  }


  // Reconstruct path
  const path = [];
  let current = endId;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path;
}
