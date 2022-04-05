import "../scss/style.scss";
import GenreBox from "./components/GenreBox";

import { render, renderList } from '../util/framework/helper'
import { 
  getLibraries, 
  getAuthorization, 
  getCode, 
  setTokens, 
  fetchAccessToken,
  getPlaylists
} from "./network";
import { attachFunctionToElement } from "../util/actionsAttacher";

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
      <div class="genres-modal" onclick="document.querySelector('.genres-modal').style.display = 'none'">
        <div class="back-button"><</div>
        Modal
      </div>
      `;

    render(html, document.body);
  }
  else {
    getAuthorization();
  }
}

initialize()
  .then(() => attachFunctionToElement('.genre-box', async element => {
    const div = element.path[3];
    const href = div.attributes[0].value;

    getPlaylists(href)
      .then(response => {
        document.querySelector('.genres-modal').style.display = 'flex';
        console.log(response);
      })
  }));
