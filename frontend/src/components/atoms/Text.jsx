function Text({ children, className }) {
  return (
    <p className={`antialiased text-shadow-md ${className}`}>{children}</p>
  );
}

export default Text;
