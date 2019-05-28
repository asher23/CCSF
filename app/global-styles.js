import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .background-for-container {
    min-height: calc(100vh - 50px);
    background-color: #98D3E1;
  }

  .container {
    background-color: #EFF7D4
  }

  .navbar {
    background-color: #E06287
  }
  
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    background-color: #EFF7D4;
  }



  .tab-content {
    height: 100%;
  }
`;

export default GlobalStyle;
