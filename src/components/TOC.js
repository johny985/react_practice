import React, { Component } from "react";

class TOC extends Component {
  //react는 props, state가 바뀌면 모든 component가 re-render가 되는데, 그것을 막는 식 
  shouldComponentUpdate(newProps, newState) {
    if(this.props.data === newProps.data) {
      return false
    }
    return true  
  }
  
  render() {
    let lists = []
    let data = this.props.data
    let i = 0
     
    while(i < data.length) {
      lists.push(<li key={data[i].id}>
        <a 
        href={"/content/"+data[i].id}
        data-id={data[i].id}
        onClick={function(e){
        e.preventDefault()
        this.props.onChangePage(e.target.dataset.id)
      }.bind(this)}>{data[i].title}</a></li>)
      i = i + 1
    }
    
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default TOC