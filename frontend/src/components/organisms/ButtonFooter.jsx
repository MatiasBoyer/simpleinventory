function ButtonFooter({ children }) {
  return (
    <footer className="absolute w-full h-[15%] bottom-0 left-0 right-0 flex items-start justify-center gap-3">
      {children}
    </footer>
  );
}

export default ButtonFooter;
