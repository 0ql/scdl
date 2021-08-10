<script lang="ts">
  import download from './download';
	import Tailwindcss from './Tailwindcss.svelte';
  import type { INFOS } from './types';
  import Loading from "./Loading.svelte"
  import Cross from './Cross.svelte';

  const backendURL: string = "<PUT URL HERE>"

  let url: string = ""
  let infos: INFOS.RootObject = null
  let status: "idle" | "loading" | "error" = "idle"

  const validURL = (str: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const getinfos = async () => {
    status = "loading"
    if (validURL(url)) {
      try {
        infos = JSON.parse(await (await fetch(backendURL + "/getmusicinfo", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url
          })
        })).json())
        status = "idle"
      } catch(err) {
        console.log(err)
        status = "error"
      }
    } else status = "error"
  }

  const dl = async () => {
    const res: Response = await fetch(backendURL + "/download", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    })
    const blob = await res.blob()
    download(blob, infos.title + ".mp3")
  }
</script>

<Tailwindcss />
<main class="h-full w-full p-8 bg-gradient-to-b from-gray-700 to-gray-800 text-white flex justify-center">
  <div class="w-full lg:w-2/3">
    <div class="my-3 text-gray-200 text-2xl">Soundcloud Song Downloader</div>
    <input type="text" bind:value={url} class="mt-4 w-full rounded-xl bg-gray-700 inp py-2 px-3 focus:outline-none"
    placeholder="Hier URL des Soundcloud-Songs einfügen" on:change={getinfos}>
    {#if status === "loading"}
      <Loading></Loading>
    {:else if status === "error"}
    <div class="flex justify-center text-yellow-600 gap-3 mt-3">
      <Cross></Cross>
      <div>Invalid URL or No Network Connection</div>
    </div>
    {/if}
    {#if infos}
      <div class="bg-gray-700 rounded-xl py-2 px-3 mt-4 inp">
        <div class="flex gap-5">
          <img src={infos.artwork_url} alt="cover">
          <div class="w-full">
            <div class="text-lg">{infos.title}</div>
            <div>{infos.user.username}</div>
            <div>{Math.floor(infos.duration / 1000 / 60)}:{Math.floor(infos.duration / 1000 % 60)}</div>
            <div class="flex justify-between">
              <div class="">{infos.likes_count} Likes</div>
              <div class="">{infos.playback_count} times Played</div>
            </div>
          </div>
        </div>
        <button class="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-xl mt-3" on:click={dl}>Download</button>
      </div>
    {/if}
  </div>
</main>

<style>
  .inp {
    box-shadow: 0px 0px 2px #94A3B8;
  }
</style>