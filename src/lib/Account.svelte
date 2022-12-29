<script lang="ts">
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import ImageUpload from './ImageUpload.svelte'
    import AudioUpload from './AudioUpload.svelte'
  
  
    let loading = false
    let username: string | null = null
    let avatarUrl: string | null = null
    let avatarUrl2: string | null = null
    let category: string | null = null
  
  
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
            audio: `https://wososvlspzslampucduh.supabase.co/storage/v1/object/public/avatars/${avatarUrl2}`,
            image: `https://wososvlspzslampucduh.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`,
            catID: +category
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
  <div class="navbar text-primary-content">
    <h1 class="btn btn-ghost normal-case text-4xl ml-auto mr-auto">Add a Word</h1>
  </div>
  
  <form on:submit|preventDefault={updateProfile} class="form-widget w-fit ml-auto mr-auto mt-8">
    <!-- <div>Email: {session.user.email}</div> -->
    <div class="m-6">
      <input type="text" placeholder="Enter word" class="input input-bordered input-primary max-w-xs w-full" bind:value={username}  />
      
    </div>
    <div class="m-6">
      <input type="text" placeholder="Enter category ID" class="input input-bordered input-primary max-w-xs w-full" bind:value={category}  />
      
    </div>
    
    <ImageUpload bind:url="{avatarUrl}"  />
    <AudioUpload bind:url="{avatarUrl2}" />

    <div class="container m-6">
      <div>
        <button type="submit" class="btn primary block mb-2" disabled={loading}>
          {loading ? 'Adding ...' : 'Add Word'}
        </button>
      </div>
      <button type="button" class="btn block" on:click={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
   
    
  </form>