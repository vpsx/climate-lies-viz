import { useEffect } from "react";
import { createForceDirectedGraph } from "./ForceDirectedGraph";
import "./GraphVisualization.css";

export default function GraphVisualization() {
  useEffect(() => {
    createForceDirectedGraph();
  }, []);

  return (
    <div id="container">
      <div id="title-container">
        <h1>Community Network Graph</h1>
        <p>
          This force-directed graph represents the relationships between users
          and their communities. The nodes represent users, while the edges
          represent connections between them. Nodes with the same color belong
          to the same community.
        </p>
      </div>
      <div id="graph-container">
        <svg id="graph"></svg>
        <div id="tooltip">
          <span>
            Node ID: <span id="node-id-value"></span>
          </span>
          <br />
          <span>
            Community: <span id="community-value"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
