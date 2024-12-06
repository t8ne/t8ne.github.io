import { html, css, LitElement } from "lit";

class NotFoundPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: black;
      color: white;
      font-family: "Arial Black", Arial, sans-serif;
    }
    header {
      width: 100%;
      background-color: black;
      padding: 1em;
    }
    nav {
      display: flex;
      justify-content: center;
      gap: 1em;
      flex-wrap: wrap;
    }
    nav a {
      color: white;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s;
      padding: 0.5em;
    }
    nav a:hover {
      color: #cccccc;
    }
    .content {
      font-size: 2em;
      font-weight: bold;
      text-align: center;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }
    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      padding: 1em;
      width: 100%;
      flex-wrap: wrap;
    }
    .app-icon {
      width: 20px;
      height: 20px;
      margin: 0 10px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .app-icon img {
      filter: invert(1);
      width: 20px;
      height: 20px;
    }
  `;

  render() {
    return html`
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/skills">Skills</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <div class="content">Página não encontrada.</div>
      <footer>
        <a class="app-icon" href="http://github.com/t8ne" target="_blank"
          ><img src="assets/footer/github.png" alt="GitHub"
        /></a>
        <a class="app-icon" href="http://linkedin.com/in/t8ne/" target="_blank"
          ><img src="assets/footer/linkedin.png" alt="LinkedIn"
        /></a>
        <a
          class="app-icon"
          href="https://open.spotify.com/user/aantryy"
          target="_blank"
          ><img src="assets/footer/spotify.png" alt="Spotify"
        /></a>
        <a
          class="app-icon"
          href="https://www.chess.com/member/t8ne"
          target="_blank"
          ><img src="assets/footer/pawn.png" alt="Chess"
        /></a>
        <a class="app-icon" href="http://youtube.com/@t8n3" target="_blank"
          ><img src="assets/footer/youtube.png" alt="YouTube"
        /></a>
        <a
          class="app-icon"
          href="https://steamcommunity.com/id/t8ne"
          target="_blank"
          ><img src="assets/footer/steam.png" alt="Steam"
        /></a>
      </footer>
    `;
  }
}

customElements.define("not-found-page", NotFoundPage);
