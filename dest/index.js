var AnchorizableText = React.createClass({displayName: "AnchorizableText",
    getInitialState: function() {
        this.props.rules = this.props.rules || [];
        var replacers = this.expandByRules([this.props.text]);
        var contents = [];
        replacers.forEach(function(replacer, i) {
            if (typeof replacer === 'string')
              return contents.push(React.createElement("span", null, replacer));
            if (typeof replacer.replace === 'function') {
              setTimeout(function() {
                replacer.replace.bind(this)(i, replacer.value);
              }.bind(this));
            }
            var _c = replacer.wrap.bind(this)(replacer.value);
            return contents.push(React.createElement("span", null, _c));
        }.bind(this));
        return {contents: contents};
    },
    render: function() {
        return React.createElement("span", null, this.state.contents);
    },
    expandByRules: function(tokens) {
        if (!this.props.rules) return tokens;
        this.props.rules.forEach(function(rule, i) {
            tokens = this.expandByRule(rule, tokens);
        }.bind(this));
        return tokens;
    },
    expandByRule: function(rule, tokens) /* tokens */ {
      return (function(tokens) {
        var expr = new RegExp(rule.match);
        var res = [];
        tokens.forEach(function(token) {
          if (!token.split) return res.push(token); // this is already replacer.
          token.split(expr).forEach(function(e) {
            if (e.length === 0) return;
            if (e.match(expr)) {
              var r = new AnchorizableText.Replacer(e);
              if (typeof rule.wrap === 'function') r.wrap = rule.wrap;
              if (typeof rule.replace === 'function') r.replace = rule.replace;
              return res.push(r);
            }
            return res.push(e);
          });
        });
        return res;
      })(tokens);
    },
    replaceContentsOf: function(index, content) {
        this.state.contents[index] = content;
        this.setState({contents: this.state.contents});
    }
});

AnchorizableText.Replacer = function(substr) {
  this.value = substr;
  // default wrap
  this.wrap = function(sub) {
    return React.createElement("a", {href: sub, target: "_blank"}, sub);
  };
};
