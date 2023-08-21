function ErrorText({ styleClass, children }) {
  return <p className={`text-center text-primary ${styleClass}`}>{children}</p>;
}

export default ErrorText;
