export function validateSignin (Signup) {
      
  if (!Signup.email || Signup.email.trim() === '' || Signup.email.length < 3 || !validateEmail(Signup.email)) {
    return { isValidated: false, error: 'Please a valid email address' };
  }
  
      if (!Signup.password || Signup.password.trim() === '' || Signup.password.length < 8 || Signup.password.length > 25) {
        return { isValidated: false, error: "Your password should have atleast 8 world's 1 small-case letter, 1 capital letter, 1 digit, 1 special" };
      }
  
      return { isValidated: true, error: '' };
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
