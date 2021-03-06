AutoForm.addInputType("select-multiple", {
  template: "afSelectMultiple_reactAutoformMaterialUi",
  valueIsArray: true,
  valueOut: function () {
    return AutoForm.Utility.getSelectValues(this[0]);
  },
  contextAdjust: function (context) {
    // build items list
    context.items = _.map(context.selectOptions, function(opt) {
      if (opt.optgroup) {
        var subItems = _.map(opt.options, function(subOpt) {
          return {
            name: context.name,
            label: subOpt.label,
            value: subOpt.value,
            htmlAtts: _.omit(subOpt, 'label', 'value'),
            // _id must be included because it is a special property that
            // #each uses to track unique list items when adding and removing them
            // See https://github.com/meteor/meteor/issues/2174
            _id: subOpt.value,
            selected: _.contains(context.value, subOpt.value),
            atts: context.atts
          };
        });
        return {
          optgroup: opt.optgroup,
          items: subItems
        };
      } else {
        return {
          name: context.name,
          label: opt.label,
          value: opt.value,
          htmlAtts: _.omit(opt, 'label', 'value'),
          // _id must be included because it is a special property that
          // #each uses to track unique list items when adding and removing them
          // See https://github.com/meteor/meteor/issues/2174
          _id: opt.value,
          selected: _.contains(context.value, opt.value),
          atts: context.atts
        };
      }
    });

    return context;
  }
});

const { List,ListItem,Checkbox} = mui;
const SelectMultiple = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function() {
   let results = this.props.atts.items;

    return (
      <List>
      {results.map(function(result) {
                return <ListItem key={result.id} primaryText={result.label} leftCheckbox={<Checkbox />} />;
              })}
      </List>
    );
  }
});
Template["afSelectMultiple_reactAutoformMaterialUi"].helpers({
  atts: function(){
    let atts = this.atts;
    atts.items = this.items;
    return atts
  },
  SelectMultiple: function(){
    return SelectMultiple;
  }
})
