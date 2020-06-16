// 方式三

import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  title: string = 'input title'

  onclick() {
    console.log('click', this)
  }

  render(h: CreateElement) {
    return <div class="hello">
      <h3 onclick={this.onclick}>{ this.msg } { this.title }</h3>
      <input type="text" v-model={ this.title } />
    </div>
  }
}