<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { supabase } from '../supabaseClient'
  
    export let url: string
  
    let avatarUrl: string = null
    let uploading = false
    let files: FileList
  
    const dispatch = createEventDispatcher()
  
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
  
        if (error) {
          throw error
        }
  
        const url = URL.createObjectURL(data)
        avatarUrl = url
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error downloading image: ', error.message)
        }
      }
    }
  
    const uploadAvatar = async () => {
      try {
        uploading = true
  
        if (!files || files.length === 0) {
          throw new Error('You must select an image to upload.')
        }
  
        const file = files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${Math.random()}.${fileExt}`
  
        let { error } = await supabase.storage.from('avatars').upload(filePath, file)
  
        if (error) {
          throw error
        }
  
        url = filePath
        dispatch('upload')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        uploading = false
      }
    }
  
    $: if (url) downloadImage(url)
  </script>
  <div class="container m-6">
    <h1 class="font-bold text-2xl mb-2">Add image</h1>

    <div class="form-control w-full max-w-xs">
 
     
     <input
           type="file"
           id="single"
           class="file-input file-input-borderedmax-w-xs file-input-primary"
           accept="image/*"
           bind:files
           on:change="{uploadAvatar}"
           disabled="{uploading}"
         />
    
   </div>
  </div>
  

 
        
     