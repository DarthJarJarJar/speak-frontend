<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import Test from "./Test.svelte";



    interface Word {
        id: number,
        title: string,
        audio: string,
        image: string
    }

    export let word: Word
    console.log(word)


    let imageUrl: string
    let audioUrl: string

    

    async function update() {
        const res = await fetch(`http://localhost:3000/word/${word.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: word.title,
                audio: `https://wososvlspzslampucduh.supabase.co/storage/v1/object/public/avatars/${audioUrl}`,
                image: `https://wososvlspzslampucduh.supabase.co/storage/v1/object/public/avatars/${imageUrl}`
            })
        })

        const data = await res.json()
        console.log(data)
        location.reload()
    }

    async function deleteFunction() {
        const res = await fetch(`http://localhost:3000/word/${word.id}`, {
            method: "DELETE"
        })

        const data = await res.json()
        console.log(data)
        location.reload()
    }



</script>
<label for={word.title} class="btn">{word.title}</label>

<input type="checkbox" id={word.title} class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Updating "{word.title}"</h3>
    <Avatar bind:url="{imageUrl}"  />
    <Test bind:url="{audioUrl}" />
    <div class="modal-action">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for={word.title} class="btn btn-success" on:click={update}>Update</label>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for={word.title} class="btn btn-warning" on:click={deleteFunction}>Delete</label>
      <label for={word.title} class="btn">Close</label>
    </div>
  </div>
</div>
