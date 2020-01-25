# angular-vue-two-way-communication

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-vue-two-way-communication)

## Purpose
This app demonstrates using vue custom elements within an angular application. The elements were built using the vue-cli command below

```bash
vue-cli-service build --target wc --name my-custom-element ./src/main.js
```
Using this command uses the [vue-cli web comopnent](https://cli.vuejs.org/guide/build-targets.html#web-component) wrapper to bundle the vue application into a single file that we can then use in the the browsers [customElement](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) registry to serve our vue component.

## Building our Vue Custom Element

To build a web component ready vue element all you need to do is install the `vue-cli-service` then run the above command to package your component into a single js file. You'll need to setup your `main.js` file as follows.

```js
import Vue from 'vue'

import App from './App.vue'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)


Vue.customElement('vue-widget', App)
```
Where the first argument in `Vue.customElement` is the tag name you want to define.

## Including your web component in Angular

Add the bundles js file into your angular app. In this project it's in `src/custom-elements`. Then you'll need to include it in the `angular.json->projects->app->architect->build->scripts`. 

*Note: For stackblitz it doesn't read the angular.json file currently. So you'll need to import the file in your main.ts to get it to work*

## How do vue and angular talk?
### Vue talking to angular
In order to talk to angular, your vue element will need to emit events.

In your vue component do the following;
```js
this.$emit('someEvent', this.text);
```

Then in your angular template use the `(eventName)` syntax as follows:

```html
<vue-widget msg="1st Vue Element" (someEvent)="hSomeEvent($event)" angularMsg="{{angularValue}}"></vue-widget>
```

Now your angular app will be listening for the `someEvent` event to be fired by your vue component and will call the `hSomeEvent()` function inside of it's typescript class.

### Angular talking to vue
Angular will pass data to vue through vue's component properties or `props` in vue syntax. 

In your vue component setup your props array as follows:

```js
export default {
  name: "app",
  props: ['msg', 'angularMsg'],
  data() {
        return {
            text: '',
            texts: []
        };
    },
  methods: {
    addText() {
      this.texts.push(this.text);
      this.$emit('someEvent', this.text);
      this.text = '';
    },
    someAngularMethod(value){
        this.angularMsg = value;
    }
  }
};
```

Angular can now pass data through to the vue component through the `msg` and `angularMsg` properties. 

```html
<vue-widget msg="1st Vue Element" (someEvent)="hSomeEvent($event)" angularMsg="{{angularValue}}"></vue-widget>
```

On load the `msg` property will make the vue component display `1st Vue Element`. And when the `angularValue` property on the angular component class is populated the corresponding vue property will render in it's template. 

You can see this all in action [On StackBlitz ⚡️](https://stackblitz.com/edit/angular-vue-two-way-communication)
