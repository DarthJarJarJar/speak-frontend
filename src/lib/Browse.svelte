<script lang="ts">
  import { onMount } from "svelte";
  import Category from "./Category.svelte";
  import CategoryCard from "./CategoryCard.svelte";
  import Word from "./Word.svelte";


    interface Word {
        id: number
        title: string,
        audio: string,
        image: string
    }

    interface Category {
        id: number,
        name: string,
        audio: string,
        thumbnail: string,
        words: Word[]
    }

    let words: Word[]
    let categories: Category[]
    let audio;


    onMount(async() => {
        const res = await fetch('https://speak-api.fly.dev/category', {
            method: "GET",
        })

        const data: Category[] = await res.json()
        categories = data
    })

</script>
<div class="gr">
    {#if categories}
    {#each categories as category (category)}
        <CategoryCard {category} />
    {/each}
    {/if}
    
</div>

<style>
    /* .gr {
        display: grid;
		grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
		grid-column-gap: 0.3rem;
		grid-row-gap: 0.3rem;
		height: 20vh;
    } */
</style>