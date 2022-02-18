import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

/* Fonts Used */

@font-face{
  font-family: 'Poor Richard';
  src: url(${process.env.PUBLIC_URL}/fonts/poor_richard.ttf);
}

@font-face{
  font-family: 'High Tower';
  src: url(${process.env.PUBLIC_URL}/fonts/high_tow.ttf);
}

@font-face{
  font-family: 'Redressed';
  src: url(${process.env.PUBLIC_URL}/fonts/Redressed-Regular.ttf);
}

/* Fonts Used End */



/* ------------------------------------------------------------------ */



/* Fonts Size and Rem selection */

html{
  font-size: 16px;
}

@media screen and (max-width: 800px) {
  
  html{
    font-size: 15px;
  }

}

@media screen and (max-width: 700px) {
  
  html{
    font-size: 14px;
  }

}

@media screen and (max-width: 600px) {
  
  html{
    font-size: 13px;
  }

}

@media screen and (max-width: 500px) {
  
  html{
    font-size: 12px;
  }

}

@media screen and (max-width: 400px) {
  
  html{
    font-size: 11px;
  }

}

@media screen and (max-width: 300px) {
  
  html{
    font-size: 9px;
  }

}

@media screen and (max-height: 400px) {
  
  html{
    font-size: 9px;
  }

}

@media screen and (max-width: 200px) {
  
  html{
    font-size: 7px;
  }

}

@media screen and (max-width: 100px) {
  
  html{
    font-size: 5px;
  }

}

@media screen and (max-width: 80px) {
  
  html{
    font-size: 4px;
  }

}

@media screen and (max-width: 50px) {
  
  html{
    font-size: 3px;
  }

}

/* Fonts Size and Rem selection END */



/* ------------------------------------------------------------------ */



/* Base Elements Styles */

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

body{
  min-height: 100vh;
  font-size: .8rem;
  line-height: 1.6rem;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f4f4f4;
  color: #7c7c7c;
  overflow-x: hidden;
  padding-right: .1rem;
}

.absolute-invisibility{
  position: absolute;
  display: none;
  width: 0; height: 0;
  border: 0; outline: 0;
  background: transparent;
}


/* Base Elements Styles */



/* ------------------------------------------------------------------ */



/* Custom Scroll bar */

::-webkit-scrollbar {
  width: .3rem;
  height: .3rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Custom Scroll bar END */


input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}

/* ------------------------------------------------------------------ */
`

export default GlobalStyle;