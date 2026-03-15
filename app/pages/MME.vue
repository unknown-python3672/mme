<Navbar />
<template>
  <div>
    <div class="parent">
      <h1 class="welcome">Welcome to MME</h1>
      <p>Purchase several textbooks easily, fast, and online from the comfort of your home.</p>
    </div>
    <div class="group-slide">
      <div class="row">
        <div class="book1">
          <p class="hidden">physics</p>
          <img src="/yyy.jpg" alt="physics" />
        </div>
          <div class="book1">
          <p class="hidden">GST11</p>
          <img src="/yyy.jpg" alt="GST11" />
        </div>        
        <div class="book1">
          <p class="hidden">chemistry</p>
          <img src="/yyy.jpg" alt="chemistry" />
        </div>
          <div class="book1">
          <p class="hidden">MATH103</p>
          <img src="/yyy.jpg" alt="MATH103" />
        </div>
      </div>
      
      <div class="row">
         <div class="book1">
          <p class="hidden">math</p>
          <img src="/yyy.jpg" alt="math" />
        </div>
          <div class="book1">
          <p class="hidden">physics</p>
          <img src="/yyy.jpg" alt="physics" />
        </div>
        <div class="book1">
          <p class="hidden">computer science</p>
          <img src="/yyy.jpg" alt="computer science" />
        </div>
        <div class="book1">
          <p class="hidden">english</p>
          <img src="/yyy.jpg" alt="english" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No state needed currently.
</script>

<style scoped>
.book1{
   border-radius: 5px;
   position: relative;
   display: inline-block;
   overflow: hidden;
}
.hidden{
  position: absolute;
  bottom: 50%;
  right: -100%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 10px 20px;
  opacity: 0;
  transition: all 0.4s ease;         
  z-index: 2;
}
.book1:hover .hidden{
  right: 0;
  opacity: 1;
}

.book1 img{
     display: block;
  border-radius: 5px;
  max-width: 100%;
  transition: transform 0.3s ease;
}

.book1:hover img{
  transform: scale(1.05);
}


.parent{
   position: relative;
   text-align: center;
   margin: 7px;
   transform: translate(0, -20%);
}

h1{
   padding-top: 5px;
   color: rgb(2, 142, 2);
}
.row{
   margin: 20px;
   padding-top: 30px;
   align-items:  center;
   justify-content: space-evenly;
   gap: 5px;
   display: flex;
}

img{
   border-radius: 5px;
   max-width: 100%;
}
</style>