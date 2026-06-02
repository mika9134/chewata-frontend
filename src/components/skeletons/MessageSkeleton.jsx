import Skeleton from "../ui/Skeleton";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isOwn = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`flex gap-2 lg:gap-3 ${isOwn ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar */}
            {!isOwn && (
              <Skeleton
                width="w-8 lg:w-10"
                height="h-8 lg:h-10"
                rounded="rounded-full"
                className="flex-shrink-0"
              />
            )}

            {/* Message Bubble */}
            <div className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
              <Skeleton
                width="w-40 lg:w-48"
                height="h-10"
                rounded="rounded-2xl"
              />
              {idx % 3 === 0 && (
                <Skeleton
                  width="w-32"
                  height="h-6"
                  rounded="rounded-2xl"
                />
              )}
            </div>

            {/* Avatar for own */}
            {isOwn && (
              <Skeleton
                width="w-8 lg:w-10"
                height="h-8 lg:h-10"
                rounded="rounded-full"
                className="flex-shrink-0"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;