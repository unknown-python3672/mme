<Navbar />
<template>
   <div class="parent">
 <h1 class="welcome">Welcome to MME</h1>
 <p>Purchase serveral textbook easily, fast and online at the comfort of your home </p>
</div>
 <div class="group-slide">
    <div class="row"><img src="/yyy.jpg" alt="img1"> <img src="/yyy.jpg" alt="img1"> <img  src="/yyy.jpg" alt="img2"> <img src="/yyy.jpg" alt="img1"> </div>
   <div class="row"><img src="/yyy.jpg" alt="img1"> <img src="/yyy.jpg" alt="img1"> <img  src="/yyy.jpg" alt="img2"> <img src="/yyy.jpg" alt="img1"> </div>
 </div>
</template>

<script> 
import { ref } from 'vue'
</script>

<style scoped>
.parent{
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   margin: 0;
   padding: 10px;
   translate: transforrm(-50%, -50%);
}

h1{
   padding: 10px;
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
   max-width: 100%
}
</style>