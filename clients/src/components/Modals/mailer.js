import emailjs from "@emailjs/browser";

export const mail = ({ name, email, message }) => {
  return emailjs.send(
    process.env.REACT_PUBLIC_SERVICE_ID,
    process.env.REACT_PUBLIC_TEMPLATE_IDADDUSER,
    { name, email, message },
    process.env.REACT_PUBLIC_API_USER_ID
  );
};

export const mail1 = ({ name, email, message }) => {
    return emailjs.send(
      process.env.REACT_PUBLIC_SERVICE_ID,
      process.env.REACT_PUBLIC_TEMPLATE_IDUPDATE,
      { name, email, message },
      process.env.REACT_PUBLIC_API_USER_ID
    );
  };


