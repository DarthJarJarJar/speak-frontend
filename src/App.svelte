<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Account from './lib/Account.svelte'
  import Auth from './lib/Auth.svelte'
  import Browse from './lib/Browse.svelte';

  let session: AuthSession
  let browse = true
  let add = false

  function addButton() {
    add = true
    browse = false
  }

  function browseButton() {
    browse = true
    add = false
  }

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })
</script>


<div >

  <div class="w-fit ml-auto mr-auto h-fit mt-4 mb-10">
    <button class="btn mr-4" on:click={browseButton}>Browse</button>
    <button class="btn ml-4" on:click={addButton}>Add</button>
  </div>
  
  {#if !session}
  <Auth />
  {:else}
  {#if browse}
    <Browse />
  {/if}
  {#if add}
  <Account {session} />
  {/if}
  {/if}
</div>