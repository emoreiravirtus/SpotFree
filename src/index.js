import "../scss/style.scss";
import GenreBox from "./components/GenreBox";

import { render, renderList } from '../util/framework/helper'
import { getLibraries, getAuthorization, getCode, setTokens, fetchAccessToken } from "./network";

const genreBox = new GenreBox();
let genresList = [];

const initialize = async () => {

  if(window.location.search.length > 0) {
    setTokens();

    let code = await getCode();

    await fetchAccessToken(code)
    
    genresList = await getLibraries()
  
    const html = `
      <div data-app-id="mainView">
        <div class="container">
          <div class="row my-xl">
            <div class="col-12"></div>
          </div>
          <div class="row">
            ${ renderList(genresList, genreBox, 'col-6 col-md-4') }
          </div>
        </div>
      </div>
      `;

    render(html, document.body);
  }
  else {
    getAuthorization();
  }
}

initialize();