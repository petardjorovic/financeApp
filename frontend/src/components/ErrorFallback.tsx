import { Button } from "./ui/button";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="h-screen bg-Beige-100 flex items-center justify-center p-[4.8rem]">
      <div className="bg-gray-50 border border-gray-100 rounded-md p-[4.8rem] flex-[0_1_96rem] text-center">
        <h1 className="mb-[1.6rem]">Something went wrong 🤔</h1>
        <p className="mb-[3.2rem] text-gray-500">{error.message}</p>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
