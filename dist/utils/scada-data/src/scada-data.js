
$(function() {

  var host = "ws://" + document.URL.substr(7).split('/')[0];
  alert(host);

  window.socket = io.connect(host);//'http://127.0.0.1:3000');

  var LaneIndicatorModel = Backbone.Model.extend({
    urlRoot: 'scada',
    noIoBind: false,
    socket: window.socket,
    initialize: function() {
      _.bindAll(this, 'serverChange', 'serverDelete', 'modelCleanup');

      if (!this.noIoBind) {
        this.ioBind('update', this.serverChange, this);
        this.ioBind('delete', this.serverDelete, this);
      }
    },
    serverChange: function(data) {
      alert('serverChange');
      //alert(JSON.stringify(data));
      this.set(data);
    },
    serverDelete: function(data) {
      alert('serverDelete');
      alert(data);
    },
    modelCleanup: function(data) {
      alert('modelCleanup');
      alert(data);
    },
    defaults: {
      Red: false,
      Green: true,
      Yellow: false,
      Turn: false,
      ReverseRed: true,
      ReverseGreen: false,
      ReverseYellow: false,
      ReverseTurn: false
    }
  });

  var LANEINDICATOR_NORMAL = 1;
  var LANEINDICATOR_REVERSE = 2;
  var LANEINDICATOR_CLOSED = 3;

  var LaneIndicatorCtrl = Backbone.Model.extend({
    urlRoot: 'scada',
    noIoBind: false,
    socket: window.socket,
    initialize: function() {

    },
    defaults: {
      CtrlMode: LANEINDICATOR_NORMAL
    }
  });

  LaneIndicatorView = Backbone.View.extend({
    tagName: 'div',
    events: {
    },
    initialize: function() {
      //alert('qqq');
      //this.socket = io.connect('http://127.0.0.1:3000');
      this.$el.append('<input id="testc"/>');
      this.$('#testc').val('normal');

      this.model.on('change', this.onChange, this);
      this.model.fetch();

    },
    render: function() {
      return this;
    },
    onChange: function(model) {
      //alert('onChange');
      alert(JSON.stringify(model.toJSON()));

      if (model.get('Green') && model.get('ReverseRed')) {
        this.$('#testc').val('normal');
      }
      else if (model.get('Red') && model.get('ReverseGreen')) {
        this.$('#testc').val('reverse');
      }
      else if (model.get('Red') && model.get('ReverseRed')) {
        this.$('#testc').val('closed');
      }
    },

  });

  AppView = Backbone.View.extend({
    el: 'body',
    events: {
      'click #test': 'test',
      'click #laneNormal': 'laneNormal',
      'click #laneReverse': 'laneReverse',
      'click #laneClosed': 'laneClosed'
    },
    initialize: function() {
      var model = new LaneIndicatorModel({id: '888888888000201152001'});
      this.view = new LaneIndicatorView({model: model});
      this.$el.append(this.view.render().el);

      this.ctrlModel = new LaneIndicatorCtrl({id: model.id + '.ctrl'});
    },
    render: function() {
      return this;
    },
    test: function() {

    },
    laneNormal: function() {
      this.ctrl(LANEINDICATOR_NORMAL);
    },
    laneReverse: function() {
      this.ctrl(LANEINDICATOR_REVERSE);
    },
    laneClosed: function() {
      this.ctrl(LANEINDICATOR_CLOSED);
    },
    ctrl: function(mode) {
      this.ctrlModel.set('CtrlMode', mode);
      this.ctrlModel.save();
    }
  });

  var appView = new AppView();

});
