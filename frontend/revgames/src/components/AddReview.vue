<template>
  <div class="container">
    <h1 class="text-center">Nuova Recensione di {{loggedUsername}}</h1>
    <div class="form-group">
      <label for="rating">Rating:</label>
      <select class="form-control" v-model="review.rating">
        <option value="">Seleziona un rating</option>
        <option value="1">1 stella</option>
        <option value="2">2 stelle</option>
        <option value="3">3 stelle</option>
        <option value="4">4 stelle</option>
        <option value="5">5 stelle</option>
      </select>
    </div>

    <div class="form-group">
      <label for="content">Contenuto:</label>
      <textarea class="form-control" style="resize:none" rows="5" v-model="review.description" @input="limitCharacters"></textarea>
      <small class="text-muted">Caratteri: {{ characterCount }}/255</small>
    </div>

    <button class="btn btn-primary btn-block" type="submit" @click="submitReview" :disabled="isSubmitting">Invia Recensione</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

  </div>
</template>

<script>
import instance from '@/axios.js';
export default {
  data() {
    return {
      loggedUsername : null,
      loggedId : null,
      review: {
        rating: null,
        description: '',
      },
      characterCount: 0,
      isSubmitting: false,
      errorMessage: ''
    };
  },
  async created() {
    await this.setUser()
  },
  methods: {
    /**
     * Imposta userId e userID della persona loggata
     */
    async setUser() {
      await instance.get('/api/protected')  //assegnamento valore loggedUsername
          .then(response => {
            this.loggedUsername = response.data.username;

            return instance.get(`/users/getUserIdByUsername/${this.loggedUsername}`); //dopo aver identificato l'utente, ottengo l'id
          }).then(response2 => {
            this.loggedId = response2.data.userId;
          }).catch(error => {
            console.error(error);
          });
    },

    /**
     * Stabilisce un limite di caratteri che l'utente può inserire nel commento
     */
    limitCharacters() {
      if (this.review.description.length > 255) {
        this.review.description = this.review.description.slice(0, 255);
      }
      this.characterCount = this.review.description.length;
    },

    /**
     * Metodo relativo all'invio della recensione.
     *
     * @return {Promise<void>}
     */
    async submitReview() {
      this.isSubmitting = true;
      try {
        const parsedRating = parseInt(this.review.rating, 10);
        const parsedUserId = parseInt(this.loggedId, 10);
        const parsedGameId = parseInt(this.$route.params.idGame, 10);
        const response = await instance.post('/review/addReview',
            {
              rating: parsedRating,
              description: this.review.description,
              userId: parsedUserId,
              gameId: parsedGameId
            })
        this.review.rating = '';
        this.review.description = '';
        this.characterCount = 0;

        if (response.status === 201)
          this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.response.data.message;
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h1 {
  font-size: 24px;
  margin-bottom: 30px;
}

.btn-block {
  margin-top: 20px;
}
.error-message {
  color: red;
  margin-top: 20px;
}
</style>