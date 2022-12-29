<script lang="ts">
  import Category from "./Category.svelte";
  import CategoryActions from "./CategoryActions.svelte";
  import WordActions from "./WordActions.svelte"


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

    export let category: Category

</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-3/4 ml-auto mr-auto mt-4 mb-4">
    <div class="collapse-title text-xl font-medium">
      {category.name}
    </div>
    <div class="collapse-content"> 
        <div class="gr">
            {#each category.words as word}
            <WordActions {word} />
        {/each}
        </div>
     
    </div>
  </div> -->

  <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-3/4 ml-auto mr-auto mt-4 mb-4 ">
    <input type="checkbox" /> 
    <div class="collapse-title text-xl font-medium ">
        <p class="font-extrabold text-xl">{category.name}</p>
        <p class="font-bold text-sm">{"ID: "+category.id}</p>
    </div>
    <div class="collapse-content"> 
        <div class="gr">
            {#each category.words as word}
            <WordActions {word} />
            
        {/each}
        <CategoryActions {category} />
        </div>
    </div>
  </div>

  <style>
     .gr {
        display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-column-gap: 0.3rem;
		grid-row-gap: 0.3rem;
	
    } 
</style>