import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AnchorizableText extends Component {
  constructor(props) {
    super(props);
    const contents = this._expandByRules([this.props.text]).map((replacer, i) => {
      if (typeof replacer === 'string') return <span key={i}>{replacer}</span>;
      if (typeof replacer.replace == 'function') {
        setTimeout(() => replacer.replace.bind(this)(i, replacer.value));
      }
      const tmp = replacer.wrap.bind(this)(replacer.value);
      return <span key={i}>{tmp}</span>;
    });
    this.state = {
      contents: contents,
    };
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
  replaceContentsOf: function(index, content) {
      this.state.contents[index] = content;
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
