/**
 * This file contains the code to create a force-directed graph using D3.js.
 * It visualizes a network of nodes connected by edges, where nodes represent
 * users and edges represent relationships between users. Nodes are colored
 * based on their community membership. The graph is interactive, allowing users
 * to drag nodes and view community information on hover.
 */

import * as d3 from "d3";
import {
  BaseType,
  Selection,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3";
import edgeListDataJson from "../assets/edge_list.json";
import nodeCommunityDataJson from "../assets/node_community.json";

interface Edge {
  source: SimulationLinkDatum<GraphNode>["source"];
  target: SimulationLinkDatum<GraphNode>["target"];
  value: number;
}

interface GraphNode extends SimulationNodeDatum {
  id: string;
  community: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

/**
 * Creates and renders a force-directed graph using the given edge and node data.
 */
export async function createForceDirectedGraph() {
  // Map edge list data from JSON to Edge objects
  const edgeListData: Edge[] = edgeListDataJson.map(
    (edge: any): Edge => ({
      source: edge.user,
      target: edge.following,
      value: 1,
    })
  );

  // Map node community data from JSON to GraphNode objects
  const nodeCommunityData: GraphNode[] = nodeCommunityDataJson.map(
    (node: any): GraphNode => ({
      ...node,
      id: node.node,
    })
  );

  if (!edgeListData || !nodeCommunityData) {
    console.error("Error: edgeListData or nodeCommunityData is undefined");
    return;
  }

  const nodeCommunityMap = new Map(
    nodeCommunityData.map((node: GraphNode) => [node.id, node.community])
  );
  const svg = d3.select("#graph");
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const simulation = d3
    .forceSimulation(nodeCommunityData)
    .force(
      "link",
      d3
        .forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(edgeListData)
        .id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force(
      "center",
      d3.forceCenter(
        parseFloat(svg.style("width")) / 2,
        parseFloat(svg.style("height")) / 2
      )
    );

  const link = svg
    .append("g")
    .selectAll("line")
    .data(edgeListData)
    .join("line")
    .attr("stroke", "#fff")
    .attr("stroke-opacity", 1)
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodeCommunityData)
    .join("circle")
    .attr("r", 5)
    .attr("fill", (d: GraphNode) => color(nodeCommunityMap.get(d.id) ?? ""))
    .call(
      initDrag as unknown as (
        selection: Selection<
          BaseType | SVGCircleElement,
          GraphNode,
          BaseType,
          unknown
        >
      ) => void
    )
    .on("click", (event: MouseEvent, d: GraphNode) => showTooltip(event, d));

  initDrag(node);

  simulation.on("tick", () => {
    link
      .attr("x1", (d: Edge): number => (isNode(d.source) ? d.source.x! : 0))
      .attr("y1", (d: Edge): number => (isNode(d.source) ? d.source.y! : 0))
      .attr("x2", (d: Edge): number => (isNode(d.target) ? d.target.x! : 0))
      .attr("y2", (d: Edge): number => (isNode(d.target) ? d.target.y! : 0));

    node.attr("cx", (d: GraphNode) => d.x!).attr("cy", (d: GraphNode) => d.y!);
  });

  /**
   * Initiates dragging on the given node.
   *
   * inputs:
   * event (d3.D3DragEvent) - The drag event.
   * d (GraphNode) - The node being dragged.
   */
  function dragstart(
    event: d3.D3DragEvent<Element, unknown, unknown>,
    d: GraphNode
  ) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  /**
   * Updates the position of the dragged node.
   *
   * inputs:
   * event (d3.D3DragEvent) - The drag event.
   * d (GraphNode) - The node being dragged.
   */
  function dragged(
    event: d3.D3DragEvent<Element, unknown, unknown>,
    d: GraphNode
  ) {
    d.fx = event.x;
    d.fy = event.y;
  }

  /**
   * Ends dragging on the given node.
   *
   * inputs:
   * event (d3.D3DragEvent) - The drag event.
   * d (GraphNode) - The node being dragged.
   */
  function dragend(
    event: d3.D3DragEvent<Element, unknown, unknown>,
    d: GraphNode
  ) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  /**
   * Initializes drag behavior for the given selection of nodes.
   *
   * inputs:
   * selection (d3.Selection) - A D3 selection of nodes to enable dragging on.
   */
  function initDrag(
    selection: d3.Selection<
      d3.BaseType | SVGCircleElement,
      GraphNode,
      BaseType,
      unknown
    >
  ) {
    (selection as any).call(
      d3
        .drag()
        .on(
          "start",
          dragstart as (this: Element, event: any, d: unknown) => void
        )
        .on("drag", dragged as (this: Element, event: any, d: unknown) => void)
        .on("end", dragend as (this: Element, event: any, d: unknown) => void)
    );
  }

  /**
   * Checks if the given object is a GraphNode.
   *
   * inputs:
   * obj (any) - The object to check.
   *
   * outputs:
   * (boolean) - True if the object is a GraphNode, false otherwise.
   */
  function isNode(obj: any): obj is GraphNode {
    return (
      obj && typeof obj.id === "string" && typeof obj.community === "string"
    );
  }

  /**
   * Displays a tooltip with community information at the cursor position.
   *
   * inputs:
   * event (MouseEvent) - The mouse event that triggered the tooltip.
   * d (GraphNode) - The node for which to show the tooltip.
   */
  function showTooltip(event: MouseEvent, d: GraphNode) {
    const communityValue = document.getElementById("community-value");
    const nodeIdValue = document.getElementById("node-id-value");
    if (!communityValue || !nodeIdValue) return;

    // If the current community value and node ID are displayed, hide them. Otherwise, show the new values.
    if (
      communityValue.textContent === d.community &&
      nodeIdValue.textContent === d.id
    ) {
      communityValue.textContent = "";
      nodeIdValue.textContent = "";
    } else {
      communityValue.textContent = d.community;
      nodeIdValue.textContent = d.id;
    }
  }
}
