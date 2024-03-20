import { Suspense } from "react";
import { BusinessDetailSkeleton } from "../../components/business-detail-skeleton";
import { BusinessDetail } from "../../components/business-detail";

export default function BusinessPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="px-[10%]">
      <Suspense fallback={<BusinessDetailSkeleton />}>
        <BusinessDetail id={id} />
      </Suspense>
    </div>
  );
}
