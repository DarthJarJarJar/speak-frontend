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
    <!-- <div>Email: {session.user.email}</div> -->
    <div class="m-6">
      <input type="text" placeholder="Word" class="input input-bordered input-primary w-full max-w-xs" bind:value={username}  />

    </div>
    
    <Avatar bind:url="{avatarUrl}"  />
    <Test bind:url="{avatarUrl2}" />

    <div class="container m-6">
      <div>
        <button type="submit" class="btn primary block mb-2" disabled={loading}>
          {loading ? 'Saving ...' : 'Update profile'}
        </button>
      </div>
      <button type="button" class="btn block" on:click={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
   
    
  </form>