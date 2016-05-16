import BaseInput from './b-base-input';

export default BaseInput.extend({
  actions: {
    selectItem(content) {
      this.attrs.selectItem(content);
    }
  }
});
