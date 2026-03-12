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
    background-color: rgba(0, 0, 0, 0.1);
}

input::placeholder{
    color: rgba(0, 0, 0, 0.954);

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