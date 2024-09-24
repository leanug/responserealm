import { LoadingIndicator } from "@/components"
import ContentWrapper from "@/components/layout/content-wrapper"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <ContentWrapper>
      <LoadingIndicator />
    </ContentWrapper>)
}