// const FullScreenLoader = () => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
//     </div>
//   );
// };

// export default FullScreenLoader;

// const FullScreenLoader = () => {
//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70">
//       <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
//       <p className="text-sm text-white/80 tracking-wide animate-pulse">
//         IntervuAI..
//       </p>
//     </div>
//   );
// };

// export default FullScreenLoader;

const FullScreenLoader = ({ loaderLabel = "IntervuAI..." }: { loaderLabel?: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      <p className="text-sm text-white/80 tracking-wide animate-pulse">
        {loaderLabel}
      </p>
    </div>
  );
};

export default FullScreenLoader;



