import{html as i,css as e,LitElement as t}from"lit";class n extends t{static properties={currentPhrase:{type:String},activeSection:{type:String},isTransitioning:{type:Boolean}};constructor(){super(),this.phrases=["Hi, I'm t8ne","Web Developer","Music Enthusiast","Calisthenics Enjoyer"],this.currentPhrase="",this.isDeleting=!1,this.index=0,this.speed=100,this.typingStarted=!1,this.activeSection="home",this.isTransitioning=!1,this.isIdle=!1}connectedCallback(){super.connectedCallback(),document.addEventListener("splashScreenRemoved",(()=>{this.startTyping()}))}static styles=e`

    body, .content {
      overflow-x: hidden;
    }

    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      background-color: black;
      color: white;
      font-family: 'Arial Black', Arial, sans-serif;
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
      font-family: 'Arial Black', Arial, sans-serif;
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
      transition: opacity 0.5s ease-in-out;
      padding: 0;
      width: 100%;
      max-width: calc(100% - 15px);
      margin: 0 auto;
      overflow-y: auto;
      margin-left: 0;
      margin-right: 0;
      box-sizing: border-box;
      transform: translateX(-7px);
    }
    
    @media (max-width: 768px) {
      .content {
        font-size: 1.5em;
        padding: 0.5em;
      }
    }
    .content.transitioning {
      opacity: 0;
    }
    .cursor {
      display: inline-block;
      width: 3px;
      height: 1em;
      background-color: white;
      margin-left: 2px;
      animation: blink 0.7s infinite;
    }

    .cursor-static {
      animation: none;
    }

    @keyframes blink {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
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
    .about-content {
      font-size: 1rem;
      max-width: 60%;
      line-height: 1.6;
      text-align: center;
      margin: 5%;
    }
    .contact-content {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 1.5em;
      justify-items: center;
      align-items: start;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 1em;
      justify-content: center;
    }
    .skill-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .skill-item img {
      width: 40px;
      height: 40px;
      margin-bottom: 0.5em;
    }
    .skill-name {
      font-size: 0.7rem;
    }
    @media (max-width: 50%) {
      .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: 1em;
      }
      .skill-item img {
        width: 30px;
        height: 30px;
      }
      .skill-name {
        font-size: 0.6rem;
      }
    }
  `;startTyping(){this.typingStarted||(this.typingStarted=!0,this.typing())}typing(){if("home"!==this.activeSection)return;const i=this.phrases[this.index%this.phrases.length];this.isDeleting?(this.currentPhrase=i.substring(0,this.currentPhrase.length-1),this.speed=50,this.isIdle=!1):(this.currentPhrase=i.substring(0,this.currentPhrase.length+1),this.speed=100,this.isIdle=!1),this.isDeleting||this.currentPhrase!==i?this.isDeleting&&""===this.currentPhrase&&(this.isDeleting=!1,this.index++,this.speed=500,this.isIdle=!1):(this.speed=2e3,this.isDeleting=!0,this.isIdle=!0),this.requestUpdate(),setTimeout((()=>this.typing()),this.speed)}changeSection(i){this.activeSection!==i&&(this.isTransitioning=!0,setTimeout((()=>{this.activeSection=i,this.isTransitioning=!1,"home"===i&&this.typing()}),500))}renderContent(){switch(this.activeSection){case"home":return i`
          ${this.currentPhrase}
          <span class="cursor ${this.isIdle?"":"cursor-static"}"></span>
        `;case"about":return i`
          <div class="about-content">
            Tone is a 20-year-old third-year university student pursuing a Bachelor's degree in Graphic Computing and Multimedia. With a solid foundation in programming languages like Java and expertise in web development using HTML, CSS, and JavaScript, Tone is committed to harnessing technical and creative skills in projects that blend engineering precision with visual storytelling. Passionate about innovation in multimedia technology, Tone is keen on developing applications and websites that push the boundaries of user experience.
          </div>
        `;case"skills":return i`
          <div class="skills-grid">
            ${this.renderSkills()}
          </div>
        `;case"contact":return i`
          <div class="contact-content">
            <div>Discord - @t8n3</div>
            <div>t8n333@gmail.com</div>
          </div>
        `;default:return""}}renderSkills(){return[{name:"CSS3",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},{name:"HTML5",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},{name:"Bootstrap",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"},{name:"JavaScript",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},{name:"TypeScript",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{name:"C#",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"},{name:"Java",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},{name:"PHP",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"},{name:"JSON",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg"},{name:"MySQL",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},{name:"Ruby",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg"},{name:"Git",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},{name:"Node.js",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},{name:"Bun",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg"},{name:"Angular",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"},{name:"Firebase",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg"},{name:"PostgreSQL",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"},{name:"Docker",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"},{name:"Ionic",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg"},{name:"Yii",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yii/yii-original.svg"},{name:"After Effects",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg"},{name:"Illustrator",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg"},{name:"Photoshop",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg"},{name:"Premiere Pro",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg"},{name:"Blender",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg"},{name:"Maya",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maya/maya-original.svg"},{name:"VS Code",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"},{name:"Android Studio",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg"},{name:"Figma",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"},{name:"IntelliJ",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg"},{name:"Fedora",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fedora/fedora-original.svg"},{name:"Ruby on Rails",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg"}].map((e=>i`
      <div class="skill-item">
        <img src="${e.logo}" alt="${e.name} logo" />
        <span class="skill-name">${e.name}</span>
      </div>
    `))}render(){return i`
      <header>
        <nav>
          ${["Home","About","Skills","Contact"].map((e=>i`
            <a href="#" @click=${()=>this.changeSection(e.toLowerCase())}>${e}</a>
          `))}
        </nav>
      </header>
      <div class="content ${this.isTransitioning?"transitioning":""}">
        ${this.renderContent()}
      </div>
      <footer>
        <a class="app-icon" href="http://github.com/t8ne" target="_blank"><img src="assets/footer/github.png" alt="GitHub" width="20" height="20"></a>
        <a class="app-icon" href="http://linkedin.com/in/t8ne/" target="_blank"><img src="assets/footer/linkedin.png" alt="LinkedIn" width="20" height="20"></a>
        <a class="app-icon" href="https://open.spotify.com/user/aantryy" target="_blank"><img src="assets/footer/spotify.png" alt="Spotify" width="20" height="20"></a>
        <a class="app-icon" href="https://www.chess.com/member/t8ne" target="_blank"><img src="assets/footer/pawn.png" alt="Chess" width="20" height="20"></a>
        <a class="app-icon" href="http://youtube.com/@t8n3" target="_blank"><img src="assets/footer/youtube.png" alt="YouTube" width="20" height="20"></a>
        <a class="app-icon" href="https://steamcommunity.com/id/t8ne" target="_blank"><img src="assets/footer/steam.png" alt="Steam" width="20" height="20"></a>
      </footer>
    `}}customElements.define("t8ne-element",n);