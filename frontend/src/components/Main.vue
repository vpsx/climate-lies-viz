<template>
  <div id="container">
    <div id="title-container">
      <h1>Community Network Graph</h1>
      <p>This force-directed graph represents the relationships between users and their communities. The nodes represent users, while the edges represent connections between them. Nodes with the same color belong to the same community.</p>
    </div>
    <div id="graph-container">
      <svg id="graph"></svg>
      <div id="tooltip" style="opacity: 0; position: absolute; pointer-events: none; background-color: rgba(255, 255, 255, 0.7); padding: 5px; border-radius: 3px;"></div>
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
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 4em;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 2em;
  padding: 5px;
  border-radius: 3px;
  pointer-events: none;
  transition: opacity 0.2s;
}
</style>
