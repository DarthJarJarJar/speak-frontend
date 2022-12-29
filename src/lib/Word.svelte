<script lang="ts">
    import AudioUpload from './AudioUpload.svelte'
    import ImageUpload from './ImageUpload.svelte'
  import WordActions from './WordActions.svelte';

     interface Word {
        id: number
        title: string,
        audio: string,
        image: string
    }

    export let word: Word

    
</script>

<div class="card w-48 bg-base-100 shadow-xl m-6">
    <figure><img src={word.image} alt={word.title} /></figure> <!-- till here word is correct   -->
    <div class="card-body">
      <h2 class="card-title">{word.title}</h2>
      <div class="card-actions justify-end">
           <WordActions {word} />   <!-- wrong info passed down here   -->
      </div>
    </div>
  </div>