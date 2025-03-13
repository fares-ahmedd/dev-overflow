import { Loader2 } from "lucide-react";

function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin size-6 md:size-8" />
    </div>
  );
}

export default loading;
