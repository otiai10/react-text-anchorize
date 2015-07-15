var AnchorizableText = React.createClass({
    getInitialState: function() {
        var replacers = this.expandByRules([this.props.text]);
        var contents = [];
        replacers.forEach(function(replacer, i) {
            if (typeof replacer === 'string')
              return contents.push(<span>{replacer}</span>);
            setTimeout(function() {
              replacer.replace.bind(this)(i);
            }.bind(this));
            return contents.push(<span>{replacer}</span>);
        }.bind(this));
        return {contents: contents};
    },
    render: function() {
        return <span>{this.state.contents}</span>;
    },
    expandByRules: function(tokens) {
        if (!AnchorizableText.Rules) return tokens;
        AnchorizableText.Rules.forEach(function(rule, i) {
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
            if (e.match(expr)) return res.push(new rule.replacer(e));
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
AnchorizableText.Rules = [];
