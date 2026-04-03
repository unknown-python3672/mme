<template>      
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
<style>
h1{
    color: rgba(0, 0, 0, 0.954);
    font-size: 24px;
}

.login-page{
    width: 60%;
    height: 75%;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.368);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

input{
    width: 90%;
    padding: 16px 20px;
    margin: 8px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.954);
    font-size: 16px;
    background-color: rgba(151, 146, 146, 0.1);
}

input::placeholder{
    color: rgba(84, 80, 80, 0.922); 

}
.acc{
    color: Black;
    position: absolute;
    margin-top: 10px;
    text-decoration: none;
    cursor: pointer;
    left: 75%; 
    margin: 5px;
    padding: 0px;

}

.acc:hover{
    color: rgba(0, 0, 0, 0.954);
    text-decoration: underline;
}
button{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    margin: 8px;
    border-radius: 20px;
    border: none;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.954);
    color: white;
    cursor: pointer;
}
/*MME STYLYING BEGINNS HERE*/

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

.but1{
  position: relative;
  left: 50%;
  width: 15%;
  right: 50px;
  display: flex;
  margin-top: 45px;
  padding: 15px;
  border-radius: 20px;
  color: rgb(51, 164, 51);
}

@media (max-width: 600px) {
    .login-page {
        width: 90%;
    }
}
@media (max-width: 400px) {
    input {
        width: 60%;
    }
}

</style>