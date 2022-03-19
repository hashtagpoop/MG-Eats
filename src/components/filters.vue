<script setup>
</script>

<template>
  <div>
    <ul class="filter-list">
    <li class="filter">
        <p class="filter-name">Clear</p>
        <span class="filter-close">&#9866;</span>
    </li>
    <li v-for="filter in filters" class="filter">
        <p class="filter-name">[[filter]]</p>
        <span class="filter-close">&#10006;</span>
    </li>
    <li class="filter">
        <p class="filter-name">Add</p>
        <span class="filter-close">&#10010;</span>
    </li>
    </ul>   
  </div> 
</template>

<style scoped>
.filter-list {
  margin: 20px 0 35px 0;
  padding-left: 0;
  display: flex;
  column-gap: 20px;
  overflow: scroll;
}

.filter-list .filter {
  list-style-type: none;
  border: 1px solid black;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
}

.filter-list .filter p {
  margin: 0;
  align-self: center;
}

.filter-list .filter-close {
  margin-left: 10px;
  cursor: pointer;
  font-weight: bolder;
}
</style>