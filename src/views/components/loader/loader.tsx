const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary" style={{ animationDelay: '0.15s', animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
};

export default Loader;
