# react-text-anchorize

```javascript
AnchorizableText.Rules = [
  {
    match: /(boobs)/g, // don't forget capture whole expression.
    replacer: function(sub) {
      this.replace = function(i) {
        this.replaceContentsOf(i, <b>{sub}</b>);
      };
    }
  }
];
return <AnchorizableText text={"I love your boobs"} />;
```

![](https://pbs.twimg.com/media/CIoY8xlVAAA3PoJ.png)
