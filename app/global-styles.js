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

  // .navbar {
  //   background-color: gray;
  // }
  
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    background-color: #EFF7D4;
  }

  .make-select-dark .carousel-control-next-icon {
    background-image : url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000000' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E")
  }


   .make-select-dark .carousel-control-prev-icon {
     background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e")
    }

  .tab-content {
    height: 100%;
  }
`;

export default GlobalStyle;
