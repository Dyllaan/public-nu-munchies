import { Suspense } from "react";
import { BusinessDetailSkeleton } from "../../components/business-detail-skeleton";
import { BusinessDetail } from "../../components/business-detail";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BusinessPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="px-[10%]">
      <Breadcrumbs id={id} />
      <Suspense fallback={<BusinessDetailSkeleton />}>
        <BusinessDetail id={id} />
      </Suspense>
    </div>
  );
}

const Breadcrumbs = ({ id }: { id: string }) => {
  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/businesses">Businesses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-black">
          <BreadcrumbLink href={`/business/${id}`}>
            Business {id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
