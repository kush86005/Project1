function findShortestPath() {
  const edgesInput = document.getElementById("edges").value;
  const start = document.getElementById("start").value.trim();
  const end = document.getElementById("end").value.trim();
  const resultDiv = document.getElementById("result");

  try {
    // Parse edges
    const edges = edgesInput.split(",").map(e => {
      const [nodes, weight] = e.split("=");
      const [a, b] = nodes.split("-");
      return { a: a.trim(), b: b.trim(), w: parseFloat(weight) };
    });

    // Build graph
    const graph = {};
    edges.forEach(({ a, b, w }) => {
      if (!graph[a]) graph[a] = [];
      if (!graph[b]) graph[b] = [];
      graph[a].push({ node: b, weight: w });
      graph[b].push({ node: a, weight: w });
    });

    // Dijkstra’s algorithm
    const dist = {}, visited = {};
    Object.keys(graph).forEach(v => dist[v] = Infinity);
    dist[start] = 0;

    while (true) {
      let u = null;
      for (const node in dist)
        if (!visited[node] && (u === null || dist[node] < dist[u]))
          u = node;
      if (u === null || u === end) break;

      visited[u] = true;
      graph[u].forEach(({ node, weight }) => {
        if (dist[u] + weight < dist[node])
          dist[node] = dist[u] + weight;
      });
    }

    const distance = dist[end];
    resultDiv.innerText = distance === Infinity
      ? "No path found!"
      : `Shortest distance from ${start} → ${end}: ${distance}`;
  } catch {
    resultDiv.innerText = "Invalid input format!";
  }
}
