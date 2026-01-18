import { getAllReviews } from "@/actions/review/getAllReviews";
import ShowAllReviewsCard from "@/components/modules/Reviews/ShowAllReviewsCard";

const ReviewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, limit } = await searchParams;
  const { data: allReviews, pagination } = await getAllReviews({
    page: page as string,
    limit: limit as string,
  });
  console.log({ pagination });
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        What Our Travelers Say
      </h1>
      {allReviews?.length > 0 ? (
        <>
          <ShowAllReviewsCard reviews={allReviews} pagination={pagination} />
        </>
      ) : (
        <p className="text-center text-muted-foreground">No reviews found</p>
      )}
    </div>
  );
};

export default ReviewsPage;
