import { Button } from "@/components/ui/button";
import useMoveBack from "@/hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center p-[4.8rem]">
      <div className="bg-gray-50 border border-gray-100 rounded-md p-[4.8rem] flex-[0_1_96rem] text-center">
        <h1 className="mb-[3.2rem]">
          The page you are looking for could not be found 😢
        </h1>
        <Button onClick={moveBack}>&larr; Go back</Button>
      </div>
    </div>
  );
}

export default PageNotFound;
