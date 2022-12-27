<script lang="ts">
    import { onMount } from "svelte";
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import Avatar from './Avatar.svelte'
    import Test from './Test.svelte'
  
    export let session: AuthSession;
  
    let loading = false
    let username: string | null = null
    let avatarUrl: string | null = null
    let avatarUrl2: string | null = null
  
  
  
    const updateProfile = async () => {
      try {
        loading = true
        const res = await fetch('http://localhost:3000/word' , {
          method: "POST",
          headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
          body: JSON.stringify({
            title: username,
            audio: avatarUrl2,
            image: avatarUrl
          })
        })
        const json = await res.json()
        let result = JSON.stringify(json)
        console.log(result)
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  </script>
  
  <form on:submit|preventDefault={updateProfile} class="form-widget">
    <div>Email: {session.user.email}</div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" bind:value={username} />
    </div>
    
    <Avatar bind:url="{avatarUrl}" size="{150}"  />
    <Test bind:url="{avatarUrl2}" />
   
    <div>
      <button type="submit" class="button primary block" disabled={loading}>
        {loading ? 'Saving ...' : 'Update profile'}
      </button>
    </div>
    <button type="button" class="button block" on:click={() => supabase.auth.signOut()}>
      Sign Out
    </button>
  </form>