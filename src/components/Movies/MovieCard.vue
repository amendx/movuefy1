<template>
  <div id="app">
  <div class="card-row">
    <div class="card">
      
      <img class="card-image" src="https://placeimg.com/640/480/nature">
      
      <div class="card-footer">
        <p class="card-text">RECIPE</p>
        <h3 class="card-title">Title</h3>
        <p class="card-text">by 
          <span class="card-author">Author</span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
body {
  background-color: #E1E7E7;
}
.card {
  position: relative;
  background-color: #FFFFFF;
  height: 370px;
  width: 240px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
}
.card-image {
  /* center horizontally overflown image */
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;

  height: 220px;
  min-width: 100%;
}
.card-row {
  display: flex;
  justify-content: center;
  align-items: center;  
  min-width: 780px;
  width: 100%;
  height: 500px;
}
.card-footer {
  position: absolute;
  bottom: 0;
  height: 130px;
  padding: 10px 15px;
  font-family: Helvetica;
}
.card-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
}
.card-title {
  font-family: Serif;
}
.card-author {
  font-size: 14px;
  color: #BAB096;
}
</style>

