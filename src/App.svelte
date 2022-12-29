<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Account from './lib/Account.svelte'
  import Auth from './lib/Auth.svelte'
  import Browse from './lib/Browse.svelte';
  import Category from './lib/Category.svelte';

  let session: AuthSession
  let browse = true
  let add = false
  let addCat = false

  function addButton() {
    add = true
    browse = false
    addCat = false
  }

  function browseButton() {
    browse = true
    add = false
    addCat = false
  }

  function addCatButton() {
    addCat = true
    add = false
    browse = false
  }

</script>


<div >

  <div class="w-fit ml-auto mr-auto h-fit mt-4 mb-10">
    <button class={`btn mr-4 ${browse ? "btn-success" : ""}`} on:click={browseButton}>Browse</button>
    <button class={`btn mr-4 ${add ? "btn-success" : ""}`} on:click={addButton}>Add Word</button>
    <button class={`btn mr-4 ${addCat ? "btn-success" : ""}`} on:click={addCatButton}>Add Category</button>
  </div>
  
  
  {#if browse}
    <Browse />
  {/if}
  {#if add}
  <Account />
  {/if}
  {#if addCat}
  <Category />
  {/if}

</div>