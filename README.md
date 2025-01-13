# Website Screenshot Gallery

**Live Demo**: [https://website-gallery-one.vercel.app/](https://website-gallery-one.vercel.app/)

## Overview
Website Screenshot Gallery is a React-based web application that allows users to generate and store screenshots of any publicly accessible website. Leveraging the [Apiflash](https://apiflash.com/) screenshot API, the app can capture snapshots with various customizations (e.g. format, size, ad-blocking, cookie-banner removal).

## Key Features
- **Screenshot Generation**: Quickly capture full-page screenshots of any URL.
- **Customizable Attributes**:  
  - **Format**: Choose among JPEG, PNG, or WebP.  
  - **Dimensions**: Specify width and height (in pixels).  
  - **No Ads / No Cookie Banners**: Toggle these for a cleaner screenshot.  
- **Gallery**: Stores your previous screenshots in a gallery for easy reference.

## Tech Stack
- **Front-End**: 
  - [React](https://reactjs.org/) (Create React App), a popular JavaScript library for building component-based user interfaces.
  - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (including custom styling and gradients) for a professional UI.
- **API / Networking**: 
  - [Apiflash Screenshot API](https://apiflash.com/) for capturing website images.   
  - Native `fetch` API in React for asynchronous requests.
- **Build & Tooling**:
  - [Vercel](https://vercel.com/) for rapid deployment.
  - [npm](https://www.npmjs.com/) for package management.

## Installation & Setup
1. **Clone this repository**:
   ```bash
   git clone https://github.com/<your-username>/website-gallery.git
   cd website-gallery
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a `.env` file** at the project root with your [Apiflash](https://apiflash.com/) key:
   ```bash
   REACT_APP_ACCESS_KEY=YOUR_APIFLASH_KEY
   ```
4. **Run the development server**:
   ```bash
   npm start
   ```
   This will start the app at [http://localhost:3000](http://localhost:3000).

## Usage
1. **Enter a URL** in the designated field (no protocol needed; it will prepend https:// automatically if missing).
2. **Select desired attributes** (e.g., format, width, height).
3. **Click "Take that Pic!"** to trigger a screenshot request via Apiflash.
4. **View and store** the returned screenshot; it will display below the form and be added to the gallery.

## Future Improvements
- **User Authentication**: Optionally store screenshots in a personalized user account.
- **Image Editing Tools**: Add basic cropping or annotations.
- **Enhanced Error Handling**: Offer more detailed feedback for invalid URLs or API limits.

## Contributing
1. Fork the project and clone locally.
2. Create a new branch for your feature or bugfix.
3. Commit and push your changes to GitHub.
4. Submit a Pull Request.

## License
This project is open source. Feel free to use it, modify it, and distribute it.

---

Built with ♥ in React. For any questions, feel free to reach out or open an issue.  

Enjoy the live demo at [website-gallery-one.vercel.app](https://website-gallery-one.vercel.app/)!
