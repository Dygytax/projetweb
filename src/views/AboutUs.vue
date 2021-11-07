<template>
  <div>
    <div class="about-section">
      <h1>About Us Page</h1>
      <p>We are a team of students from Efrei Paris that work on this website.</p>
    </div>
    <h2 style="text-align:center">Our Team</h2>
    <div class="block">
      <div class="column">
        <div class="card">
          <img src="https://media-exp1.licdn.com/dms/image/C4D03AQG5WNNNDpTrSQ/profile-displayphoto-shrink_200_200/0/1626193201233?e=1642032000&v=beta&t=glxOi80V8omWUFhiJ-SaUaLENgGlffKcXt51F06sHEk" alt="Thomas" style="width:100%">
          <div class="container">
            <h2>Thomas Meedendorp</h2>
            <p class="title">Developer</p>
            <p>Efrei Student in M1 in the major Software Engineering.</p>
            <p>thomas.meedendorp@efrei.net</p>
            <p><button class="button"> <a href="https://fr.linkedin.com/in/thomas-meedendorp-06081216a">Contact</a></button></p>
          </div>
        </div>
      </div>
    <div class="column">
      <div class="card">
        <img src="https://media-exp1.licdn.com/dms/image/C5603AQFhYJqKK0gUyg/profile-displayphoto-shrink_200_200/0/1606065947307?e=1642032000&v=beta&t=LRmi9Vkeg6_gWqJhF_JqrK2wLky1sUm6wFRxu8CSWU0" alt="Clément" style="width:100%">
        <div class="container">
          <h2>Clément Sedlak</h2>
          <p class="title">Developer</p>
          <p>Efrei Student in M1 in the major IT for Finance.</p>
          <p>clement.sedlak@efrei.net</p>
          <p><button class="button"> <a href ="https://fr.linkedin.com/in/cl%C3%A9ment-sedlak-046682200">Contact</a></button></p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFe_kkvNyO-ag/profile-displayphoto-shrink_200_200/0/1629708296698?e=1642032000&v=beta&t=aHwuSQ9t2f48NbtuRKmgHFWoQRoHuNlBl7age2LPPHk" alt="Bastien" style="width:100%">
        <div class="container">
          <h2>Bastien Robert</h2>
          <p class="title">Developer</p>
          <p>Efrei Student in M1 in the major Digital Transformation.</p>
          <p>bastien01.robert@efrei.net</p>
          <p><button class="button"> <a href="https://fr.linkedin.com/in/bastien-robert-259aa117a?trk=people-guest_people_search-card">Contact</a></button></p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.block{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}
.column {
  float: left;
  width: 20%;
  margin-bottom: 16px;
  padding: 0 8px;
  min-width: 280px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
  padding-bottom: 10px;
  height: 350px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

a{
  color: white;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 90%;
}

.button:hover {
  background-color: #555;
}
</style>