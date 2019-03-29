<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-text class="d-flex">
              <div class="movie-card">
                <div class="container">
                  <v-flex xs12>
                    <a href="#">
                      <!-- :src="`https://image.tmdb.org/t/p/original${this.currentMovie.poster_path}`" -->
                      <img
                        v-if="this.currentMovie.poster_path"
                        alt="cover"
                        :src="`https://image.tmdb.org/t/p/original${this.currentMovie.poster_path}`"
                        class="cover"
                      >
                    </a>
                  </v-flex>

                  <div class="hero" v-if="this.currentMovie.backdrop_path">
                    <v-flex class="details">
                      <v-layout row wrap class="hidden-sm-only">
                        <v-flex xs12 md12 lg12 class="title1">
                          {{this.currentMovie.title}}
                          <span>PG-13</span>
                        </v-flex>

                        <v-flex xs12 md12 class="title2">{{this.currentMovie.tagline}}</v-flex>
                        <v-flex xs12 md12 lg6>
                          <v-rating v-model="currentMovie.vote_average"></v-rating>
                          <span class="likes">
                            <div>{{voteCounted}}</div>likes
                          </span>
                        </v-flex>
                        <!-- <v-flex xs9>
                      
                        </v-flex>-->
                      </v-layout>
                      <!-- </div> -->
                    </v-flex>
                  </div>

                  <div class="description">
                    <v-layout class="hidden-sm-and-up" justify-center row wrap>
                      <v-flex xs12 md12 lg12 class="title3">{{this.currentMovie.title}}</v-flex>

                      <v-flex xs12 md12 class="title2">{{this.currentMovie.tagline}}</v-flex>
                      <v-flex xs12 md12 lg12>
                        <v-rating v-model="currentMovie.vote_average"></v-rating>
                        <span class="likes">{{currentMovie.vote_count}} likes</span>
                      </v-flex>
                    </v-layout>
                    <v-flex xs12 md8 offset-md3>
                      <v-card-text class="v-description">
                        <p>{{this.currentMovie.overview}}</p>

                        <!-- end avatars -->
                      </v-card-text>
                    </v-flex>
                  </div>

                  <!-- end description -->
                </div>
                <!-- </v-container> -->
                <!-- end container -->
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- end movie-card -->
    </v-container>
    <v-container>
      <v-card>
        <v-toolbar dark color="dark">
          <v-toolbar-title>Search Movies</v-toolbar-title>
        </v-toolbar>
        <v-card-text>Want to add this movie to your favorite's list?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <app-movie-favorite-dialog :movieId="this.currentMovie.id"></app-movie-favorite-dialog>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";

const MoviesRepository = RepositoryAbstractFactory.get("movies");
export default {
  data() {
    return {
      currentMovie: {}
    };
  },
  async created() {
    this.fetch();
  },
  computed: {
    voteCounted: function() {
      return this.currentMovie.vote_count;
    },
    movieId: function() {
      return this.$route.params.id;
    }
  },
  methods: {
    async fetch() {
      const { data } = await MoviesRepository.getMovie(this.$route.params.id);
      this.currentMovie = data;
    },
    async getPosterPath(path) {
      const { data } = await MoviesRepository.getImagePath(path);
    }
  },

  watch: {
    $route(to, from) {}
  }
};
</script>


<style lang="sass" scoped>

a  
  text-decoration: none;
  color: #5c7fb8;
 

a:hover  
  text-decoration: underline;
 

.movie-card  
  font: 14px/22px "Lato", Arial, sans-serif;
  color: #a9a8a3;
 

.container  
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
 

.hero  
  max-height: 342px;
  margin: 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
 

.hero:before  
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  background: black;
  // background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_bg.jpg");
  z-index: -1;

  transform: skewY(-2.2deg);
  transform-origin: 0 0;

  //chrome antialias fix
  -webkit-backface-visibility: hidden;
 

.cover  
  position: absolute;
  top: 160px;
  left: 65px;
  z-index: 2;
  max-height: 50%;
  max-width: 50%;
 

.details  
    padding: 190px 0 0 280px;

.title1  
  color: white;
  font-size: 44px;
  margin-bottom: 13px;
  position: relative;

.title3
  color: black;
  font-size: 35px;
  margin-bottom: 13px;
  padding-top: 30px;
  position: relative;

  span  
    position: absolute;
    top: 3px;
    margin-left: 12px;
    background: #c4af3d;
    border-radius: 5px;
    color: #544c21;
    font-size: 14px;
    padding: 0px 4px;
    
   

.title2  
  color: #c7c1ba;
  font-size: 23px;
  font-weight: 300;
  margin-bottom: 15px;
  

.likes  
  margin-left: 24px;
  padding: 10px 0;
  font-size: 1.2em;

.likes:before 
  content: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/icon_like.png");
  position: relative;
  top: 2px;
  padding-right: 7px;



.description  
  bottom: 0px;
  // height: 200px;
  font-size: 16px;
  line-height: 26px;
  color: #b1b0ac;
 

.column1  
  padding-left: 65px;
  padding-top: 190px;
  width: 220px;
  float: left;
  text-align: center;

.v-description
  margin: auto;
  padding: 50px 0;
 

.tag  
  background: white;
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 14px;
  margin-right: 4px;
  line-height: 35px;
  cursor: pointer;
 

.tag:hover  
  background: #ddd;
 


.avatars  
  margin-top: 23px;

  img  
    cursor: pointer;
   

  img:hover  
    opacity: 0.6;
   

  a:hover  
    text-decoration: none;
   
 


fieldset,
label  
  margin: 0;
  padding: 0;
 


.rating  
  border: none;
  float: left;
 

.rating > input  
  display: none;
 
.rating > label:before  
  margin: 5px;
  margin-top: 0;
  font-size: 1.2em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
 

.rating > .half:before  
  content: "\f089";
  position: absolute;
 

.rating > label  
  color: #ddd;
  float: right;
 

/***** CSS Magic to Highlight Stars on Hover *****/

.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label  
  color: #ffd700;
  /* hover previous stars in list */

.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label  
  color: #ffed85;
 

//tooltip stuff via: https://codepen.io/peiche/pen/JaftA

a[data-tooltip]  
  position: relative;
 
a[data-tooltip]::before,
a[data-tooltip]::after  
  position: absolute;
  display: none;
  opacity: 0.85;
 
a[data-tooltip]::before  
  /*
   * using data-tooltip instead of title so we 
   * don't have the real tooltip overlapping
   */
  content: attr(data-tooltip);
  background: #000;
  color: #fff;
  font-size: 13px;
  padding: 5px;
  border-radius: 5px;
  /* we don't want the text to wrap */
  white-space: nowrap;
  text-decoration: none;
 
a[data-tooltip]::after  
  width: 0;
  height: 0;
  border: 6px solid transparent;
  content: "";
 

a[data-tooltip]:hover::before,
a[data-tooltip]:hover::after  
  display: block;
 

/** positioning **/

/* top tooltip */
a[data-tooltip][data-placement="top"]::before  
  bottom: 100%;
  left: 0;
  margin-bottom: 40px;
 
a[data-tooltip][data-placement="top"]::after  
  border-top-color: #000;
  border-bottom: none;
  bottom: 50px;
  left: 20px;
  margin-bottom: 4px;
 
</style>


