import { html, css, LitElement } from 'https://cdn.skypack.dev/lit';

class T8neElement extends LitElement {
  static properties = {
    menuOpen: { type: Boolean },
    currentPhrase: { type: String }
  };

  constructor() {
    super();
    this.phrases = ["Hi, I'm t8ne", "Web Developer", "Music Enthusiast", "Creative Coder"];
    this.currentPhrase = "";
    this.isDeleting = false;
    this.index = 0;
    this.speed = 200;
    this.menuOpen = false;
    this.typingStarted = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for the custom event from the splash screen
    document.addEventListener('splashScreenRemoved', () => {
      this.startTyping();
    });
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: black;
      color: white;
      font-family: 'Arial Black', Arial, sans-serif;
    
    }
    .dynamic-text {
      font-size: 3em;
      font-weight: bold;
      text-align: center;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      padding: 1em;
      width: 100%;
    }
    .app-icon {
      width: 30px;
      height: 30px;
      margin: 0 10px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .app-icon:hover {
      transform: scale(1.1);
    }
    .app-icon img {
      filter: invert(1);
    }
    .menu-icon {
      position: fixed;
      top: 20px;
      left: 20px;
      cursor: pointer;
      z-index: 992;
      transition: opacity 0.3s;
    }
    .menu-icon.hidden {
      opacity: 0;
      pointer-events: none;
    }
    .menu-icon img {
        filter: invert(1);
      }
    .side-menu {
      position: fixed;
      top: 0;
      left: -60%;
      width: 50%;
      height: 100vh;
      background-color: #080808;
      transition: left 0.3s;
      padding: 2em;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
      z-index: 991;
    }
    .side-menu.open {
      left: 0;
    }
    .close-menu {
      cursor: pointer;
      font-size: 1.5em;
      margin-bottom: 20px;
      color: white;
    }
    .menu-item {
      color: white;
      text-decoration: none;
      font-size: 1.4rem;
      display: block;
      margin-top: 7%;
      margin-bottom: 7%;
      text-align: center;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      z-index: 990;
    }
    .overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
  `;

  startTyping() {
    if (!this.typingStarted) {
      this.typingStarted = true;
      this.typing();
    }
  }

  typing() {
    const fullText = this.phrases[this.index % this.phrases.length];

    if (this.isDeleting) {
      this.currentPhrase = fullText.substring(0, this.currentPhrase.length - 1);
      this.speed = 100;
    } else {
      this.currentPhrase = fullText.substring(0, this.currentPhrase.length + 1);
      this.speed = 200;
    }

    if (!this.isDeleting && this.currentPhrase === fullText) {
      this.speed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentPhrase === "") {
      this.isDeleting = false;
      this.index++;
      this.speed = 500;
    }

    this.requestUpdate();
    setTimeout(() => this.typing(), this.speed);
  }

  render() {
    return html`
      <div class="menu-icon ${this.menuOpen ? 'hidden' : ''}" @click="${this.toggleMenu}">
        <img src="assets/menu/menu.png" alt="Menu" width="30" height="30">
      </div>
      <div class="dynamic-text">${this.currentPhrase}</div>
      <footer>
        <a class="app-icon" href="http://github.com/t8ne" target="_blank"><img src="assets/footer/github2.png" alt="GitHub" width="20" height="20"></a>
        <a class="app-icon" href="http://linkedin.com/in/t8ne/" target="_blank"><img src="assets/footer/linkedin.png" alt="LinkedIn" width="20" height="20"></a>
        <a class="app-icon" href="https://open.spotify.com/user/aantryy" target="_blank"><img src="assets/footer/spotify.png" alt="Spotify" width="20" height="20"></a>
        <a class="app-icon" href="https://www.chess.com/member/t8ne" target="_blank"><img src="assets/footer/pawn.png" alt="Chess" width="20" height="20"></a>
        <a class="app-icon" href="http://youtube.com/@t8n3" target="_blank"><img src="assets/footer/youtube.png" alt="YouTube" width="20" height="20"></a>
        <a class="app-icon" href="https://steamcommunity.com/id/t8ne" target="_blank"><img src="assets/footer/steam.png" alt="Steam" width="20" height="20"></a>
      </footer>
      <div class="side-menu ${this.menuOpen ? 'open' : ''}">
        <div class="close-menu" @click="${this.toggleMenu}">X</div>
        <a href="#" class="menu-item" style="margin-top: 10%">Home</a>
        <a href="#" class="menu-item">About</a>
        <a href="#" class="menu-item">Projects</a>
        <a href="#" class="menu-item">Contact</a>
      </div>
      <div class="overlay ${this.menuOpen ? 'active' : ''}" @click="${this.toggleMenu}"></div>
    `;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
  }
}

customElements.define('t8ne-element', T8neElement);
