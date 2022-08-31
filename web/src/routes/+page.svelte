<script>
  import { browser } from '$app/environment';

  let boardConnected = false;

  if (browser) {
    const socket = new WebSocket('ws://localhost:8080');
    // Connection opened
    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      console.log('Message from server :', data);
      console.log(data);
      if (typeof data === 'object' && data.connected === true) {
        boardConnected = true;
      } else {
        boardConnected = false;
      }
    });
  }
</script>

<h1>
  {#if boardConnected}
    Board connected!
  {:else}
    Board not connected!
  {/if}
</h1>
