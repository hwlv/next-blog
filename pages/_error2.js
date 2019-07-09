import React from 'react'

export default class Error extends React.Component {
  static getInitialProps ({ res, xhr }) {
    const errorCode = res ? res.statusCode : xhr.status
    return { errorCode }
  }

  render () {
    return (
      <p>An error { this.props.errorCode } just occurred</p>
    )
  }
}
