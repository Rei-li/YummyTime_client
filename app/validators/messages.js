import Messages from 'ember-cp-validations/validators/messages';

export default Messages.extend({
  blank: 'Поле не может быть пустым',
  email: 'Значение должно быть адресом электронной почты',
  emailNotFound: 'Адрес не найден',
  notANumber: 'Значение должно быть числом',
  notAnInteger: 'Значение должно быть целым числом',
  positive: 'Значение должно быть положительным числом',
  invalid: 'Поле заполнено неверно',
  url: 'Значение не является ссылкой'
});
