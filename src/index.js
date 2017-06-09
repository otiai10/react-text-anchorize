import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AnchorizableText extends Component {
  constructor(props) {
    super(props);
    this.reservations = [];
    const contents = this._expandByRules([this.props.text]).map((token, i) => {
      if (typeof token != 'string' && typeof token.replace == 'function') {
        this.reservations.push(token.replace.bind(null, token.value, (result) => {
          this.replaceContentsOf(i, result);
        }, i));
      }
      if (typeof token.wrap == 'function') {
        return <span key={i}>{token.wrap.bind(this)(token.value)}</span>;
      }
      return <span key={i}>{token}</span>;
    })
    this.state = {
      contents,
    };
  }
  componentDidMount() {
    this.reservations.map(replace => replace());
  }
  render() {
    return <span>{this.state.contents}</span>;
  }
  _expandByRules(tokens) {
    if (!this.props.rules) return tokens;
    this.props.rules.map(rule => {
      tokens = this._expandByRule(rule, tokens);
    });
    return tokens;
  }
  _expandByRule(rule, tokens) {
    return (tokens => {
      var expr = new RegExp(rule.match);
      var res = [];
      tokens.map(token => {
        if (!token.split) return res.push(token); // this is already replacer.
        token.split(expr).map(e => {
          if (e.length === 0) return;
          if (!e.match(expr)) return res.push(e);
          var r = new AnchorizableText.Replacer(e);
          if (typeof rule.wrap === 'function') r.wrap = rule.wrap;
          if (typeof rule.replace === 'function') r.replace = rule.replace;
          return res.push(r);
        });
      });
      return res;
    })(tokens);
  }
  replaceContentsOf(index, content) {
      this.state.contents[index] = React.cloneElement(content, {key: index});
      this.setState({contents: this.state.contents});
  }
}
AnchorizableText.Replacer = function(substr) {
  this.value = substr;
  // default wrap
  this.wrap = function(sub) {
    return React.createElement("a", {href: sub, target: "_blank"}, sub);
  };
};

export default AnchorizableText;
