<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4, footer">
      <p class="col-md-4 mb-0 text-muted">&copy; 2023 RevGames, Inc</p>

      <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      </a>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item"><a ><router-link to="/" class="nav-link px-2 text-muted">Home</router-link></a></li>
<!--        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>-->
<!--        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>-->
<!--        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>-->
          <li class="nav-item"><a><router-link to="/about" class="nav-link px-2 text-muted">About</router-link></a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ComponentFooter"
}
</script>

<style>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #333;
  color: #333;
  text-align: center;
  padding: 20px;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Altezza del footer */
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}
</style>