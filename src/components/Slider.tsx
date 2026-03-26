const Slider = ({ status }: { status: string }) => {
  const STATUS_STEPS = ["ORDERED", "SHIPPED", "DELIVERED"];
  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex items-center w-full max-w-md">
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step} className="flex items-center w-full">
            
            {/* Step (label + dot inline) */}
            <div className="flex flex-col items-center min-w-[70px]">
              
              {/* Label */}
              <span
                className={`text-[11px] mb-1 whitespace-nowrap
                  ${isActive ? "text-green-600 font-semibold" : "text-gray-500"}
                `}
              >
                {step}
              </span>

              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}
                  ${isActive ? "scale-110 shadow" : ""}
                `}
              />
            </div>

            {/* Line */}
            {index < STATUS_STEPS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition-all duration-300
                  ${index < currentIndex ? "bg-green-500" : "bg-gray-300"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;