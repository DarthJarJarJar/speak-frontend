<script lang="ts">
  import { onMount } from "svelte";


    interface Word {
        title: string,
        audio: string,
        image: string
    }

    let words: Word[]

    onMount(async() => {
        const res = await fetch('http://localhost:3000', {
            method: "GET",
        })

        const data: Word[] = await res.json()
        words = data
    })

</script>
{#if words}
{#each words as word}
    <img src={word.image} alt={word.title} class="w-20">
    <p>{word.title}</p>
{/each}
{/if}