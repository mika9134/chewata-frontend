import { Users } from "lucide-react";
import Skeleton from "../ui/Skeleton";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(6).fill(null);

  return (
    <aside className="h-full w-full lg:w-72 bg-surface-primary border-r border-border flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="p-4 lg:p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-surface-secondary">
            <Users className="w-5 h-5 text-text-tertiary" />
          </div>
          <Skeleton width="w-24" height="h-5" rounded="rounded-lg" className="hidden lg:block" />
        </div>

        <Skeleton width="w-full" height="h-10" rounded="rounded-lg" />

        <div className="mt-3 flex items-center gap-2">
          <Skeleton width="w-20" height="h-4" rounded="rounded" />
          <Skeleton width="w-8" height="h-4" rounded="rounded" className="ml-auto" />
        </div>
      </div>

      {/* Skeleton Items */}
      <div className="flex-1 overflow-y-auto p-2 lg:p-3">
        <div className="space-y-1">
          {skeletonContacts.map((_, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Skeleton width="w-10 lg:w-12" height="h-10 lg:h-12" rounded="rounded-full" />
                <div className="hidden lg:flex flex-col flex-1 gap-2">
                  <Skeleton width="w-32" height="h-4" rounded="rounded-lg" />
                  <Skeleton width="w-16" height="h-3" rounded="rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;