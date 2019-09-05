import React from "react";
import dynamic from 'next/dynamic'
import { connect } from "react-redux";
import { Tag, Input, Tooltip, Button, message } from 'antd'
import request from '../../app/util/request'
import { getAllTagArray, removedTag, addTag } from '../../app/api/tags'
import '../../app/styles/common.css'

const AdminLayout = dynamic(import('../../app/components/AdminLayout'), {
  ssr: false
})

class managerTags extends React.Component {
  // console.log('test hoc  props'+ props.name)
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: ''
    }
  }

  fetchAllTags() {
    getAllTagArray().then((res) => {
      this.setState({
        tags: res
      })
    })
  }

  componentDidMount() {
    if (!this.props.user.name) return;
    this.fetchAllTags()
  }

  handleClose = (name) => {
    removedTag({ name })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    console.log('handleInputConfirm')
    addTag(this.state.inputValue)
      .then((res) => {
        this.fetchAllTags()
      }, (err) => {
        // console.log(err)
        message.error(err, 1000)
      })
      .finally(() => {
        this.setState({
          inputVisible: false,
          inputValue: ''
        });
      })
  };

  saveInputRef = input => this.input = input;

  render() {
    const { inputVisible, inputValue } = this.state;
    const { tags } = this.state;
    return (
      <AdminLayout>
        <div>
          <h2 className="titleStyle">标签管理</h2>
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag className="tagStyle" key={index} closable={index !== 0}
                onClose={() => this.handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip key={tag} title={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <Input
              className="tagStyle"
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 108 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible &&
          <Button className="tagStyle" size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
        </div>
        { /*language=SCSS*/}
        <style jsx>{`
          .tagStyle {
            padding: 5px 10px;
            height: auto;
            font-size: 15px;
            margin: 10px;
          }

        `}</style>
      </AdminLayout>
    )
  }
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(managerTags)
