<script lang="ts">
    import ImageUpload from "./ImageUpload.svelte";
  import Category from "./Category.svelte";
    import AudioUpload from "./AudioUpload.svelte";
    import { supabase } from "../supabaseClient";
  import { extractFileNameFromUrl } from "../helpers";
  
  
  
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
  
  
      let imageUrl: string
      let audioUrl: string
  
      
  
      async function update() {
        await supabase.storage.from('avatars').remove([extractFileNameFromUrl(category.audio), extractFileNameFromUrl(category.thumbnail)])
        console.log(extractFileNameFromUrl(category.thumbnail))
        console.log(extractFileNameFromUrl(category.audio))

        const res = await fetch(`https://speak-api.fly.dev/category/${category.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  name: category.name,
                  audio: `https://wososvlspzslampucduh.supabase.co/storage/v1/object/public/avatars/${audioUrl}`,
                  thumbnail: `https://wososvlspzslampucduh.supabase.co/storage/v1/object/public/avatars/${imageUrl}`
              })
          })

          
  
          const data = await res.json()
          console.log(data)
          location.reload()
      }
  
      async function deleteFunction() {
        await supabase.storage.from('avatars').remove([extractFileNameFromUrl(category.audio), extractFileNameFromUrl(category.thumbnail)])

          const res = await fetch(`https://speak-api.fly.dev/category/${category.id}`, {
              method: "DELETE"
          })
  
          const data = await res.json()
          console.log(data)
          location.reload()
      }

  
  
  
  </script>
  <label for={category.name} class="btn btn-warning">Edit category</label>
  
  <input type="checkbox" id={category.name} class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Updating "{category.name}"</h3>
      <ImageUpload bind:url="{imageUrl}"  />
      <AudioUpload bind:url="{audioUrl}" />
      <div class="modal-action">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for={category.name} class="btn btn-success" on:click={update}>Update</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for={category.name} class="btn btn-warning" on:click={deleteFunction}>Delete</label>
        <label for={category.name} class="btn">Close</label>
      </div>
    </div>
  </div>
  