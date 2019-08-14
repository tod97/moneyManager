export class Tag {

  private name: string;
  private icon: string;
  private color: string;

  constructor(name = '', icon = '', color = '') {
    this.name = name;
    this.icon = icon;
    this.color = color;
  }

  copy() {
    return new Tag(this.name, this.icon, this.color);
  }

  clearData() {
    this.name = '';
    this.icon = '';
    this.color = 'null';
  }

  isValid() {
    let valid = true;
    valid = valid && this.name && this.name.trim().length > 0;
    valid = valid && this.icon && this.icon.trim().length > 0;
    valid = valid && this.color && this.color.trim().length > 0;
    return valid;
  }
}
