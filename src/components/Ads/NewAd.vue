<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
          <v-form
            ref="form"
            v-model="valid"
            validation
          >
            <v-text-field
              label="Ad title"
              name="title"
              type="text"
              v-model="title"
              required
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>

            <v-textarea
              label="Ad description"
              name="description"
              type="text"
              v-model="description"
              :rules="[v => !!v || 'Description is required']"
            ></v-textarea>

              <v-file-input
                class="mt-5"
                label="Upload image"
                filled
                prepend-icon="mdi-camera"
                accept="image/*"
                @change="onFileChange"
              ></v-file-input>

              <v-row align="center" justify="center">
                <v-img
                  v-if="imageSrc"
                  :src="imageSrc"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="250"
                  max-height="100"
                ></v-img>
              </v-row>

              <v-switch
                color="primary"
                v-model="promo"
                label="Ad to promo?"
              ></v-switch>

              <v-row align="center" justify="center">
                <v-spacer></v-spacer>
                <v-btn
                :loading="loading"
                :disabled="!valid || loading"
                  class="primary"
                  @click="createAd"
                >Create ad</v-btn>
              </v-row>
          </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        // logic
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },

    onFileChange (file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
