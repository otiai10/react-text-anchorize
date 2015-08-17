# react-text-anchorize

```javascript
var myRules = [
  {
    // "match" defines target to anchorize.
    // Don't forget capture whole expression.
    match: /(https?:\/\/twitter.com\/[^\/]+\/status\/[0-9]+)/g,
    // "wrap" is called synchronously.
    // You can wrap matched part of the text with React Component.
    wrap: function(sub) /* React.Component */ {
      return <a href={sub}>sub</a>;
    },
    // "replace" is called after text is rendered.
    // You can replace matched part of the text asynchronously,
    // by using "replaceContentsOf"
    replace: function(i, sub) /* void */ {
      myTwitterAPIClient.getEmbedHTML(sub, function(html) {
        this.replaceContentsOf(i, <div dangerouslySetInnerHTML={{__html:html}}></div>);
      }.bind(this));
    }
  }
];

return <AnchorizableText rules={myRules} text={"I love this tweet https://twitter.com/yuka_iguti/status/559023220100055042"} />;
```

![](https://pbs.twimg.com/media/CMnIF28UYAA3K3A.png)
