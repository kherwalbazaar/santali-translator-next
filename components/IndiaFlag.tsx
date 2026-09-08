export default function IndiaFlag({ size = "w-7 h-7" }: { size?: string }) {
  return (
    <div className={`${size} rounded-full overflow-hidden border border-gray-200 flex flex-col relative shadow-sm`}>
      <div className="h-1/3 bg-[#FF9933] w-full"></div>
      <div className="h-1/3 bg-white w-full flex items-center justify-center relative">
        <div className="w-2 h-2 rounded-full border border-[#000080] flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-[#000080] rounded-full"></div>
        </div>
      </div>
      <div className="h-1/3 bg-[#138808] w-full"></div>
    </div>
  );
}
