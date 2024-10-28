# t8ne Portfolio Website

This is the source code for **t8ne**'s online portfolio, designed to showcase skills, interests, and contact information interactively and dynamically. Built with `LitElement`, this site features a responsive interface, smooth transitions, and a typing animation on the homepage.

## 🚀 Demo
The site starts with a splash screen that fades away after loading, revealing a homepage with typing animation and smooth transitions between sections: **Home**, **About**, **Skills**, and **Contact**.

## 🎨 Features

- **Splash Screen**: An introductory screen displayed when the site loads.
- **Typing Animation**: The **Home** section displays a typing effect for phrases.
- **Smooth Transitions**: Each portfolio section (Home, About, Skills, Contact) uses a smooth transition effect when navigating.
- **Responsive Design**: The interface adapts for mobile and desktop.
- **Social Media Icons**: Interactive icons for GitHub, LinkedIn, Spotify, Chess.com, YouTube, and Steam in the footer.

## 🛠️ Technologies Used

- **LitElement**: To build efficient Web Components.
- **HTML5 & CSS3**: Layout and styles, including responsive design.
- **JavaScript**: Site logic and typing animation.

## 📂 Code Structure

The main component is defined in `index.js`, with the following code flow:

1. **Splash Screen**: Displayed until the `splashScreenRemoved` event is fired.
2. **Typing Animation**: Starts after the splash screen and upon loading the "Home" section.
3. **Section Navigation**: Includes *Home*, *About*, *Skills*, and *Contact*, each with dynamic content.
4. **Blinking Cursor**: The cursor only blinks when text is complete (not during typing or deleting).
5. **Social Media Footer**: Interactive social media icons in the footer link to external platforms.

## 📖 Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/t8ne-portfolio.git
   cd t8ne-portfolio
