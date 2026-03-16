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
template{
  background-color: #00153e;
}

.book1{
   border-radius: 5px;
   position: relative;
   display: inline-block;
   overflow: hidden;
   background: white;
   box-shadow: 0 4px 12px rgba(0,0,0.08);
   transition: transform 0 .25s ease, box-shadow 0.25s ease;
}
.hidden{
  position: absolute;
  bottom: 50%;
  right: -100%;
  transform: translateY(100%);
  background: rgba(0,0,0,0.75);
  color: white;
  padding: 6px 14px;
  opacity: 0;
  border-radius: 20px;
  transition: transform 0.43s ease, opacity 0.35s ease;         
  z-index: 2;
}
.book1:hover .hidden{
  right: 0;
  transform: translateX(-10px);
  opacity: 1;
}

.book1 img{
     display: block;
  border-radius: 5px;
  width: 100%;
  transition: transform 0.3s ease;
}

.book1:hover img{
  transform: scale(1.08);
  box-shadow: 0 10px 25px rgba(0,0,0, 0.15);
}

.book1:hover{
  transform: translateY(-10px);
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
   margin: 20px auto;
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