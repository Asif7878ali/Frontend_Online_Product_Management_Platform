const ErrorsMessage = ({ error, className }) => {
  return (
    <p className={`text-red-600 font-medium text-sm ${className}`}>{error}</p>
  );
};

export default ErrorsMessage;
