<template>
  <div class="container pt-5">
    <h1 class="display-1 text-center bold">URL shortener</h1>
    <p class="lead">Are you looking for a way to shorten your URLs and track your clicks? Look no further than our free
      URL shortener! With our service, you can easily create short, memorable links that will drive traffic to your
      website or blog. You can also track how many people have clicked on your links, so you can see what content is most
      popular.</p>
    <form>
      <div class="row">
        <label class="col-9" for="long-url">
          <span>Long URL: </span>
          <input type="url" id="long-url" v-model="longURL" />
        </label>

        <button @click="shortenURL" type="button" class="col-3 btn btn-primary">
          Shorten
        </button>
      </div>

      <Alert text="URL pasted from clipboard" :show="shouldShowPastedAlert" @dismiss="shouldShowPastedAlert = false" />
      <Alert text="URL shortened!" :show="shouldShowShortenedAlert" @dismiss="shouldShowShortenedAlert = false" />

      <div class="row">
        <label class="col-9" for="shortened-url">
          <span>Short URL: </span>
          <input type="url" id="shortened-url" readonly v-model="shortenedURL" />
        </label>

        <button @click="copyURLToClipboard" type="button" class="col-3 btn btn-primary">Copy</button>
      </div>

      <Alert text="Copied to clipboard" :show="shouldShowCopiedAlert" @dismiss="shouldShowCopiedAlert = false" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Alert from './components/Alert.vue'
import urlService from './services/URLService';

export default defineComponent({
  components: {Alert},

  data() {
    return {
      longURL: "",
      shortenedURL: "",

      shouldShowShortenedAlert: false,
      shouldShowPastedAlert: false,
      shouldShowCopiedAlert: false,
    }
  },

  methods: {
    async shortenURL() {
      this.shortenedURL = await urlService.getShortURL(this.longURL)
      this.shouldShowShortenedAlert = true;
      this.shouldShowPastedAlert = false;
    },

    async getURLFromClipboard() {
      let clipboardContent = await navigator.clipboard.readText()

      if (clipboardContent != "") {
        this.longURL = clipboardContent;
        this.shouldShowPastedAlert = true;
        this.shouldShowShortenedAlert = false;
      }
    },

    async copyURLToClipboard() {
      navigator.clipboard.writeText(this.shortenedURL);
      this.shouldShowCopiedAlert = true
    }
  },

  mounted() {
    this.getURLFromClipboard()
  }
})
</script>