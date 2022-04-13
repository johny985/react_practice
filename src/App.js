import "./App.css";
import { Component } from "react";
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
class App extends Component {
  constructor(props){
    super(props)
    this.maxNum = 3;
    this.state= {
      mode:'create',
      selected_content_id:2,
      //component이름: {props_name: "props_value"}
      welcome:{title: 'Welcome', desc:'Hello, React'},
      subject:{title: 'WEB', sub:'World Wide Web!'},
      contents:[
        {id:1, title:'HTML', desc: 'HTML is for information'},
        {id:2, title:'CSS', desc: 'CSS is for design'},
        {id:3, title:'JS', desc: 'JS if for interactive'},
      ]
    }
  }
  render() {
    let _title, _desc, _article = null
    if (this.state.mode === 'welcome') {
       _title = this.state.welcome.title
       _desc = this.state.welcome.desc
       _article= <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      let i = 0;
      while(i < this.state.contents.length) {
        let data = this.state.contents[i]
        if(data.id === this.state.selected_content_id) {
          _title = data.title
          _desc= data.desc
          break
        }
        i = i + 1
      }
      _article= <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
      this.maxNum = this.maxNum + 1
      var _contents = this.state.contents.concat({id: this.maxNum, title:_title, desc:_desc})
       this.setState({
         contents: _contents
       })
      }.bind(this)}></CreateContent>
    }
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
        onChangePages={function(){
          this.setState({mode:'read'})
        }.bind(this)}></Subject>

        <TOC onChangePage={function(id){
          this.setState({mode:'read',
          selected_content_id: Number(id)})
        }.bind(this)} data={this.state.contents}></TOC>
        
        <Control onChangeMode ={function(_mode){
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
