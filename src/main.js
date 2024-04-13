import './mode-solidity';

//import solicon from './solicon.svg';
import plugin from '../plugin.json';

const Url = acode.require('url');
const { addMode, removeMode } = acode.require('aceModes');
//acode.addIcon(solicon, './solicon.svg');
class Solidity {
  #style;

  async init(firstInit) {
    this.#style = <style
      textContent={
        `.file_type_sol::before{
          display: inline-block;
          content: '';
          background-image: Url("./solicon.svg");
          background-size: contain;
          background-repeat: no-repeat;
          height: 1em;
          width: 1em;
        }`
      }
    ></style>


    addMode('solidity', 'solidity', 'Solidity');
    document.head.append(this.#style);

    if (!firstInit) return;

    editorManager.files.forEach((file) => {
      // update session mode
      if (Url.extname(file.name) === '.sol') {
        file.session.setMode('ace/mode/solidity');
      }
    });
  }

  async destroy() {
    this.#style.remove();
    removeMode('solidity');

    editorManager.files.forEach((file) => {
      // update session mode
      if (Url.extname(file.name) === '.sol') {
        file.session.setMode('ace/mode/text');
      }
    });
  }

}

if (window.acode) {
  const solidity = new Solidity();
  acode.setPluginInit(plugin.id, (baseUrl, $page, options) => {
    solidity.init(options.firstInit);
  });
  acode.setPluginUnmount(plugin.id, () => {
    solidity.destroy();
  });
}
