import React, {
  Component
} from 'react';
import Canvas from './canvas.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.search();
  }
  search() {
    let self = this;
    // let defaultText = "HanLP是由一系列模型与算法组成的工具包，目标是普及自然语言处理在生产环境中的应用。";
    let defaultText = "万科集团去年3亿";
    // let defaultText = "华为去年生产值50";
    // let defaultText = "HHHHH:CC";
    let text = (this.refs.search_input && this.refs.search_input.value) || defaultText;
    text = encodeURI(text);
    let url = "http://api.smoothnlp.com/query?text=" + text;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // 词法分析
        data = data.payload.response;
        self.setState({
          data
        })
      })
      .catch(error => console.error(error))
  }
  onkeyUp(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo"  src="http://www.smoothnlp.com/static/images/smoothnlp_hlog.png" />
      </header>
      <div className="search">
        <input className="search-input" ref="search_input" placeholder="请输入一个句子进行分析"  onKeyUp={this.onkeyUp.bind(this)}  />
        <button className="search-button" onClick={this.search.bind(this)}>分析</button>
      </div>
      <Canvas data={this.state.data}/>
    </div>
    );
  }
}

export default App;