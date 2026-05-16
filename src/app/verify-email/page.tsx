import VerifyEmailClient from "./VerifyEmailClient";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{
    userId?: string;
    secret?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <VerifyEmailClient
      userId={params.userId}
      secret={params.secret}
    />
  );
}