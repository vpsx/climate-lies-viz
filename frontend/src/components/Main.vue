<template>
  <div id="container">
    <div id="title-container">
      <h1>Community Network Graph</h1>
      <p>This force-directed graph represents the relationships between users and their communities. The nodes represent users, while the edges represent connections between them. Nodes with the same color belong to the same community.</p>
    </div>
    <div id="graph-container">
      <svg id="graph"></svg>
      <div id="tooltip">
        <span>Node ID: <span id="node-id-value"></span></span>
        <br />
        <span>Community: <span id="community-value"></span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createForceDirectedGraph } from './forceDirectedGraph';

export default defineComponent({
  name: 'Main',
  mounted() {
    createForceDirectedGraph();
  },
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

#title-container {
  margin-bottom: 20px;
  text-align: center;
}

#graph-container {
  flex: 1;
  position: relative;
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
}

#graph {
  position: relative;
  width: 100%;
  height: 100%;
}

#tooltip {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2em;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#tooltip span {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
}
</style>
