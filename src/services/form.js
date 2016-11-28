/*** Generic Local Storage Operations ***/

export const fetch = (key) =>
  JSON.parse(localStorage.getItem(key));

export function save(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/*** Generic Form Fields Updates ***/

export function update(component, stateName, field, value) {
  component.setState({
    [stateName]: {
      ...component.state[stateName],
    [field]: value,
    }
  });
}

export function remove(component, stateName, field) {
  const newState = component.state[stateName];
  delete newState[field];
  component.setState({
    [stateName]: newState
  })
}

export function set(component, stateName, obj) {
  component.setState({
    [stateName]: obj
  })
}

export function clear(component, stateName) {
  set(component, stateName, {});
}

/*** Generic Validations
 * Taken from https://html5hive.org/reactjs-form-validation-tutorial/
 * ***/

export const isEmailValid = (value) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

export const isPhoneValid = (value) =>
  /^0[0-9]{9,11}$/.test(value);

export const isPasswordValid = (value) =>
  /^.{6,}$/.test(value);

export const randomAlphaNumeric = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}